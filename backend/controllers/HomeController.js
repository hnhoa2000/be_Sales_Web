import productModel from '../models/productModel.js';
const PAGE_SIZE = 6;

class HomeController {

    //[GET] /
    async index(req, res) {
        if (req.query.page) {
            const page = req.query.page;
            const skip = (page - 1) * PAGE_SIZE;
            const products = await productModel.find().skip(skip).limit(PAGE_SIZE);
            res.json({ products });
        } else {
            const products = await productModel.find();
            res.json({ products });
        }
    }
}

export default new HomeController;