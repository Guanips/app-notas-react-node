import express from "express"
import cors from "cors"
import mysql from "mysql2"
import dotenv from "dotenv"
import {JSDOM} from "jsdom"
import DOMPurify from "dompurify"

const port = 3000;
const app = express();
const window = new JSDOM('').window;
const purify = DOMPurify(window);
dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

app.use(cors());
app.use(express.json());
app.listen(port, () => {
    console.log("server created at port " + port);
});

app.post("/crear_nota", async (req, res) => {
    console.log(req.body)
    const cuerpo_nota_purificado = purify.sanitize(req.body.cuerpo_nota)
    if (req.body.titulo_nota != "" && req.body.cuerpo_nota != "") {
        await pool.query(`INSERT INTO notas (titulo, cuerpo, ID_creador) VALUES ('${req.body.titulo_nota}', '${cuerpo_nota_purificado}', 1);`)
        res.send({
            status: "exito",
            cuerpo: "Nota creada exitosamente."
        })
    } else {
        res.send({
            status: "Error",
            cuerpo: "No se puede crear una nota vacia."
        })
    }

})

app.post("/editar_nota", async (req, res) => {
    const id_nota = parseInt(req.body.id_nota)

    try {
        await pool.query(`UPDATE notas SET cuerpo = '${req.body.cuerpo_editado}' WHERE ID_nota = ${id_nota};`)
        res.send({
            status: "Exito",
            cuerpo: "Nota editada exitosamente"
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: "ERROR",
            cuerpo: error
        })
    }

})

app.get("/obtener_usuarios", async (req, res) => {
    const [usuarios] = await pool.query("SELECT * FROM usuarios")
    res.send(usuarios)
})

app.get("/obtener_notas", async (req, res) => {
    const [notas] = await pool.query("SELECT ID_nota, titulo, cuerpo, fecha_creacion FROM notas")
    res.send(notas)
})