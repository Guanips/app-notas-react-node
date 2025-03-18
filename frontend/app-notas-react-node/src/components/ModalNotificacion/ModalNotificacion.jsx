import { useState } from "react"
import "./ModalNotificacion.css"
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'

const ModalNotificacion = ({notificacion_tipo="alerta", notificacion_titulo, notificacion_cuerpo, control_apertura_notificacion, estado_apertura_notificacion}) => {
    let claseTipoNotificacion = "notificacion_alerta"
    
    switch (notificacion_tipo) {
        case "exito":
            claseTipoNotificacion = "notificacion_exito"
            break;
        case "error":
            claseTipoNotificacion = "notificacion_error"
            break

        default:
            claseTipoNotificacion = "notificacion_alerta"
            break;
    }


    return (
        <>
            <Dialog open={estado_apertura_notificacion} onClose={() => control_apertura_notificacion(false)} className="modalNotificacion">
            <DialogPanel className={claseTipoNotificacion + " modalNotificacionInner"}>
                <DialogTitle className="modalNotificacionTitulo">{notificacion_titulo}</DialogTitle>
                <Description className="modalNotificacionCuerpo">{notificacion_cuerpo}</Description>
                <button onClick={() => control_apertura_notificacion(false)} className='modalNotificacionBtn'>Ok</button>
            </DialogPanel>
            </Dialog>
        </>
    )
}

export default ModalNotificacion