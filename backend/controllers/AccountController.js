import bcrypt from 'bcryptjs';
import fs from 'fs';
import userModel from "../models/userModel.js";
import upload from "../middlewares/multer.js";
import { fileURLToPath } from 'url';

class AccountController {

    //[POST] /account/signup
    async signup(req, res) {
        let user = new userModel({
            username: req.body.username,
            password: req.body.password
        });
        user.password = bcrypt.hashSync(user.password, 10);
        const rs = await userModel.find({ username: user.username });
        if (rs[0]) {
            return res.json({
                message: 'username already exists'
            });
        }
        user.save();
        return res.json({
            message: 'signup successfully'
        });
    }

    //[GET] /account/profile
    async profile(req, res) {
        const user = await userModel.findById(req.payloadToken.userId);
        res.json({
            profile: user
        })
    }

    async updateProfile(req, res) {
        const rs = await userModel.findOneAndUpdate({ _id: req.payloadToken.userId }, req.body, { new: true });
        res.json({
            message: 'update profile successfully!'
        })
    }

    updateAvatar(req, res) {
        upload(req, res, async (err) => {
            if (err) {
                return res.status(500).json(err);
            }
            const user = await userModel.findById(req.payloadToken.userId);

            //xoa anh cu sau khi cap nhat. neu la anh mac dinh thi khong xoa
            if (user.img !== 'avatarDefault.jpg') {
                const __filename = fileURLToPath(import.meta.url);
                var url = __filename.slice(0, -32);
                url = `${url}\public\\images\\`;
                url = url.replaceAll('\\', '/');
                url = `${url}${user.img}`;
                fs.unlinkSync(url);
            }
            await user.updateOne({ img: req.file.filename });
            return res.status(200).json({
                filename: req.file.filename,
                message: 'update avatar successfully!'
            });
        });
    }
}

export default new AccountController; 