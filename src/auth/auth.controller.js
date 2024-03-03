import bcryptjs from 'bcryptjs';
import User from '../users/user.model.js';
import { generarJWT } from '../helpers/generate-jwt.js';
import { validationResult } from 'express-validator';

export const login = async (req, res) => {
    const { userOrEmail, password } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const user = await User.findOne({ $or: [{ email: userOrEmail }, { username: userOrEmail }] });
        if (!user) {
            return res.status(400).json({
                msg: "The credentials are incorrect, email or username dont exist in the database.",
            });
        };
        const validatePassword = bcryptjs.compareSync(password, user.password);
        if (!validatePassword) {
            return res.status(400).json({
                msg: "Incorrect password",
            });
        }

        const token = await generarJWT(user._id);

        res.status(200).json({
            msg: "Successful login",
            usuario: user,
            token
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            msg: "Contacta with the support"
        });
    }
    

}