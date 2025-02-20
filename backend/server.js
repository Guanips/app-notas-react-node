import express from "express"
import cors from "cors"

const port = 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.listen(port, () => {
    console.log("server created at port " + port);
});

app.post("/crear_nota", (req, res) => {
    console.log(req.body)
    if (req.body.titulo_nota != "" && req.body.cuerpo_nota != "") {
        res.send(
            {
                status: "Exito",
                cuerpo: "Nota recibida"
            }
        )
    } else {
        res.send({
            status: "Error",
            cuerpo: "No se puede crear una nota vacia"
        })
    }

})

app.get("/obtener_notas", (req, res) => {

})