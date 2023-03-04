import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
    {
        name: String
    },
    { timestamps: true }
);

const Category = mongoose.model("Categories", CategorySchema);
export default Category;
