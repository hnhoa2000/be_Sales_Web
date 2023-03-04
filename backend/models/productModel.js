import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
    {
        name: String,
        category: mongoose.Types.ObjectId,
        description: String,
        price: Number,
        amount: Number,
        userId: mongoose.Types.ObjectId,
        img: {
            type: String,
            default:''
        }
    },
    { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);
export default Product;
