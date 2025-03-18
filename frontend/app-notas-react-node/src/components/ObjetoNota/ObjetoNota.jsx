import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useEffect, useState } from 'react'
import "./ObjetoNota.css"
import EditorQuill from '../EditorQuill/EditorQuill'
import axios from 'axios'


const ObjetoNota = (props) => {
    const [isOpen, setIsOpen] = useState(false)
    const [modoEdicion, setModoEdicion] = useState(false)
    const [valorCuerpoInterno, setValorCuerpoInterno] = useState('');
    const contenidoNota = {__html : valorCuerpoInterno}

    useEffect(()=> {
        setValorCuerpoInterno(props.cuerpo)
    },[])

    const abrirNota = () => {
        setIsOpen(true)
    }

    const editarNota = () => {
        axios.post("http://localhost:3000/editar_nota", {
            id_nota: props.id_nota,
            cuerpo_editado: valorCuerpoInterno
        }).then((res) => {
            console.log(res)
            props.controlOpenModal(true)
            props.controlContenidoModal({tipo: res.data.status, titulo: res.data.titulo, cuerpo: res.data.cuerpo })
        })

        setModoEdicion(false)

    }

    return (
        <>
            <div className="miniaturaNota" onClick={abrirNota}>
                <p className="tituloMiniatura">{props.titulo}</p>
                <p className="fechaMiniatura">{props.fecha_creacion}</p>
            </div>

            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="modalNota">
                <DialogPanel className="modalNotaInner">
                    <div className='contenidoModalNota' >
                        <DialogTitle className="modalNotaTitulo">{props.titulo}</DialogTitle>
                        <div className='contenedorCuerpoNota'>
                            {modoEdicion ? <EditorQuill valorCuerpo={valorCuerpoInterno} setValorCuerpo={setValorCuerpoInterno}></EditorQuill> : <Description className="modalNotaCuerpo" dangerouslySetInnerHTML={contenidoNota}></Description> }
                        </div>


                        <div className='containerModalNotaBtn'>
                            {!modoEdicion ? <button onClick={() => setModoEdicion(true)} className='modalNotaBtn'>Editar</button> : <button onClick={() => editarNota()} className='modalNotaBtn' >Confirmar</button>}

                            <button onClick={() => {setIsOpen(false); if(modoEdicion) {setModoEdicion(false)}}} className='modalNotaBtn'>Cerrar</button>
                        </div>
                    </div>
                </DialogPanel>
            </Dialog>
        </>
    )
}

export default ObjetoNota