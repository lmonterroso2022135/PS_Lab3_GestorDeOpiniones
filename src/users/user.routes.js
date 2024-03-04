import { Router } from "express";
import { check } from "express-validator";
import {
    userPost, 
    usersGet, 
    userPut
    } from "./user.controller.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { emailExists, usernameExists } from "../helpers/db-validators.js";


const router = Router();

router.get("/", usersGet);

router.post(
    "/", [
        check("username", "The username is required").not().isEmpty(),
        check("username").custom(usernameExists),
        check("password", "Password must be greater than 6 characters").isLength({min: 6,}),
        check("email", "The email entered is not valid ").isEmail(),
        check("email").custom(emailExists),
        validarCampos
    ],userPost
);

router.put(
    "/",[
        validarJWT,
        check('newPassword', '').not().isEmpty(),
        check('password', '').not().isEmpty(),
        validarCampos
    ],userPut
);

export default router;
