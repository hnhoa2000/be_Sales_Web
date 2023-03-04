import bcrypt from 'bcryptjs';
import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken';
import randomstring from 'randomstring';

class AuthController {

    //[POST] /signin
    async signin(req, res) {
        const user = await userModel.find({ username: req.body.username });
        if (user.length === 0) {
            return res.json({
                authenticated: false
            });
        }
        if (bcrypt.compareSync(req.body.password, user[0].password) === false) {
            return res.json({
                authenticated: false
            });
        }
 
        const payload = {
            userId: user[0]._id,
            role: user[0].role 
        }
        const opts = {
            expiresIn: 10 * 60 //seconds
        }
        const accessToken = jwt.sign(payload, 'SECRET_KEY', opts);
        const refreshToken = randomstring.generate(80);
        await user[0].updateOne({ refreshToken });
        res.json({
            user: user[0],
            authenticated: true,
            accessToken,
            refreshToken
        });
    }

    async refresh(req, res) {
        const { accessToken, refreshToken } = req.body;
        try {
            const opts = {
                ignoreExpiration: true
            };
            const { userId } = jwt.verify(accessToken, 'SECRET_KEY', opts);
            const rs = userModel.find({ _id: userId });
            if (rs) {
                const newAccessToken = jwt.sign({ userId }, 'SECRET_KEY', { expiresIn: 10 * 60 });
                return res.json({
                    accessToken: newAccessToken
                })
            }

            res.json({
                message: 'RefreshToken is revoked'
            });
        } catch (err) {
            console.log(err);
            res.json({
                message: 'Invalid accessToken'
            })
        }
    }
}



export default new AuthController; 