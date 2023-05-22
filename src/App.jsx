import { useState, useEffect } from 'react'
import Header from './components/Header'
import Filtro from './components/Filtro'
import ListadoGastos from './components/ListadoGastos'
import Modal from './components/Modal'
import { genararId } from './helpers'
import IconoNuevoGasto from './img/nuevo-gasto.svg'


function App() {

  const [gastos, setGastos] = useState( 
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
  )

  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto')) ?? 0
  )
  const [isValuePresupuesto, setIsValuePresupuesto] = useState(false)

  const [modal, setModal] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)

  const [gastoEditar, setGastoEditar] = useState({})

  const [filtro, setFiltro] = useState({})
  const [gastosFiltrados, setGastosFiltrados] = useState([])

  useEffect(() =>{
    if(Object.keys(gastoEditar).length > 0){
      setModal(true)
      
      setTimeout(() => {
        setAnimarModal(true)
      }, 400);
    }
  },[gastoEditar])

  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0)
  },[presupuesto])

  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
  },[gastos])

  useEffect(()=>{
      const presupuestoLs = Number(localStorage.getItem('presupuesto') ?? 0)
      if(presupuestoLs > 0){
        setIsValuePresupuesto(true)
      }
  },[])

  useEffect(() => {
    if(filtro){
      const gastosFiltrados = gastos.filter( gasto => gasto.categoria === filtro)
        setGastosFiltrados(gastosFiltrados)
    }
  },[filtro])

  const handlerNuevoGasto = () =>{
        setModal(true)
        setGastoEditar({})

        setTimeout(() => {
          setAnimarModal(true)
        }, 400);

  }

  const eliminarGasto = id => {
      const gastosActualizados = gastos.filter( gasto => gasto.id !== id)
      setGastos(gastosActualizados)
  }

  const guardarGastos = gasto =>{
    if(gasto.id){
      //Actualizar gasto
      const gastosActualizados = gastos.map( gastoState => gastoState.id === 
        gasto.id ? gasto : gastoState)
        setGastos(gastosActualizados)
        setGastoEditar({})
    }else{
      // Agregar gasto
      gasto.id = genararId()
      gasto.fecha = Date.now()
      setGastos([...gastos, gasto])
    }
    setAnimarModal(false)
    setTimeout(() => {
        setModal(false)
      }, 400);
  }
  return (
    <div className={modal ? 'fijar' : ''}>
          <Header 
          setGastos={setGastos}
          gastos={gastos}
          presupuesto={presupuesto}
          setPresupuesto={setPresupuesto}
          isValuePresupuesto={isValuePresupuesto}
          setIsValuePresupuesto={setIsValuePresupuesto}
          />
          
          {isValuePresupuesto && (
           <>
           <main>
             <Filtro
             filtro={filtro}
             setFiltro={setFiltro}
             />
             <ListadoGastos
             gastos={gastos}
             setGastoEditar={setGastoEditar}
             eliminarGasto={eliminarGasto}
             gastosFiltrados={gastosFiltrados}
             filtro={filtro}
             />
           </main>
            <div className='nuevo-gasto'>
                <img 
                  src={IconoNuevoGasto} 
                  alt="icono nuevo gasto"
                  onClick={handlerNuevoGasto}
                />
            </div>
           </>
          )}
          {modal && <Modal 
          setModal={setModal}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          guardarGastos={guardarGastos}
          gastoEditar={gastoEditar}
          setGastoEditar={setGastoEditar}
          />}
    </div>
  )
}

export default App
