import { useEffect, useRef, useState } from 'react'
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { parseJSON } from "date-fns"
import axios from "axios"
import './App.css'
import ObjetoNota from './components/ObjetoNota/ObjetoNota'
import EditorQuill from './components/EditorQuill/EditorQuill'

function App() {
  const [valorTitulo, setValorTitulo] = useState("")
  const [valorCuerpo, setValorCuerpo] = useState("")
  const [contenidoModal, setContenidoModal] = useState({ titulo: "", cuerpo: "" })
  const [listaUsuarios, setListaUsuarios] = useState([])
  const [usuarioActual, setUsuarioActual] = useState("")
  const [listaNotas, setListaNotas] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const firstRender = useRef(true);

  useEffect(() => {
    obtenerNotas();
  }, [])

  const crearNota = () => {
    axios.post("http://localhost:3000/crear_nota", {

      titulo_nota: valorTitulo,
      cuerpo_nota: valorCuerpo

    }).then((res) => {

      setContenidoModal({ titulo: res.data.status, cuerpo: res.data.cuerpo })
      setIsOpen(true)
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

  const obtenerUsuarios = () => {
    axios.get("http://localhost:3000/obtener_usuarios").then((res) => {
      setListaUsuarios(res.data)
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
          <div>
            <EditorQuill valorCuerpo={valorCuerpo} setValorCuerpo={setValorCuerpo}></EditorQuill>
          </div>


          <button onClick={crearNota} >Crear Nota</button>
        </div>
        {/* -------------------------- AREA DISPLAY DE NOTAS ---------------------------------- */}

        <div className='displayNotas'>
          {/* <button onClick={obtenerNotas}>Refrescar Notas</button> */}
          {
            listaNotas.map(nota => (
              <ObjetoNota key={nota.ID_nota} id_nota={nota.ID_nota} titulo={nota.titulo} cuerpo={nota.cuerpo} fecha_creacion={nota.fecha_creacion.substring(0, 10)} controlOpenModal={setIsOpen} controlContenidoModal={setContenidoModal}/>
            ))
          }
        </div>
      </div>

      {/* -------------------------- MODALES ---------------------------------- */}

      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="modalAlerta">
        <DialogPanel className="modalAlertaInner">
          <DialogTitle className="modalAlertaTitulo">{contenidoModal.titulo}</DialogTitle>
          <Description className="modalAlertaCuerpo">{contenidoModal.cuerpo}</Description>
          <button onClick={() => setIsOpen(false)} className='modalAlertaBtn'>Ok</button>
        </DialogPanel>
      </Dialog>


    </>
  )
}

export default App
