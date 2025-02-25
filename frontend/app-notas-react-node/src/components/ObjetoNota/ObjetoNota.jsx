import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react'
import "./ObjetoNota.css"


const ObjetoNota = (props) => {
    const [isOpen, setIsOpen] = useState(false)

    const abrirNota = () => {
        setIsOpen(true)
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
                        <Description className="modalNotaCuerpo">{props.cuerpo}</Description>
                        <button onClick={() => setIsOpen(false)} className='modalNotaBtn'>Cerrar</button>
                    </div>
                </DialogPanel>
            </Dialog>
        </>
    )
}

export default ObjetoNota