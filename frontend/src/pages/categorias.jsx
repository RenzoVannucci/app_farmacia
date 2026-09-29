/* pantallas completas (lo que ve el usuario en cada "ruta") */
import TablaCategorias from "../components/tablaCategorias.jsx"
import Tabla from "../components/tablaEmpleados"

export default function Categorias() {
  return (
    <div style={{ paddingBottom: '80px' }}>
      <h1>Gestion de Categorías</h1>
      < TablaCategorias />
    </div>
  )
}
 