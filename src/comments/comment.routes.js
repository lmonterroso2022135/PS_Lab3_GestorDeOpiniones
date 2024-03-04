import { Router } from "express";
import { check } from "express-validator";
import { validarJWT } from "../middlewares/validar-jwt.js";

import {
    commentPost,
    commentsForUserGet,
    commentPut,
    commentDelete
    } from "./comment.controller.js"
import { validarCampos } from "../middlewares/validar-campos.js";
import { PubliNoExists, commentNoExists } from "../helpers/db-validators.js";

const router = Router();

router.get(
    "/",
    [
        validarJWT
    ],commentsForUserGet
)

router.post(
    "/:id",
    [
        validarJWT,
        check("id", "Invalid ID for Publications").isMongoId(),
        check("id").custom(PubliNoExists),
        check("text", "Text is required").not().isEmpty(),
        validarCampos
    ],commentPost 
);

router.put(
    "/:id",
    [
        validarJWT,
        check("id", "Invalid ID").isMongoId(),
        check("id").custom(commentNoExists),
        check("text", "Text is required").not().isEmpty(),
        validarCampos
    ],commentPut
);

router.delete(
    "/:id",
    [
        validarJWT,
        check("id", "Invalid ID").isMongoId(),
        check("id").custom(commentNoExists),
    ],commentDelete
);

export default router;