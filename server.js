import dotenv from "dotenv";
import fs from "fs";
import express from "express";

dotenv.config();

const port = process.env.PORT || 8080;

const app = express();
app.set("view engine", "ejs");
app.use(express.static("src"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {

    var message;

    try {
        const name = req.query.name;
        const key = req.query.key;
        const secrets = JSON.parse(fs.readFileSync("secrets.json"));
        var friend = secrets[name].secret.friend;
        var hiddenKey = secrets[name].key;

        if (key === hiddenKey) {
            let gender = friend.split(" ")[0];
            if (gender.endsWith("o") || gender.endsWith("n") || gender.endsWith("l") || gender.endsWith("de")) {
                message = `Oi ${name}! Seu amigo secreto é...`;
            } else {
                message = `Oi ${name}! Sua amiga secreta é...`;
            }
        } else {
            message = `${name}, essa chave não é sua.`;
            friend = "";
        }

        res.render("index", { message, friend });

    } catch (error) {
        message = "Erro no serviço, tente mais tarde...";
        let friend = "";

        console.error(error.message);
        res.render("index", { message, friend });

    }
});

app.listen(port, () => {
    console.log("Server is listening...");
});