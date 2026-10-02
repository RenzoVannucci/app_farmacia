
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';

import { useEffect, useState } from 'react';

import TextField from '@mui/material/TextField';
import AvisoSnackbar from './avisoSnackbar.jsx'; 
import Button from '@mui/material/Button';
import { lightGreen } from '@mui/material/colors';

export default function Tabla() {

  const [empleados, setEmpleados] = useState([]);

  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [dni, setDni] = useState('');
  const [email, setEmail] = useState('');
  const [cargo, setCargo] = useState('');

  const [formularioAbierto, setFormularioAbierto] = useState(false);
  const [empleadoEditando, setEmpleadoEditando] = useState(null);

  const [snackbarAbierto, setSnackbarAbierto] = useState(false);
  const [mensajeSnackbar, setMensajeSnackbar] = useState('');

  const [textoBusqueda, setTextoBusqueda] = useState('');

  // Cargar empleados desde el backend
  useEffect(() => {
    fetch('http://127.0.0.1:8000/empleados/')
      .then((respuesta) => respuesta.json())
      .then((datos) => {
        setEmpleados(datos);
      });
  }, []);

  function validarEmpleado() {
    if (nombre === '') {
      setMensajeSnackbar('El nombre es obligatorio');
      setSnackbarAbierto(true);
      return false;
    }

    if (apellido === '') {
      setMensajeSnackbar('El apellido es obligatorio');
      setSnackbarAbierto(true);
      return false;
    }

    if (dni.length < 7 || dni.length > 8) {
      setMensajeSnackbar('El dni no es valido');
      setSnackbarAbierto(true);
      return false;
    }

    if (!email.includes('@')) {
      setMensajeSnackbar('El email no es valido');
      setSnackbarAbierto(true);
      return false;
    }

    if (cargo === '') {
      setMensajeSnackbar('El cargo es obligatorio');
      setSnackbarAbierto(true);
      return false;
    }

    return true;
  }

  function agregarEmpleado() {
    if (!validarEmpleado()) {
      return;
    }

    fetch('http://127.0.0.1:8000/empleados/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nombre: nombre,
        apellido: apellido,
        dni: Number(dni),
        email: email,
        cargo: cargo
      })
    })
      .then((respuesta) => respuesta.json())
      .then((datos) => {
        setEmpleados([...empleados, datos.empleado]);

        setNombre('');
        setApellido('');
        setDni('');
        setEmail('');
        setCargo('');
        setFormularioAbierto(false);
        setEmpleadoEditando(null);

        setMensajeSnackbar('Se agrego el empleado ✅');
        setSnackbarAbierto(true);
      });
  }

  function eliminarEmpleado(empleadoId) {
    fetch(`http://127.0.0.1:8000/empleados/${empleadoId}`, {
      method: 'DELETE'
    })
      .then((respuesta) => respuesta.json())
      .then((datos) => {
        console.log(datos);

        setEmpleados(empleados.filter((empleado) => empleado.id !== empleadoId));

        setMensajeSnackbar('Se elimino el empleado ✅');
        setSnackbarAbierto(true);
      });
  }

  function editarEmpleado(empleado) {
    setFormularioAbierto(true);
    setEmpleadoEditando(empleado.id);
    setNombre(empleado.nombre);
    setApellido(empleado.apellido);
    setDni(empleado.dni);
    setEmail(empleado.email);
    setCargo(empleado.cargo);
  }

  function actualizarEmpleado() {
    if (!validarEmpleado()) {
      return;
    }

    fetch(`http://127.0.0.1:8000/empleados/${empleadoEditando}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nombre: nombre,
        apellido: apellido,
        dni: Number(dni),
        email: email,
        cargo: cargo
      })
    })
      .then((respuesta) => respuesta.json())
      .then((datos) => {
        const empleadosActualizados = empleados.map((empleado) => {
          if (empleado.id === empleadoEditando) {
            return datos.empleado;
          }
          return empleado;
        });

        setEmpleados(empleadosActualizados);

        setNombre('');
        setApellido('');
        setDni('');
        setEmail('');
        setCargo('');
        setFormularioAbierto(false);
        setEmpleadoEditando(null);

        setMensajeSnackbar('Se actualizo el empleado ✅');
        setSnackbarAbierto(true);
      });
  }

  function guardarEmpleado() {
    if (empleadoEditando === null) {
      agregarEmpleado();
    } else {
      actualizarEmpleado();
    }
  }

  function buscarEmpleado() {
  if (textoBusqueda === '') {
    fetch('http://127.0.0.1:8000/empleados/')
      .then(respuesta => respuesta.json())
      .then(datos => setEmpleados(datos));
    return;
  }
  
  fetch(`http://127.0.0.1:8000/empleados/buscar/nombre?nombre=${textoBusqueda}`)
    .then(respuesta => {
      if (respuesta.status === 404) {
        return fetch(`http://127.0.0.1:8000/empleados/buscar/apellido?apellido=${textoBusqueda}`)
          .then(resp2 => resp2.json());
      }
      return respuesta.json();
    })
    .then(datos => setEmpleados(datos));
}
  return (
    <>
      <Button variant="outlined" color="secondary" onClick={() => setFormularioAbierto(true)}>Agregar Empleado</Button>


      <Stack direction="row" spacing={2} sx={{ marginBottom: 2 }}>
  <TextField 
    label="Buscar por nombre o apellido" 
    variant="outlined" 
    size="small"
    value={textoBusqueda} 
    onChange={(e) => setTextoBusqueda(e.target.value)} 
  />
  <Button variant="contained" onClick={buscarEmpleado}>Buscar</Button>
</Stack>


      <TableContainer component={Paper} sx={{ mt: 3, backgroundColor: lightGreen[50] }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ backgroundColor: lightGreen[800] }}>
              <TableCell>Nombre</TableCell>
              <TableCell align="right">Apellido</TableCell>
              <TableCell align="right">DNI</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Cargo</TableCell>
              <TableCell align="right">Acciones</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {empleados.map((empleado) => (
              <TableRow key={empleado.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">{empleado.nombre}</TableCell>
                <TableCell align="right">{empleado.apellido}</TableCell>
                <TableCell align="right">{empleado.dni}</TableCell>
                <TableCell align="right">{empleado.email}</TableCell>
                <TableCell align="right">{empleado.cargo}</TableCell>
                <TableCell align="right"><Button variant="outlined" color="error" size="small" onClick={() => eliminarEmpleado(empleado.id)}>Eliminar</Button></TableCell>
                <TableCell align="right"><Button variant="outlined" color="success" size="small" onClick={() => editarEmpleado(empleado)}>Editar</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {formularioAbierto && (
        <Paper sx={{ padding: 3, marginTop: 7, width: 450 }}>
          <h3>{empleadoEditando === null ? 'Agregar Nuevo Empleado' : 'Editar Empleado'}</h3>

          <Stack spacing={2}>
            <TextField label="nombre" variant="outlined" value={nombre} onChange={(e) => setNombre(e.target.value)} />
            <TextField label="apellido" variant="outlined" value={apellido} onChange={(e) => setApellido(e.target.value)} />
            <TextField label="dni" variant="outlined" value={dni} onChange={(e) => setDni(e.target.value)} />
            <TextField label="email" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} />
            <TextField label="cargo" variant="outlined" value={cargo} onChange={(e) => setCargo(e.target.value)} />

            <Button variant="outlined" color="secondary" type="button" onClick={guardarEmpleado}>Guardar</Button>
          </Stack>
        </Paper>
      )}

      <AvisoSnackbar abierto={snackbarAbierto} mensaje={mensajeSnackbar} onCerrar={() => setSnackbarAbierto(false)} />
    </>
  );
}

