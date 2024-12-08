import "dotenv/config";
import express from "express";
import routes from "./src/routes/routes.js";

const port = process.env.PORT || 8080;

const app = express();
app.set("view engine", "ejs");
app.use(express.static("src"));

routes(app);

app.listen(port, () => {
    console.log("Server is listening...");
});