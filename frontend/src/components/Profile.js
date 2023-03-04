import './Profile.css';
import Header from './layout/Header';
import Footer from './layout/Footer';
import axios from 'axios';
import { useEffect, useState } from 'react';
//import { useNavigate } from 'react-router-dom';
function Profile() {

    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [dob, setDob] = useState('');
    const [img, setImg] = useState('avatarDefault');
    //const navigate = useNavigate();
    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        const headers = {
            'Content-Type': 'application/json',
            'x-access-token': accessToken
        }
        axios.get('http://localhost:3001/account/profile', { headers })
            .then(res => {
                setUsername(res.data.profile.username);
                setName(res.data.profile.name);
                setPhone(res.data.profile.phone);
                setEmail(res.data.profile.email);
                setGender(res.data.profile.gender);
                setDob(res.data.profile.dob);
                setImg(res.data.profile.img);
            })
            .catch(err => console.log(err));
    }, []);


    async function handleSaveProfile() {
        const accessToken = localStorage.getItem('accessToken');
        const headers = {
            'Content-Type': 'application/json',
            'x-access-token': accessToken
        }
        const userProfile = { name, phone, email, gender, dob };
        const rs = await axios.put('http://localhost:3001/account/profile', userProfile, { headers });
        if (rs.data.message === 'update profile successfully!') {
            alert('Cập nhập thông tin thành công!');
        }
    }

    function handleUploadAvatar(e) {
        const accessToken = localStorage.getItem('accessToken');
        const headers = {
            'Content-Type': 'multipart/form-data',
            'x-access-token': accessToken
        }
        const data = new FormData();
        data.append('file', e.target.files[0]);
        axios.put('http://localhost:3001/account/avatar', data, { headers })
            .then(res => {
                if (res.data.message === 'update avatar successfully!') {
                    localStorage.setItem('img', res.data.filename);
                    setImg(res.data.filename);
                }
                else {
                    alert('chinh sua avatar that bai!!!');
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <div>
            <Header />
            <div className="container rounded bg-white mt-5 mb-5">
                <div className="row">
                    <div className="col-md-5 border-right">
                        <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                            <img alt='avatar' className="rounded-circle mt-5" width="150px" height="150px" src={`http://localhost:3001/images/${img}`} />
                            <span className="font-weight-bold">{username}</span>
                            <div class="custom-file w-50">
                                <input type="file" className="custom-file-input" id="inputGroupFile04" onChange={handleUploadAvatar} />
                                <label class="custom-file-label text-justify" for="inputGroupFile04">Chọn Ảnh</label>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-7 border-right">
                        <div className="p-3 py-5">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h4 className="text-right">Hồ Sơ Của Tôi</h4>
                            </div>
                            <div className="row mt-2">
                                <div className="col-md-12">
                                    <label className="labels">Tên</label>
                                    <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)} />
                                </div>
                                <div className="col-md-12">
                                    <label className="labels">Số Điện Thoại</label>
                                    <input type="text" className="form-control" value={phone} onChange={e => setPhone(e.target.value)} />
                                </div>
                                <div className="col-md-12">
                                    <label className="labels">Email</label>
                                    <input type="text" className="form-control" value={email} onChange={e => setEmail(e.target.value)} />
                                </div>
                                <div className="col-md-12">
                                    <label className="labels">Giới Tính</label>
                                    <div>
                                        <div className="form-check-inline">
                                            <label className="form-check-label">
                                                <input type="radio" className="form-check-input" name="optradio" checked={gender === 'Nam' ? true : false} onChange={e => setGender(e.target.value)} value="Nam" />Nam
                                            </label>
                                        </div>
                                        <div className="form-check-inline">
                                            <label className="form-check-label">
                                                <input type="radio" className="form-check-input" name="optradio" checked={gender === 'Nữ' ? true : false} onChange={e => setGender(e.target.value)} value="Nữ" />Nữ
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <label className="labels">Ngày Sinh</label>
                                    <input type="text" className="form-control" value={dob} onChange={e => setDob(e.target.value)} />
                                </div>
                            </div>
                            <div className="mt-5 text-center"><button className="btn btn-primary profile-button" type="button" onClick={handleSaveProfile}>Save Profile</button></div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Profile;