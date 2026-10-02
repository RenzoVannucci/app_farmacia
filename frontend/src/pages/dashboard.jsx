/* pantallas completas (lo que ve el usuario en cada "ruta") */
import TarjetaDashboard from '../components/tarjetaDashboard.jsx';

import Divider from '@mui/material/Divider'; 

import Stack from '@mui/material/Stack';

// En Dashboard.jsx
import MedicationIcon from '@mui/icons-material/Medication';
import PersonIcon from '@mui/icons-material/Person';
import CategoryIcon from '@mui/icons-material/Category';

import { useEffect, useState } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';


export default function Dashboard() {

  const [cantidades, setCantidades] = useState({
    medicamentos: 0,
    categorias: 0,
    empleados: 0
  });

  useEffect(() => {
  fetch('http://127.0.0.1:8000/dashboard/counts')
    .then((respuesta) => respuesta.json())
    .then((datos) => {
      setCantidades(datos);
    });
  }, []);

  useEffect(() => {
  fetch('http://127.0.0.1:8000/medicamentos/')
    .then((respuesta) => respuesta.json())
    .then((datos) => {
      setMedicamentos(datos);
    });
  }, []);

  useEffect(() => {
  fetch('http://127.0.0.1:8000/categorias/')
    .then((respuesta) => respuesta.json())
    .then((datos) => {
      setCategorias(datos);
    });
  }, []);

  const [medicamentos, setMedicamentos] = useState([]);

  const [categorias, setCategorias] = useState([]);

  const datosGrafico = categorias.map((categoria) => ({
    categoria: categoria.nombre,
    cantidad: medicamentos.filter((medicamento) => medicamento.categoria_id === categoria.id).length
  }));


  const medicamentosOrdenados = [...medicamentos].sort((a, b) => a.stock - b.stock);
  const stockBajo = medicamentosOrdenados.slice(0, 2);

  return (
    <div style={{ paddingBottom: '80px' }}>  
      <h1>Sistema de gestion para Farmacia</h1>
      
      
      <Stack 
      direction="row"
      sx={{ alignItems: 'center', width: '100%', padding: 5,  gap:2 }}
      divider={<Divider orientation="vertical" flexItem />}
      spacing={2}
      >
      <TarjetaDashboard titulo="Medicamentos" valor={cantidades.medicamentos} icono={<MedicationIcon />} />
      <TarjetaDashboard titulo="Empleados" valor={cantidades.empleados} icono={<PersonIcon />} />
      <TarjetaDashboard titulo="Categorías" valor={cantidades.categorias} icono={<CategoryIcon />} />
      
      </Stack>
      
      <h4>MEDICAMENTOS POR CATEGORIA</h4>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <PieChart
          series={[ {
            data: datosGrafico.map((d, index) => ({
            id: index,
            value: d.cantidad,
            label: d.categoria })),
            },
          ]}
          colors={['#378ADD', '#0C447C', '#85B7EB']}
          slotProps={{ legend: { hidden: true } }}
          width={250}
          height={200}
        />
      </div>

      
      <div style={{ background: '#e6f1fb', borderRadius: 12, padding: 16, marginTop: 60 }}>
      <h3 style={{ color: '#2c2c2a', fontSize: 14 }}>Medicamentos con stock bajo</h3>
      {stockBajo.map((medicamento) => (
        <div key={medicamento.nombre} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', color: '#2c2c2a' }}>
          <span>{medicamento.nombre}</span>
          <span style={{ fontWeight: 500, color: '#185FA5' }}>{medicamento.stock} unid.</span>
        </div>
      ))}
      </div>
    </div>
  ); 
}