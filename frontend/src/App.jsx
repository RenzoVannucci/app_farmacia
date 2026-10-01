
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/dashboard.jsx';
import Categorias from './pages/categorias.jsx';
import Empleados from './pages/empleados.jsx';
import Medicamentos from './pages/medicamentos.jsx';

import BarraNavegacion from './components/barraNavegacion.jsx';

function App() {  


  return (
    <>
      <section id="center">


        <BrowserRouter>
        <BarraNavegacion />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/categorias" element={<Categorias />} />
              <Route path="/empleados" element={<Empleados />} />
              <Route path="/medicamentos" element={<Medicamentos />} />
            </Routes>
          </BrowserRouter>



          
          
      </section>

      
    </>
  )
}

export default App
