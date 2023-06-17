import ControlPresupuesto from "./ControlPresupuesto"
import NuevoPresupuesto from "./NuevoPresupuesto"


const Header = ({ gastos, setGastos, presupuesto, setPresupuesto, isValuePresupuesto, setIsValuePresupuesto }) => {
  return (
    <header>
      <h1>Planificación de Gastos</h1>

      {isValuePresupuesto ? (
        <ControlPresupuesto
          gastos={gastos}
          setGastos={setGastos}
          presupuesto={presupuesto}
          setPresupuesto={setPresupuesto}
          setIsValuePresupuesto={setIsValuePresupuesto}
        />
      ) : (
        <NuevoPresupuesto
          presupuesto={presupuesto}
          setPresupuesto={setPresupuesto}
          setIsValuePresupuesto={setIsValuePresupuesto}
        />
      )}

    </header>
  )
}

export default Header
