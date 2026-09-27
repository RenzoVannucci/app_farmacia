import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';

import {useState} from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';



export default function Tabla() {
    const [ empleados, setEmpleados] = useState ([
{nombre:'juan', apellido:'perez', dni:35656212, email:'juanperez@gmail.com', cargo:'cajero'},
{nombre:'romina', apellido:'silva', dni:46621562, email:'rominasilva@gmail.com', cargo:'atencion al cliente'},
{nombre:'ciro', apellido:'fernandez', dni:38656555, email:'cirofernandez@gmail.com', cargo:'seguridad'}
])

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [dni, setDni] = useState('');
    const [email, setEmail] = useState('');
    const [cargo, setCargo] = useState('');

    function agregarEmpleado() {
        const nuevoEmpleado = {
            nombre: nombre,
            apellido: apellido,
            dni: dni,
            email: email,
            cargo: cargo
        };
        setEmpleados([...empleados, nuevoEmpleado]);
        setNombre('');
        setApellido('');
        setDni('');
        setEmail('');
        setCargo('');
    }

    return ( 
    
    <>


    <TableContainer component={Paper} sx={{ mt: 3 }}>
      <Table sx={{ minWidth: 650  }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell align="right">Apellido</TableCell>
            <TableCell align="right">DNI</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Cargo</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

    

          {empleados.map((empleado) => (
            <TableRow
              key={empleado.dni }
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {empleado.nombre}
              </TableCell>
              <TableCell align="right">{empleado.apellido}</TableCell>
              <TableCell align="right">{empleado.dni}</TableCell>
              <TableCell align="right">{empleado.email}</TableCell>
              <TableCell align="right">{empleado.cargo}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>


    <Paper sx={{ padding: 3, marginTop: 7, width: 450 }}>
    <h3>Agregar Nuevo Empleado</h3>
    <Stack spacing={2}>
    <TextField label="nombre" variant="outlined" value={nombre} onChange={(e) => setNombre(e.target.value)} />
    <TextField label="apellido" variant="outlined" value={apellido} onChange={(e) => setApellido(e.target.value)} />
    <TextField label="dni" variant="outlined" value={dni} onChange={(e) => setDni(e.target.value)} />
    <TextField label="email" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} />
    <TextField label="cargo" variant="outlined" value={cargo} onChange={(e) => setCargo(e.target.value)} />

    <button type="button" onClick={agregarEmpleado}>
        Agregar
    </button>
    </Stack>
    </Paper>

      
    </>
  );
}

     





