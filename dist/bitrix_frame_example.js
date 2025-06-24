import express from "express";
import dotenv from "dotenv";
const app = express();
dotenv.config();
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const CLIENT_ID = process.env.BITRIX_CLIENT_ID;
app.use(express.static(path.join(__dirname, "../frontend/dist")));
app.set("view engine", "ejs");
app.set("views", "./views");
app.post("/install", (req, res) => {
    console.log("POST recebido:", req.query);
    const client_id = encodeURIComponent(CLIENT_ID);
    const authUrl = `https://${req.query.DOMAIN}/oauth/authorize/?client_id=${CLIENT_ID}`;
    res.redirect(authUrl);
});
// Passo 1 - link para login
app.get("/", (req, res) => {
    console.log(req.query);
    if (req.query.code) {
        return res.redirect(`/oauth/callback?accessToken=${req.query.code}`);
    }
    res.send(`Erro: code não foi passado por parâmetro.`);
});
// Passo 2 - callback do Bitrix
app.get("/oauth/callback", async (req, res) => {
    const accessToken = req.query.accessToken;
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});
app.listen(3000, () => console.log("Servidor em http://localhost:3000"));
