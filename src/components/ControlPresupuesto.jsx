import { useState, useEffect } from "react"
import { CircularProgressbar, buildStyles} from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css"

const ControlPresupuesto = ({gastos, setGastos, presupuesto, setPresupuesto, setIsValuePresupuesto}) => {

  const [disponible, setDisponible] = useState(0)
  const [gastado, setGastado] = useState(0)
  const [porcentaje, Setporcentaje] = useState(0)

  useEffect(() => {
    const totalGastado = gastos.reduce( (total, gasto ) => Number(gasto.cantidad) + Number(total), 0);
    const totalDisponible = presupuesto - totalGastado;

    //Calcular el % de lo gastado

    const nuevoPorcentaje = (( (presupuesto - totalDisponible) / presupuesto) * 100).toFixed(2);
    console.log(nuevoPorcentaje)
    
    setDisponible(totalDisponible)
    setGastado(totalGastado)
    console.log(totalGastado)
    setTimeout(() => {
      Setporcentaje(nuevoPorcentaje)
    }, 1500);
  },[gastos])

  const formatearCantidad = (cantidad) => {
    return cantidad.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
     })
}
  const handleResetApp = () => {
    const resultado = confirm('Desea reiniciar la App')
    if(resultado){
      setGastos([])
      setPresupuesto(0)
      setIsValuePresupuesto(false)
    }
  }
  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
        <div>
            <CircularProgressbar 
            styles={buildStyles({
              pathColor: porcentaje > 0 ? '#DC2626' : '#3b82f6',
              trailColor: '#F5F5F5',
              textColor: porcentaje > 0 ? '#DC2626' : '#3b82f6',
            })}
            value={porcentaje}
            text={`${porcentaje}% Gastado`}
            />
        </div>
      <div className="contenido-presupuesto">
      <button
                    className="reset-app"
                    type="button"
                    onClick={handleResetApp}
                >
                    Resetear App
                </button>
        <p>
            <span>Presupuesto:</span> {formatearCantidad(presupuesto)}
        </p>
        <p className={`${disponible < 0 ? 'negativo' : '' }`}>
            <span>Disponible:</span> {formatearCantidad(disponible)}
        </p>
        <p>
            <span>Gastado:</span> {formatearCantidad(gastado)}
        </p>
      </div>
    </div>
  )
}

export default ControlPresupuesto
