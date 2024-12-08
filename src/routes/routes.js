import express from "express";
import { friend } from "../controller/controller.js";

const routes = (app) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.get("/", friend);
}

export default routes;