import { Router } from "express";
import { check } from "express-validator";
import {
    userPost, 
    usersGet, 
    userPut
    } from "./user.controller.js";
import { validarJWT } from "../middlewares/validar-jwt.js";


const router = Router();

router.get("/", usersGet);

router.post(
    "/", [
        check("username", "The username is required").not().isEmpty(),
        check("password", "Password must be greater than 6 characters").isLength({min: 6,}),
        check("email", "The email entered is not valid ").isEmail()
    ],userPost
);

router.put(
    "/",[
        validarJWT,
        check('newPassword', '').not().isEmpty(),
        check('newPassword', '').not().isEmpty(),
    ],userPut
);

export default router;
