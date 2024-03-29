import { Router } from "express";
import { check } from "express-validator";
//
import { login } from "./auth.controller.js";

const  router = Router();

router.post(
    '/login',
    [
        check('userOrEmail', 'Email or username is obligatory').not().isEmpty(),
        check('password', 'The password is obligatory').not().isEmpty(),
    ],login
);

export default router;