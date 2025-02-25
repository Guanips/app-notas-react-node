import express from "express"
import cors from "cors"
import mysql from "mysql2"
import dotenv from "dotenv"

const port = 3000;
const app = express();
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
    if (req.body.titulo_nota != "" && req.body.cuerpo_nota != "") {
        await pool.query(`INSERT INTO notas (titulo, cuerpo, ID_creador) VALUES ("${req.body.titulo_nota}", "${req.body.cuerpo_nota}", 1);`)
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

app.get("/obtener_usuarios", async (req, res) => {
    const [usuarios] = await pool.query("SELECT * FROM usuarios")
    res.send(usuarios)
})

app.get("/obtener_notas", async (req, res) => {
    const [notas] = await pool.query("SELECT ID_nota, titulo, cuerpo, fecha_creacion FROM notas")
    res.send(notas)
})