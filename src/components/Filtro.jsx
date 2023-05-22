import {useState, useEffect } from 'react'

const Filtro = ({filtro, setFiltro}) => {
  return (
    <div className='filtros sombra contenedor'>
        <form action="">
            <div className='campo'>
                <label htmlFor="">Filtrar Gastos</label>
                <select 
                value={filtro}
                onChange={e => setFiltro(e.target.value)}
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
        </form>
      
    </div>
  )
}

export default Filtro
