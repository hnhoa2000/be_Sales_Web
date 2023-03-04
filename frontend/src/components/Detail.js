import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./layout/Header";
import Footer from "./layout/Footer";


function Detail() {
    const { idProduct } = useParams();
    const [product, setProduct] = useState(null);
    useEffect(function () {
        axios.get(`http://localhost:3001/product/${idProduct}`)
            .then(res => {
                setProduct(res.data.product);
            })
            .catch(err => {
                console.log(err);
            });
    }, [idProduct]);
    return (
        <div>
            <Header />
            <div className="container">
                <div className="card">
                    <div className="card-body">
                        <h3 className="card-title">{product ? product.name : ''}</h3>
                        <div className="row">
                            <div className="col-lg-5 col-md-5 col-sm-6">
                                <div className="white-box text-center">{product ? (<img style={{ width: "100%" }} alt={product.img} src={`http://localhost:3001/images/${product.img}`} className="img-responsive" />) : ''}</div>
                            </div>
                            <div className="col-lg-7 col-md-7 col-sm-6">
                                <h4 className="box-title mt-5">Mô Tả</h4>
                                <p>{product ? product.description : ''}</p>
                                <h2 className="mt-5">
                                    ₫{product ? product.price : ''}<small className="text-success">(36%off)</small>
                                </h2>
                                <button className="btn btn-primary btn-rounded">Buy Now</button>
                                <h3 className="box-title mt-5">Key Highlights</h3>
                                <ul className="list-unstyled">
                                    <li><i className="fa fa-check text-success" />Sturdy structure</li>
                                    <li><i className="fa fa-check text-success" />Designed to foster easy portability</li>
                                    <li><i className="fa fa-check text-success" />Perfect furniture to flaunt your wonderful collectibles</li>
                                </ul>
                            </div>
                            <div className="col-lg-12 col-md-12 col-sm-12">
                                <h3 className="box-title mt-5">General Info</h3>
                                <div className="table-responsive">
                                    <table className="table table-striped table-product">
                                        <tbody>
                                            <tr>
                                                <td width={390}>Brand</td>
                                                <td>Stellar</td>
                                            </tr>
                                            <tr>
                                                <td>Delivery Condition</td>
                                                <td>Knock Down</td>
                                            </tr>
                                            <tr>
                                                <td>Seat Lock Included</td>
                                                <td>Yes</td>
                                            </tr>
                                            <tr>
                                                <td>Type</td>
                                                <td>Office Chair</td>
                                            </tr>
                                            <tr>
                                                <td>Style</td>
                                                <td>Contemporary&amp;Modern</td>
                                            </tr>
                                            <tr>
                                                <td>Wheels Included</td>
                                                <td>Yes</td>
                                            </tr>
                                            <tr>
                                                <td>Upholstery Included</td>
                                                <td>Yes</td>
                                            </tr>
                                            <tr>
                                                <td>Upholstery Type</td>
                                                <td>Cushion</td>
                                            </tr>
                                            <tr>
                                                <td>Head Support</td>
                                                <td>No</td>
                                            </tr>
                                            <tr>
                                                <td>Suitable For</td>
                                                <td>Study&amp;Home Office</td>
                                            </tr>
                                            <tr>
                                                <td>Adjustable Height</td>
                                                <td>Yes</td>
                                            </tr>
                                            <tr>
                                                <td>Model Number</td>
                                                <td>F01020701-00HT744A06</td>
                                            </tr>
                                            <tr>
                                                <td>Armrest Included</td>
                                                <td>Yes</td>
                                            </tr>
                                            <tr>
                                                <td>Care Instructions</td>
                                                <td>Handle With Care,Keep In Dry Place,Do Not Apply Any Chemical For Cleaning.</td>
                                            </tr>
                                            <tr>
                                                <td>Finish Type</td>
                                                <td>Matte</td>
                                            </tr>
                                        </tbody>
                                    </table>
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

export default Detail;