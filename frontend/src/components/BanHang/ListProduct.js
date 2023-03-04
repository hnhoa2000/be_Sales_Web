import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import HeaderBanHang from "../layout/HeaderBanHang";
import Footer from "../layout/Footer";

function ListProduct() {
    const [products, setProducts] = useState([]);
    //const navigate = useNavigate();
    useEffect(() => {
        const headers = {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('accessToken')
        }
        axios.get(`http://localhost:3001/product/user/${localStorage.getItem('id')}`, { headers })
            .then(res => {
                setProducts(res.data.products);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);
    function handleChangeImageProduct(e) {
        e.preventDefault();
        const headers = {
            'Content-Type': 'multipart/form-data',
            'x-access-token': localStorage.getItem('accessToken')
        }
        const data = new FormData();
        data.append('file', e.target.files[0]);
        axios.put(`http://localhost:3001/product/image/${e.target.id}`, data, { headers })
            .then(res => {
                let tmp = [...products];
                const index = products.findIndex((obj => obj._id === e.target.id));
                tmp[index].img = res.data.filename;
                setProducts(tmp);
            })
            .catch(err => {
                console.log(err);
            })
    }


    function deleteProduct(e) {
        e.preventDefault();
        const headers = {
            'Content-Type': 'multipart/form-data',
            'x-access-token': localStorage.getItem('accessToken')
        }
        axios.delete(`http://localhost:3001/product/${e.target.id}`, { headers })
            .then(res => {
                setProducts(products.filter(product => product._id !== e.target.id));
            })
            .catch(err => {
                console.log(err);
            })

    }

    return (
        <div>
            <HeaderBanHang />
            <div className="container mt-3 mb-3">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <h4 className="card-header d-flex justify-content-between">
                                Danh Sách Sản Phẩm
                            </h4>
                            <div className="card-body">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Tên Sản Phẩm</th>
                                            <th>Loại Sản Phẩm</th>
                                            <th>Giá</th>
                                            <th>Số Lượng</th>
                                            <th>Hình Ảnh</th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody >
                                        {products.map((product, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{product.name}</td>
                                                <td>{product.categoryName}</td>
                                                <td>{product.price}</td>
                                                <td>{product.amount}</td>
                                                <td style={{ maxWidth: "10rem" }}>{product.img !== '' ? (<img width='50%' alt={product.img} src={`http://localhost:3001/images/${product.img}`}></img>) : (<input type='file' onChange={handleChangeImageProduct} id={product._id} />)}</td>
                                                <td><Link to={`/BanHang/product/update/${product._id}`}>Sửa</Link></td>
                                                <td><a id={product._id} href='/' onClick={deleteProduct}>Xóa</a></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default ListProduct;