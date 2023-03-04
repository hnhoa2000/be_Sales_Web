import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function SuaSanPham() {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState(0);

    const navigate = useNavigate();

    useEffect(function () {
        const headers = {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('accessToken')
        }
        axios.get(`http://localhost:3001/product/${id}`, { headers })
            .then(res => {
                setName(res.data.product.name);
                setPrice(res.data.product.price);
                setDescription(res.data.product.description);
                setAmount(res.data.product.amount);

            })
            .catch(err => {
                console.log(err);
            })
    }, [id]);

    function handleSubmit(e) {
        e.preventDefault();
        const product = { name, price, description, amount, id };
        const headers = {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('accessToken')
        }
        axios.put(`http://localhost:3001/product/${id}`, product, { headers })
            .then(res => {
                navigate('/BanHang/all');
            })
            .catch(err => {
                console.log(err);
            })
    }
    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-sm-12">
                    <div className="card">
                        <h4 className="card-header">
                            Sửa Sản Phẩm
                        </h4>
                        <div className="card-body">
                            <form id="frmMain">
                                <div className="form-group">
                                    <label htmlFor="txtTitle">Tên Sản Phẩm</label>
                                    <input type="text" className="form-control" value={name} onChange={(e => { setName(e.target.value) })} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="txtYear">Mô Tả</label>
                                    <input type="text" className="form-control" value={description} onChange={(e => { setDescription(e.target.value) })} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="txtYear">Giá Sản Phẩm</label>
                                    <input type="number" className="form-control" value={price} onChange={(e => { setPrice(e.target.value) })} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="txtYear">Số Lượng</label>
                                    <input type="number" className="form-control" value={amount} onChange={(e => { setAmount(e.target.value) })} />
                                </div>
                                <button className="btn btn-primary" onClick={handleSubmit}>
                                    <i className="fa fa-check" aria-hidden="true" />
                                    Sửa
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SuaSanPham;