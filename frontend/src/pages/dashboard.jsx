/* pantallas completas (lo que ve el usuario en cada "ruta") */
import TarjetaDashboard from '../components/tarjetaDashboard.jsx';

import Divider from '@mui/material/Divider'; 

import Stack from '@mui/material/Stack';

// En Dashboard.jsx
import MedicationIcon from '@mui/icons-material/Medication';
import PersonIcon from '@mui/icons-material/Person';
import CategoryIcon from '@mui/icons-material/Category';




export default function Dashboard() {
  return (
    <div style={{ paddingBottom: '80px' }}>  
      <h1>Sistema de gestion para Farmacia</h1>
      
      
      <Stack 
      sx={{ alignItems: 'center', width: '100%', padding: 5 }}
      divider={<Divider orientation="vertical" flexItem />}
      spacing={2}
      >
      
      <TarjetaDashboard  titulo="Medicamentos" valor="100" icono={<MedicationIcon />} />
      <TarjetaDashboard  titulo="Empleados" valor="50" icono={<PersonIcon />}  />
      <TarjetaDashboard  titulo="Categorías" valor="5" icono={<CategoryIcon />}  />
      </Stack>
      
    </div>
  ); 
}