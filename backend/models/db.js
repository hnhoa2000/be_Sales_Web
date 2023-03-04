import mongoose from "mongoose";

const uri = "mongodb+srv://alowhat0003:17102000@cluster0.5bqtoif.mongodb.net/?retryWrites=true&w=majority";
mongoose.set('strictQuery', false);
async function connect() {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('connect successly!!!!');
    } catch (error) {
        console.log(error);
    }
}

export default { connect };