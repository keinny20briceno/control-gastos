import { useState, useEffect } from 'react'
import Mensaje from './Mensaje'
import BtnCerrar from '../img/cerrar.svg'

const Modal = ({setModal, animarModal, setAnimarModal, guardarGastos, gastoEditar, setGastoEditar}) => {

    const [mensaje, setMensaje] = useState('')

    const [nombre, setNombre] = useState('')
    const [cantidad, setCantidad] = useState('')
    const [categoria, setCategoria] = useState('')
    const [id, setId] = useState('')
    const [fecha, setFecha] = useState('')

    useEffect(() =>{
        if(Object.keys(gastoEditar).length > 0){
            setNombre(gastoEditar.nombre)
            setCantidad(gastoEditar.cantidad)
            setCategoria(gastoEditar.categoria)
            setId(gastoEditar.id)
            setFecha(gastoEditar.fecha)
          }
    },[])

    const handlerCerrarModal = () =>{
        setAnimarModal(false)
        setGastoEditar({})
        setTimeout(() => {
            setModal(false)
          }, 400);
    }

    const handlerSubmit = (e) =>{
        e.preventDefault();
       if([nombre, cantidad, categoria].includes('')){
            setMensaje('Todos los campos son Obligatorios')
       
       setTimeout(() => {
        setMensaje('')
      }, 3000);
      return;
    }
    guardarGastos({nombre, cantidad, categoria, id, fecha});
    }
  return (
    <div className="modal">
            <div className="cerrar-modal">
                <img 
                src={BtnCerrar} 
                alt="Btn Cerrar modal"
                onClick={handlerCerrarModal}
                />
            </div>

            <form 
            onSubmit={handlerSubmit}
            className={`formulario ${animarModal ? "animar" : 'cerrar'}`}>
                <legend>{gastoEditar.nombre ? 'Editar Gasto' : 'Nuevo Gastos'}</legend>
                {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
                <div className="campo">
                    <label htmlFor="nombre">Nombre del Gasto</label>
                    <input 
                    id='nombre'
                    type="text"
                    placeholder='Añade el nuevo gasto'
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                    />
                </div>
                <div className="campo">
                    <label htmlFor="cantidad">Cantidad</label>
                    <input 
                    id='cantidad'
                    type="number"
                    placeholder='Añade la cantidad'
                    value={cantidad}
                    onChange={e => setCantidad(e.target.value)}
                    />
                </div>
                <div className="campo">
                    <label htmlFor="categoria">Categoria</label>
                    <select
                    id='categoria'
                    value={categoria}
                    onChange={e => setCategoria(e.target.value)}
                    >
                        <option value="" key="">-- Categorias --</option>
                        <option value="ahorro" key="">Ahorro</option>
                        <option value="comida" key="">Comida</option>
                        <option value="casa" key="">Casa</option>
                        <option value="suscripciones" key="">Suscripciones</option>
                        <option value="ocio" key="">Ocio</option>
                        <option value="salud" key="">Salud</option>
                        <option value="gastos" key="">Gastos Varios</option>
                    </select>
                </div>
                <input 
                type="submit"
                value={gastoEditar.nombre ? 'Guardar CAmbios' : 'Agregar Gastos'}
                 />
                 
            </form>
    </div>
  )
}

export default Modal
