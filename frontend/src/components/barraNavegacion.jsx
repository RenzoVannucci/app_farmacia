import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

import HomeIcon from '@mui/icons-material/Home';
import MedicationIcon from '@mui/icons-material/Medication';
import CategoryIcon from '@mui/icons-material/Category';
import PersonIcon from '@mui/icons-material/Person';


import { Link as RouterLink } from 'react-router-dom';

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);

  return (
    <Box sx={{
    width: 500,
    position: 'fixed',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
  }}
>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction component={RouterLink} to="/" label="Dashboard" icon={<HomeIcon />} />
        <BottomNavigationAction component={RouterLink} to="/medicamentos" label="Medicamentos" icon={<MedicationIcon />} />
        <BottomNavigationAction component={RouterLink} to="/categorias" label="Categorías" icon={<CategoryIcon />} />
        <BottomNavigationAction component={RouterLink} to="/empleados" label="Empleados" icon={<PersonIcon />} />
      </BottomNavigation>
    </Box>
  );
}
