import { useEffect, useRef, useState } from 'react'
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { parseJSON } from "date-fns"
import axios from "axios"
import './App.css'
import ObjetoNota from './components/ObjetoNota/ObjetoNota'
import EditorQuill from './components/EditorQuill/EditorQuill'
import ModalNotificacion from './components/ModalNotificacion/ModalNotificacion'

function App() {
  const [valorTitulo, setValorTitulo] = useState("")
  const [valorCuerpo, setValorCuerpo] = useState("")
  const [contenidoModalNotifiacion, setContenidoModalNotificacion] = useState({tipo:"", titulo: "", cuerpo: ""})
  const [listaNotas, setListaNotas] = useState([])
  const [isOpenNotificacion, setIsOpenNotificacion] = useState(false)

  useEffect(() => {
    obtenerNotas();
  }, [])

  const crearNota = () => {
    axios.post("http://localhost:3000/crear_nota", {

      titulo_nota: valorTitulo,
      cuerpo_nota: valorCuerpo

    }).then((res) => {

      setContenidoModalNotificacion({tipo: res.data.status, titulo: res.data.titulo, cuerpo: res.data.cuerpo })
      setIsOpenNotificacion(true)
      if (res.data.status == "exito") {
        obtenerNotas();
      }
    })

    setValorTitulo("")
    setValorCuerpo("")
  }

  const obtenerNotas = () => {
    axios.get("http://localhost:3000/obtener_notas").then((res) => {
      setListaNotas(res.data)
    })
  }

  return (
    <>
      <h1>App Notas</h1>


      <div className='contenedorGeneral'>
        {/* -------------------------- AREA CREACION DE NOTAS ---------------------------------- */}
        <div className='creacionNotas'>
          <p>Título</p>
          <input type="text" id="input_titulo" onChange={e => setValorTitulo(e.target.value)} value={valorTitulo} />
          <p>Cuerpo</p>
          <div className='contenedorQuill'>
            <EditorQuill valorCuerpo={valorCuerpo} setValorCuerpo={setValorCuerpo}></EditorQuill>
          </div>


          <button onClick={crearNota} >Crear Nota</button>
        </div>
        {/* -------------------------- AREA DISPLAY DE NOTAS ---------------------------------- */}

        <div className='displayNotas'>
          {/* <button onClick={obtenerNotas}>Refrescar Notas</button> */}
          {
            listaNotas.map(nota => (
              <ObjetoNota key={nota.ID_nota} id_nota={nota.ID_nota} titulo={nota.titulo} cuerpo={nota.cuerpo} fecha_creacion={nota.fecha_creacion.substring(0, 10)} controlOpenModal={setIsOpenNotificacion} controlContenidoModal={setContenidoModalNotificacion}/>
            ))
          }
        </div>
      </div>

      {/* -------------------------- MODALES ---------------------------------- */}

      {/* <Dialog open={isOpenNotificacion} onClose={() => setIsOpenNotificacion(false)} className="modalAlerta">
        <DialogPanel className="modalAlertaInner">
          <DialogTitle className="modalAlertaTitulo">{contenidoModal.titulo}</DialogTitle>
          <Description className="modalAlertaCuerpo">{contenidoModal.cuerpo}</Description>
          <button onClick={() => setIsOpenNotificacion(false)} className='modalAlertaBtn'>Ok</button>
        </DialogPanel>
      </Dialog> */}

      <ModalNotificacion notificacion_tipo={contenidoModalNotifiacion.tipo} notificacion_titulo={contenidoModalNotifiacion.titulo} notificacion_cuerpo={contenidoModalNotifiacion.cuerpo} control_apertura_notificacion={setIsOpenNotificacion} estado_apertura_notificacion={isOpenNotificacion}></ModalNotificacion>
    </>
  )
}

export default App
