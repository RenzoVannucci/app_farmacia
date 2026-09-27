/* pantallas completas (lo que ve el usuario en cada "ruta") */
import TarjetaDashboard from '../components/tarjetaDashboard.jsx';

import Divider from '@mui/material/Divider'; 

import Stack from '@mui/material/Stack';




export default function Dashboard() {
  return (
    <div style={{ paddingBottom: '80px' }}>  
      <h1>Sistema de gestion de Farmacia</h1>
      <h2>Dashboard</h2>
      <p>Se observa informacion mas relevante de la farmacia, incluyendo el numero total de medicamentos, empleados y categorias disponibles.</p>
      <Stack sx={{ justifyContent: 'center', padding: 2, marginTop: 2 }}

        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={2}
      >
      
      <TarjetaDashboard  titulo="Medicamentos" valor="100"  />
      <TarjetaDashboard  titulo="Empleados" valor="50"  />
      <TarjetaDashboard  titulo="Categorías" valor="5"  />
      </Stack>
      
    </div>
  ); 
}