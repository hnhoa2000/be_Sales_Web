import Header from "../layout/Header";
import Footer from "../layout/Footer";
import axios from 'axios';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Signup() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    function handleSignIn(e) {
        e.preventDefault();
        axios.post('http://localhost:3001/auth/signin', { username, password })
            .then(res => {
                if (res.data.authenticated === false) {
                    setMessage('username, password không chính xác');
                } else {
                    localStorage.setItem('accessToken', res.data.accessToken);
                    localStorage.setItem('refreshToken', res.data.refreshToken);
                    localStorage.setItem('username', res.data.user.username);
                    localStorage.setItem('img', res.data.user.img);
                    localStorage.setItem('id', res.data.user._id);
                    navigate('/');
                }
            })
            .catch(err => console.log(err)
            );
    }
    return (
        <div>
            <Header />
            <div className="card">
                <div className="card-body">
                    <form>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input type="text" className="form-control" id="username" value={username} onChange={e => { setUsername(e.target.value) }} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" id="password" value={password} onChange={e => { setPassword(e.target.value) }} />
                        </div>
                        <p>
                            {message}
                        </p>
                        <button type="submit" className="btn btn-primary" onClick={handleSignIn}>Đăng Nhập</button>
                        <div className="form-group text-center">
                            <Link to="/Signup">Chưa có tài khoản? đăng kí</Link>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Signup;