import { response, request } from "express";
import bcryptjs from 'bcryptjs';
import User from './user.model.js';

// Obtener todos los usuarios
export const usersGet = async (req = request, res = response) => {
    const query = { state: true };

    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
    ]);

    res.status(200).json({
        total,
        users
    });
}

// Agregar un usuario
export const userPost = async (req, res) => {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });

    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt );

    await user.save();

    res.status(200).json({
        user
    });
}

// Editar usuario
export const userPut = async (req, res) => {
    const {id} = req.user;
    const { username, password, newPassword, ...resto } = req.body;

    try {
        const user = await User.findById(id);

        const isPasswordCorrect = await bcryptjs.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ msg: 'Incorrect password.' });
        }

        if (username) {
            user.username = username;
        }

        if (newPassword) {
            const salt = bcryptjs.genSaltSync();
            user.password = bcryptjs.hashSync(newPassword, salt);
        }
        
        Object.keys(resto).forEach(key => {
            user[key] = resto[key];
        });

        await user.save();

        res.status(200).json({
            msg: 'User actulized.',
            id,
            username: user.username,
        });

    } catch (e) {
        console.log(e);
        res.status(500).json({
            msg: 'Failed to update password',
            
        }); 
    }
}
