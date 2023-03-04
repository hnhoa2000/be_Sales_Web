import { useEffect, useState } from 'react';
import axios from 'axios';
import HeaderBanHang from "../layout/HeaderBanHang";
import Footer from "../layout/Footer";

function BanHang() {

    const [categories, setCategories] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState('Thời trang nam');

    useEffect(() => {
        async function fetchData() {
            const headers = {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('accessToken')
            }
            const rs = await axios.get('http://localhost:3001/category', { headers });
            setCategories(rs.data.listCategories);
        }
        fetchData();
    }, []);


    function handleSubmit(e) {
        e.preventDefault();
        const product = { name, description, amount, price, category };
        const headers = {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('accessToken')
        }
        axios.post('http://localhost:3001/product/add', product, { headers })
            .then(res => {
                alert('Thêm sản phẩm thành công!');
                setName('');
                setDescription('');
                setPrice(0);
                setAmount(0);
            })
            .catch(err => {
                console.log(err);
            })
    }
    return (
        <div>
            <HeaderBanHang />
            <div className="container mt-3">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card">
                            <h4 className="card-header">
                                Thêm Sản Phẩm
                            </h4>
                            <div className="card-body">
                                <form id="frmMain">
                                    <div className="form-group">
                                        <label htmlFor="txtTitle">Tên Sản Phẩm</label>
                                        <input type="text" className="form-control" value={name} onChange={(e => { setName(e.target.value) })} />
                                    </div>
                                    <div className="form-group">
                                        <label for="exampleFormControlSelect1">Loại Sản Phẩm</label>
                                        <select onChange={e => { setCategory(e.target.value) }} class="form-control" id="exampleFormControlSelect1">
                                            {categories.map(category => (
                                                <option value={category.categoryName} key={category._id}>{category.categoryName}</option>
                                            ))}
                                        </select>
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
                                        Thêm
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default BanHang;