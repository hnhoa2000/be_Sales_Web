import categoryModel from '../models/categoryModel.js';
import productModel from '../models/productModel.js';

class CategoryController {

    async index(req, res) {
        const rs = await categoryModel.find();
        res.json({
            listCategories: rs
        });
    }

    async get(req, res) {    
        const rs = await categoryModel.find({ categoryName: req.params.categoryName });
        const products = await productModel.find({ category: rs[0]._id });
        res.json({ products });
    }
}

export default new CategoryController;