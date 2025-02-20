import { useEffect, useState } from 'react'
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import axios from "axios"
import './App.css'
import ObjetoNota from './components/ObjetoNota/ObjetoNota'

function App() {
  const [valorTitulo, setValorTitulo] = useState("")
  const [valorCuerpo, setValorCuerpo] = useState("")
  const [contenidoModal, setContenidoModal] = useState({ titulo: "", cuerpo: "" })

  useEffect(() => {
    console.log(contenidoModal)
  }, [contenidoModal])

  const [isOpen, setIsOpen] = useState(false)

  const crearNota = async () => {
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

  return (
    <>
      <h1>App Notas</h1>

      <div className='creacionNotas'>
        <p>Título</p>
        <input type="text" id="input_titulo" onChange={e => setValorTitulo(e.target.value)} value={valorTitulo} />
        <p>Cuerpo</p>
        <textarea id="input_cuerpo" onChange={e => setValorCuerpo(e.target.value)} value={valorCuerpo}></textarea>
        <button onClick={crearNota} >Crear Nota</button>
      </div>

      <div className='displayNotas'>

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
