// imports para la tabla de UI
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';

import {useState} from 'react';


import TextField from '@mui/material/TextField';

import AvisoSnackbar from './avisoSnackbar.jsx';

export default function Tabla() {
  // estado principal , este y el de abajo creo qeu cambia por la conexion a la tabla de la BD?
    const [ empleados, setEmpleados] = useState ([
{nombre:'juan', apellido:'perez', dni:35656212, email:'juanperez@gmail.com', cargo:'cajero'},
{nombre:'romina', apellido:'silva', dni:46621562, email:'rominasilva@gmail.com', cargo:'atencion al cliente'},
{nombre:'ciro', apellido:'fernandez', dni:38656555, email:'cirofernandez@gmail.com', cargo:'seguridad'}
])
    // estados del formulario
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [dni, setDni] = useState('');
    const [email, setEmail] = useState('');
    const [cargo, setCargo] = useState('');

    const [formularioAbierto, setFormularioAbierto] = useState(false);

    const [empleadoEditando, setEmpleadoEditando] = useState(null);

    const [snackbarAbierto, setSnackbarAbierto] = useState(false);
    const [mensajeSnackbar, setMensajeSnackbar] = useState('');

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

    // arma el objeto con los campos no borra hace otra lista con ... no borra lo anterior
    function agregarEmpleado() {
      if (!validarEmpleado() ) {
        return;
      }
        const nuevoEmpleado = {
            nombre: nombre,
            apellido: apellido,
            dni: dni,
            email: email,
            cargo: cargo
        };
      
        // esto es para que luego de subir a la lista quede el formuario vacio
        setEmpleados([...empleados, nuevoEmpleado]);
        setNombre('');
        setApellido('');
        setDni('');
        setEmail('');
        setCargo('');
        setFormularioAbierto(false);
        setEmpleadoEditando(null);

        setMensajeSnackbar("Se agrego el empleado ✅"); 
        setSnackbarAbierto(true);
      };
    

    function eliminarEmpleado (DNI) {
      setEmpleados (empleados.filter((empleado) => empleado.dni !== DNI));
    }
    
    function editarEmpleado (empleado) {

      setFormularioAbierto(true);
      
      setEmpleadoEditando(empleado.dni);

      setNombre (empleado.nombre)
      setApellido (empleado.apellido)
      setDni (empleado.dni)
      setEmail (empleado.email)
      setCargo (empleado.cargo) 
    }

    function actualizarEmpleado() {
      if (!validarEmpleado()) {
        return ;
      }
      const empleadosActualizados = empleados.map((empleado) => {
      if (empleado.dni === empleadoEditando) {
        return {
          nombre: nombre,
          apellido:apellido,
          dni:dni,
          email:email, 
          cargo:cargo  };
       } else {
          return empleado; 
        }
      });
  
      setEmpleados(empleadosActualizados);
      setNombre('');
      setApellido('');
      setDni('');
      setEmail('');
      setCargo('');
      setFormularioAbierto(false);
      setEmpleadoEditando(null);

      setMensajeSnackbar("Se actualizo el empleado ✅"); 
        setSnackbarAbierto(true);
    }
        
    function guardarEmpleado() {
      if (empleadoEditando === null) {
      agregarEmpleado();
      } else {
      actualizarEmpleado();
      }
    }

    return ( 
    
    <>

    <button onClick = {() => setFormularioAbierto(true)} > Agregar Empleado </button>

    <TableContainer component={Paper} sx={{ mt: 3 }}>
      <Table sx={{ minWidth: 650  }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell align="right">Apellido</TableCell>
            <TableCell align="right">DNI</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Cargo</TableCell>
            <TableCell align="right">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

    
          
          {empleados.map((empleado) => (
            <TableRow
              key={empleado.dni }
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{empleado.nombre}</TableCell>
              <TableCell align="right">{empleado.apellido}</TableCell>
              <TableCell align="right">{empleado.dni}</TableCell>
              <TableCell align="right">{empleado.email}</TableCell>
              <TableCell align="right">{empleado.cargo}</TableCell>
              <TableCell align="right"> <button onClick={() => eliminarEmpleado(empleado.dni)}>Eliminar</button> </TableCell>
              <TableCell align="right"> <button onClick={() => editarEmpleado(empleado)}>Editar</button> </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>


    {formularioAbierto && (
    <Paper sx={{ padding: 3, marginTop: 7, width: 450 }}>
    <h3>Agregar Nuevo Empleado</h3>
    <Stack spacing={2}>
    <TextField label="nombre" variant="outlined" value={nombre} onChange={(e) => setNombre(e.target.value)} />
    <TextField label="apellido" variant="outlined" value={apellido} onChange={(e) => setApellido(e.target.value)} />
    <TextField label="dni" variant="outlined" value={dni} onChange={(e) => setDni(e.target.value)} />
    <TextField label="email" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} />
    <TextField label="cargo" variant="outlined" value={cargo} onChange={(e) => setCargo(e.target.value)} />


    <button type="button" onClick={guardarEmpleado}>
        Guardar
    </button>
    </Stack>
    </Paper>
    )}

    <AvisoSnackbar 
      abierto={snackbarAbierto} 
      mensaje={mensajeSnackbar} 
      onCerrar={() => setSnackbarAbierto(false)} />


    </>
  );
}

     







