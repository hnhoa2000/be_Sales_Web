import { Link, useNavigate } from "react-router-dom";


function Header() {
    const accessToken = localStorage.getItem('accessToken');
    const username = localStorage.getItem('username');
    const img = localStorage.getItem('img');
    const login = accessToken ? true : false;
    const navigate = useNavigate();

    function handleSignout() {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('username');
        localStorage.removeItem('img');
        navigate('/');
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="/">Navbar</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/News">News</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/Contact">Contact</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/BanHang">Kênh Người Bán</Link>
                    </li>
                </ul>
                {login || (<ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/Signup">đăng kí</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/Signin">đăng nhập</Link>
                    </li>
                </ul>)}
                {login && (<ul className="navbar-nav mr-5">
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <img alt='avatar' className="rounded-circle mr-2" width="20px" height="20px" src={`http://localhost:3001/images/${img}`} />
                            {username ? username : 'dropdown'}
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <Link className="dropdown-item" to='/Profile'>Hồ Sơ</Link>
                            <button className="dropdown-item" onClick={handleSignout}>đăng xuất</button>
                        </div>
                    </li>
                </ul>)}
            </div>
        </nav>
    )
}

export default Header;