import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";


function Header() {
    //const accessToken = localStorage.getItem('accessToken');
    const username = localStorage.getItem('username');
    const img = localStorage.getItem('img');
    const navigate = useNavigate();

    function handleSignout() {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('username');
        localStorage.removeItem('img');
        navigate('/');
    }

    useEffect(function () {
        if (!username) {
            navigate('/');
        }
    });

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="/">Kênh Người Bán</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Quản Lý Sản Phẩm
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <Link className="dropdown-item" to='/BanHang/all'>Tất Cả Sản Phẩm</Link>
                            <Link className="dropdown-item" to='/BanHang/add'>Thêm Sản Phẩm</Link>
                        </div>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Quản Lý Đơn Hàng
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <Link className="dropdown-item" to='/Profile'>Tất Cả</Link>
                            <Link className="dropdown-item" to='/Profile'>Đơn Hủy</Link>
                            <Link className="dropdown-item" to='/Profile'>Trả Hàng/Hoàn Tiền</Link>
                        </div>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Vận Chuyển
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <Link className="dropdown-item" to='/Profile'>Quản Lý Vận Chuyển</Link>
                            <Link className="dropdown-item" to='/Profile'>Cài Đặt Vận Chuyển</Link>
                            <Link className="dropdown-item" to='/Profile'>Giao Hàng Loạt</Link>
                        </div>
                    </li>
                </ul>
                <ul className="navbar-nav mr-5">
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <img alt='avatar' className="rounded-circle mr-2" width="20px" height="20px" src={`http://localhost:3001/images/${img}`} />
                            {username}
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <Link className="dropdown-item" to='/Profile'>Hồ Sơ</Link>
                            <button className="dropdown-item" onClick={handleSignout}>đăng xuất</button>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Header;