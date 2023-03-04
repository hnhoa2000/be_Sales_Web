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

    function handleSignUp(e) {
        e.preventDefault();
        axios.post('http://localhost:3001/account/signup', { username, password })
            .then(res => {
                if (res.data.message === 'signup successfully') {
                    navigate('/Signin');
                } else {
                    setMessage('Username đã tồn tại');
                }
            })
            .catch(err => console.log(err));
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
                        <button type="submit" className="btn btn-primary" onClick={handleSignUp}>Đăng Kí</button>
                        <div className="form-group text-center">
                            <Link to="/Signin">Đã có tài khoản? đăng nhập</Link>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Signup;