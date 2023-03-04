import productModel from '../models/productModel.js';
import categoryModel from '../models/categoryModel.js';
import upload from '../middlewares/multer.js';

class ProductController {

    //[GET] /product
    async add(req, res) {
        const category = await categoryModel.find({ categoryName: req.body.category });
        const product = new productModel({
            name: req.body.name,
            category: category[0]._id,
            description: req.body.description,
            price: req.body.price,
            amount: req.body.amount,
            userId: req.payloadToken.userId
        });
        await product.save();
        res.json({
            message: 'add product successfully!'
        });
    }

    async getAll(req, res) {
        const products = await productModel.find();
        const newProducts = new Array();
        for (let index = 0; index < products.length; index++) {
            newProducts[index] = products[index].toObject();
            const category = await categoryModel.findById(newProducts[index].category);
            newProducts[index].categoryName = category.toObject().categoryName;
            delete newProducts[index].category;
            delete newProducts[index].userId;
        }
        res.json({
            products: newProducts
        });
    }

    async getProductUser(req, res) {
        const products = await productModel.find({ userId: req.payloadToken.userId });
        const newProducts = new Array();
        for (let index = 0; index < products.length; index++) {
            newProducts[index] = products[index].toObject();
            const category = await categoryModel.findById(newProducts[index].category);
            newProducts[index].categoryName = category.toObject().categoryName;
            delete newProducts[index].category;
            delete newProducts[index].userId;
        }
        res.json({
            products: newProducts
        });
    }

    async getProductUser(req, res) {
        const products = await productModel.find({ userId: req.payloadToken.userId });
        const newProducts = new Array();
        for (let index = 0; index < products.length; index++) {
            newProducts[index] = products[index].toObject();
            const category = await categoryModel.findById(newProducts[index].category);
            newProducts[index].categoryName = category.toObject().categoryName;
            delete newProducts[index].category;
            delete newProducts[index].userId;
        }
        res.json({
            products: newProducts
        });
    }

    image(req, res) {
        upload(req, res, async (err) => {
            if (err) {
                console.log(err);
                return res.status(500).json(err);
            }
            const product = await productModel.findById(req.params.id);
            await product.updateOne({ img: req.file.filename });
            return res.status(200).json({
                filename: req.file.filename
            });
        });
    }

    async get(req, res) {
        console.log('1');
        const product = await productModel.findById(req.params.id);
        res.json({ product });
    }

    async updateProduct(req, res) {
        const product = await productModel.findById(req.body.id);
        await product.updateOne(req.body);
        res.json({
            message: 'update product'
        })
    }

    async deleteProduct(req, res) {
        await productModel.findOneAndDelete({ _id: req.params.id });
        res.json({
            message: 'delete product'
        })
    }
}

export default new ProductController;