import { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import axios from 'axios';

function Home() {
    const { categoryName } = useParams();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [maxPage, setMaxPage] = useState(0);
    const numberPage = [];
    const PAGE_SIZE = 6;
    for (let i = 0; i < maxPage; i++) {
        numberPage.push(i + 1);
    }

    useEffect(function () {
        console.log('useeffect');
        async function fetchAPI() {
            const p = await axios.get('http://localhost:3001/');
            const pd = await axios.get(`http://localhost:3001/?page=${currentPage}`);
            const ct = await axios.get('http://localhost:3001/category');
            setProducts(pd.data.products);
            setMaxPage(Math.ceil(p.data.products.length / PAGE_SIZE));
            setCategories(ct.data.listCategories);
        }
        fetchAPI();
    }, [currentPage]);

    useEffect(function () {
        const headers = {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('accessToken')
        }
        if (categoryName) {
            axios.get(`http://localhost:3001/category/${categoryName}`, { headers })
                .then(res => {
                    setProducts(res.data.products);
                    setMaxPage(Math.ceil(res.data.products.length / PAGE_SIZE));
                    setCurrentPage(1);
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }, [categoryName])
    function changePage(e) {
        e.preventDefault();
        axios.get(`http://localhost:3001/?page=${e.target.id}`)
            .then(res => {
                setProducts(res.data.products);
                setCurrentPage(e.target.id);
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <div>
            <Header />
            <div>
                <div>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                        {categoryName && (<li className="breadcrumb-item"><a href="category.html">{categoryName}</a></li>)}
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12 col-sm-3">
                                <div className="card bg-light mb-3">
                                    <div className="card-header bg-primary text-white text-uppercase"><i className="fa fa-list" /> Categories</div>
                                    <ul className="list-group category_block">
                                        {categories.map(category => (
                                            <li key={category._id} className="list-group-item"><Link to={`/${category.categoryName}`}>{category.categoryName}</Link></li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className="col">
                                <div className="row">
                                    {products.map(product => (
                                        <div className="col-12 col-md-6 col-lg-4 mb-4" key={product._id}>
                                            <div className="card">
                                                <img className="card-img-top" style={{ witdh: "350px", height: "350px" }} src={`http://localhost:3001/images/${product.img}`} alt={product.name} />
                                                <div className="card-body">
                                                    <h4 className="card-title"><Link to={`/detail/${product._id}`} title="View Product">{product.name}</Link></h4>
                                                    <p className="card-text">{product.description}</p>
                                                    <div className="row">
                                                        <div className="col">
                                                            <p className="btn btn-danger btn-block">{product.price} $</p>
                                                        </div>
                                                        <div className="col">
                                                            <a href="/" className="btn btn-success btn-block">Add to cart</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}


                                    <div className="col-12">
                                        <nav aria-label="...">
                                            <ul className="pagination">
                                                {numberPage.length === 0 || (<li className="page-item disabled">
                                                    <a className="page-link" href="/" tabIndex={-1}>Previous</a>
                                                </li>)}
                                                {numberPage.length === 0 || (numberPage.map(page => (
                                                    Number(page) === Number(currentPage) ? (<li key={page} className="page-item active">
                                                        <a className="page-link" href="/">{page} <span className="sr-only">(current)</span></a>
                                                    </li>) : <li key={page} className="page-item"><a onClick={changePage} className="page-link" id={page} href="/">{page}</a></li>
                                                )))}
                                                {numberPage.length === 0 || (<li className="page-item">
                                                    <a className="page-link" href="/">Next</a>
                                                </li>)}
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Home;