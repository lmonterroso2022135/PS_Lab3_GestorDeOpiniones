import { Router } from "express";
import { check } from "express-validator";
import {
    publicationsPost,
    publicationsGet,
    publicationForUserGet,
    publicationPut,
    publicationDelete,
    publicationGetById
    } from "./publication.controller.js"
import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router();

router.get(
    "/",
    publicationsGet
)

router.get(
    "/my",
    validarJWT,
    publicationForUserGet
)

router.get(
    "/:id",
    publicationGetById
)

router.post(
    "/",
    [
        validarJWT,
        check("title", "Title is required").not().isEmpty(),
        check("category", "Category is required").not().isEmpty(),
        check("text", "Text is required").not().isEmpty()
    ],publicationsPost
);

router.put(
    "/:id",
    [
        validarJWT,
        check("title", "Title is required").not().isEmpty(),
        check("category", "Category is required").not().isEmpty(),
        check("text", "Text is required").not().isEmpty()
        
    ], publicationPut
)

router.delete(
    "/:id",
    [
        validarJWT
    ], publicationDelete
)



export default router;