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
  <div style={{ padding: '24px 32px 80px' }}>
    <h1 style={{ marginBottom: 8 }}>
      Sistema de Gestión para Farmacia
    </h1>

    <p
      style={{
        textAlign: 'center',
        color: '#64748b',
        marginBottom: 24,
      }}
    >
      Resumen general del sistema
    </p>

    {/* Tarjetas de resumen */}
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      spacing={3}
      sx={{
        width: '100%',
        justifyContent: 'center',
        alignItems: 'stretch',
        mb: 5,
      }}
    >
      <TarjetaDashboard
        titulo="Medicamentos"
        valor={cantidades.medicamentos}
        icono={<MedicationIcon />}
      />

      <TarjetaDashboard
        titulo="Empleados"
        valor={cantidades.empleados}
        icono={<PersonIcon />}
      />

      <TarjetaDashboard
        titulo="Categorías"
        valor={cantidades.categorias}
        icono={<CategoryIcon />}
      />
    </Stack>

    {/* Gráfico y stock bajo */}
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      spacing={3}
      alignItems="stretch"
    >
      {/* Gráfico */}
      <div
        style={{
          flex: 1,
          minWidth: 0,
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: 16,
          padding: 24,
          boxShadow: '0 4px 12px rgba(15, 23, 42, 0.04)',
        }}
      >
        <h3
          style={{
            marginTop: 0,
            color: '#263445',
            fontSize: 18,
          }}
        >
          Medicamentos por categoría
        </h3>

        {datosGrafico.length > 0 ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              overflowX: 'auto',
            }}
          >
            <PieChart
              series={[
                {
                  data: datosGrafico.map((d, index) => ({
                    id: index,
                    value: d.cantidad,
                    label: d.categoria,
                  })),
                },
              ]}
              colors={['#378ADD', '#0C447C', '#85B7EB']}
              width={300}
              height={240}
            />
          </div>
        ) : (
          <p style={{ color: '#64748b' }}>
            No hay datos para mostrar en el gráfico.
          </p>
        )}
      </div>

      {/* Stock bajo */}
      <div
        style={{
          flex: 1,
          minWidth: 0,
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: 16,
          padding: 24,
          boxShadow: '0 4px 12px rgba(15, 23, 42, 0.04)',
        }}
      >
        <h3
          style={{
            marginTop: 0,
            color: '#263445',
            fontSize: 18,
          }}
        >
          Alertas de stock bajo
        </h3>

        {stockBajo.length > 0 ? (
          stockBajo.map((medicamento) => (
            <div
              key={medicamento.nombre}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 12,
                padding: '12px 0',
                borderBottom: '1px solid #edf2f7',
              }}
            >
              <span style={{ color: '#334155' }}>
                {medicamento.nombre}
              </span>

              <span
                style={{
                  fontWeight: 600,
                  color: '#b45309',
                  background: '#fef3c7',
                  padding: '5px 10px',
                  borderRadius: 8,
                  whiteSpace: 'nowrap',
                }}
              >
                {medicamento.stock} unid.
              </span>
            </div>
          ))
        ) : (
          <p style={{ color: '#64748b', paddingTop: 8 }}>
            No hay medicamentos con stock bajo.
          </p>
        )}
      </div>
    </Stack>
  </div>
);

}