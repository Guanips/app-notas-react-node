import { useEffect, useRef, useState } from 'react'
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import axios from "axios"
import './App.css'
import ObjetoNota from './components/ObjetoNota/ObjetoNota'

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
    if (firstRender.current) {
      firstRender.current = false
      return
    }

    console.log(listaNotas)
  }, [listaNotas])

  const crearNota = () => {
    axios.post("http://localhost:3000/crear_nota", {

      titulo_nota: valorTitulo,
      cuerpo_nota: valorCuerpo

    }).then((res) => {

      setContenidoModal({ titulo: res.data.status, cuerpo: res.data.cuerpo })
      setIsOpen(true)

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
          <textarea id="input_cuerpo" onChange={e => setValorCuerpo(e.target.value)} value={valorCuerpo}></textarea>
          <button onClick={crearNota} >Crear Nota</button>
        </div>
        {/* -------------------------- AREA DISPLAY DE NOTAS ---------------------------------- */}

        <div className='displayNotas'>
          <button onClick={obtenerNotas}>Obtener Notas</button>
          {
            listaNotas.map(nota => (
              <ObjetoNota titulo={nota.titulo} cuerpo={nota.cuerpo} fecha_creacion={nota.fecha_creacion} />
            ))
          }
        </div>
      </div>




      {/* -------------------------- MODALES ---------------------------------- */}

      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="modal">
        <DialogPanel className="modalInner">
          <DialogTitle className="modalTitulo">{contenidoModal.titulo}</DialogTitle>
          <Description className="modalCuerpo">{contenidoModal.cuerpo}</Description>
          <button onClick={() => setIsOpen(false)} className='modalBtn'>Ok</button>
        </DialogPanel>
      </Dialog>

    </>
  )
}

export default App
