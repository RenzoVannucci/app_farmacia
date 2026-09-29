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

export default function TablaMedicamentos() {
  // estado principal , este y el de abajo creo qeu cambia por la conexion a la tabla de la BD?
  const [medicamentos, setMedicamentos] = useState([
  {nombre: 'Paracetamol', precio: 850, stock: 40, categoria: 'Analgésicos', fecha: '2027-05-10'},
  {nombre: 'Ibuprofeno', precio: 920, stock: 25, categoria: 'Antiinflamatorios', fecha: '2027-08-20'},
  {nombre: 'Amoxicilina', precio: 1500, stock: 15, categoria: 'Antibióticos', fecha: '2026-12-15'}
]);
   
    // estados del formulario
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState('');
    const [stock, setStock] = useState('');
    const [categoria, setCategoria] = useState('');
    const [fecha, setFecha] = useState('');

    const [formularioAbierto, setFormularioAbierto] = useState(false);

    const [medicamentoEditando, setMedicamentoEditando] = useState(null);

    const [snackbarAbierto, setSnackbarAbierto] = useState(false);
    const [mensajeSnackbar, setMensajeSnackbar] = useState('');

    function validarMedicamento() {
      if (nombre === '') {
        setMensajeSnackbar('El nombre es obligatorio');
        setSnackbarAbierto(true);
        return false;
      }
      if (Number(precio) <= 0) {
        setMensajeSnackbar('El precio debe ser mayor a 0');
        setSnackbarAbierto(true);
        return false;
      } 
      if (Number(stock) < 0) {
        setMensajeSnackbar('El stock no puede ser menor que 0');
        setSnackbarAbierto(true);
        return false;
      }
      if (categoria === '') {
        setMensajeSnackbar('La cateogira es obligatoria');
        setSnackbarAbierto(true);
        return false;
      }
      if (fecha === '') {
        setMensajeSnackbar('La fecha es obligatoria');
        setSnackbarAbierto(true);
        return false;
      }
      return true;
    }


    function agregarMedicamento() {
      if (!validarMedicamento()) {
        return;
      }
        const nuevoMedicamento = {
            nombre: nombre,
            precio: precio,
            stock: stock,
            categoria: categoria,
            fecha: fecha
        };
      
       
        setMedicamentos([...medicamentos, nuevoMedicamento]);
        setNombre('');
        setPrecio('');
        setStock('');
        setCategoria('');
        setFecha('');
        setFormularioAbierto(false);
        setMedicamentoEditando(null);
      };
    

    function eliminarMedicamento (Medicamento) {
      setMedicamentos (medicamentos.filter((medicamento) => medicamento.nombre !== Medicamento));
    }
    
    function editarMedicamento (Medicamento) {

      setFormularioAbierto(true);
      
      setMedicamentoEditando(Medicamento.nombre);

      setNombre (Medicamento.nombre)
      setPrecio (Medicamento.precio)
      setStock (Medicamento.stock)
      setCategoria (Medicamento.categoria)
      setFecha (Medicamento.fecha) 
    }

    function actualizarMedicamento() {
      if (!validarMedicamento()) {
        return;
      }
      const medicamentosActualizados = medicamentos.map((medicamento) => {
      if (medicamento.nombre === medicamentoEditando) {
        return {
          nombre: nombre,
          precio:precio,
          stock:stock,
          categoria:categoria, 
          fecha:fecha  };
       } else {
          return medicamento; 
        }
      });
  
      setMedicamentos(medicamentosActualizados);
      setNombre('');
      setPrecio('');
      setStock('');
      setCategoria('');
      setFecha('');
      setFormularioAbierto(false);
      setMedicamentoEditando(null);
    }
        
    function guardarMedicamento() {
      if (medicamentoEditando === null) {
      agregarMedicamento();
      } else {
      actualizarMedicamento();
      }
    }

    return ( 
    
    <>

    <button onClick = {() => setFormularioAbierto(true)} > Agregar Medicamento </button>

    <TableContainer component={Paper} sx={{ mt: 3 }}>
      <Table sx={{ minWidth: 650  }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell align="right">Precio</TableCell>
            <TableCell align="right">Stock</TableCell>
            <TableCell align="right">Categoria</TableCell>
            <TableCell align="right">Fecha</TableCell>
            <TableCell align="right">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

    
          
          {medicamentos.map((medicamento) => (
            <TableRow
              key={medicamento.nombre }
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{medicamento.nombre}</TableCell>
              <TableCell align="right">{medicamento.precio}</TableCell>
              <TableCell align="right">{medicamento.stock}</TableCell>
              <TableCell align="right">{medicamento.categoria}</TableCell>
              <TableCell align="right">{medicamento.fecha}</TableCell>
              <TableCell align="right"> <button onClick={() => eliminarMedicamento(medicamento.nombre)}>Eliminar</button> </TableCell>
              <TableCell align="right"> <button onClick={() => editarMedicamento(medicamento)}>Editar</button> </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>


    {formularioAbierto && (
    <Paper sx={{ padding: 3, marginTop: 7, width: 450 }}>
    <h3>Agregar Nuevo Medicamento</h3>
    <Stack spacing={2}>
    <TextField label="nombre" variant="outlined" value={nombre} onChange={(e) => setNombre(e.target.value)} />
    <TextField label="precio" variant="outlined" value={precio} onChange={(e) => setPrecio(e.target.value)} />
    <TextField label="stock" variant="outlined" value={stock} onChange={(e) => setStock(e.target.value)} />
    <TextField label="categoria" variant="outlined" value={categoria} onChange={(e) => setCategoria(e.target.value)} />
    <TextField label="fecha" type="date" variant="outlined" value={fecha} onChange={(e) => setFecha(e.target.value)} InputLabelProps={{ shrink: true }} />

    <button type="button" onClick={guardarMedicamento}>
        Guardar
    </button>
    </Stack>
    </Paper>
    )}

    <AvisoSnackbar 
        abierto={snackbarAbierto} 
        mensaje={mensajeSnackbar} 
        onCerrar={() => setSnackbarAbierto(false)} 
      />

    </>
  );
}