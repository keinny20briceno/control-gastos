import { useState } from "react";
import Mensaje from "./Mensaje";

const NuevoPresupuesto = ({presupuesto, setPresupuesto, setIsValuePresupuesto}) => {

    const [mensaje, setMensaje] = useState('')

    const handlerPresupuesto = (e) => {
        e.preventDefault();
        if(!presupuesto || presupuesto < 0){
            setMensaje('no es un presupuesto valido')
            return
        }
        setMensaje('')
        setIsValuePresupuesto(true)
        console.log(presupuesto)
    }
  return (
    <div className="contenedor-presupuesto contenedor sombra">

    <form onSubmit={handlerPresupuesto} className="formulario">
        <div className="campo">
            <label htmlFor="">Definir Presupuesto</label>
            <input            
            className="nuevo-presupuesto" 
            type="number"
            placeholder="Añade tu Presupuesto"
            value={presupuesto}
            onChange={e => setPresupuesto(Number(e.target.value))} />
        </div>
        <input type="submit" value="Añadir" />
        {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
    </form>
    </div>
  )
}

export default NuevoPresupuesto
