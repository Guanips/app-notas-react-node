import "./ObjetoNota.css"

const ObjetoNota = (props) => {
    return (
        <>
            <div className="miniaturaNota">
                <p className="tituloMiniatura">{props.titulo}</p>
            </div>
            <div className="notaCompleta">
                <p className="tituloCompleta">{props.titulo}</p>
                <p className="cuerpoCompleta">{props.cuerpo}</p>
            </div>
        </>
    )
}

export default ObjetoNota