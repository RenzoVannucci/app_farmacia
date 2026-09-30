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

import Button from '@mui/material/Button';
import { lightGreen } from '@mui/material/colors';


export default function TablaCategorias() {
  // estado principal , este y el de abajo creo qeu cambia por la conexion a la tabla de la BD?
  const [categorias, setCategorias] = useState([
  {nombre: 'Analgésicos'},
  {nombre: 'Antiinflamatorios'},
  {nombre: 'Antibióticos'}
]);
  
   
    // estados del formulario
    const [nombre, setNombre] = useState('');
   
    const [formularioAbierto, setFormularioAbierto] = useState(false);

    const [categoriaEditando, setCategoriaEditando] = useState(null);

    const [snackbarAbierto, setSnackbarAbierto] = useState(false);
    const [mensajeSnackbar, setMensajeSnackbar] = useState('');

    function validarCategoria() {
      if (nombre === '') {
        setMensajeSnackbar('El nombre es obligatorio');
        setSnackbarAbierto(true);
        return false;
      }
  
      const yaExiste = categorias.filter((categoria) => categoria.nombre.toLowerCase() === nombre.toLowerCase());

      if (yaExiste.length > 0) {
        setMensajeSnackbar('Esa categoria ya existe');
        setSnackbarAbierto(true);
        
        return false;
      }

      return true;
    }


    function agregarCategoria() {
      if (!validarCategoria()) {
        return;
      }
        const nuevaCategoria = {
            nombre: nombre
        };
      
       
        setCategorias([...categorias, nuevaCategoria]);
        setNombre('');
        setFormularioAbierto(false);
        setCategoriaEditando(null);

        setMensajeSnackbar("Se agrego la categoria ✅"); 
        setSnackbarAbierto(true);
      };
    

    function eliminarCategoria (Categoria) {
      setCategorias (categorias.filter((categoria) => categoria.nombre !== Categoria));
    }
    
    function editarCategoria (Categoria) {

      setFormularioAbierto(true);
      
      setCategoriaEditando(Categoria.nombre);

      setNombre (Categoria.nombre)
    }

    function actualizarCategoria() {
      if (!validarCategoria()) {
        return;
      }
      const categoriasActualizados = categorias.map((categoria) => {
      if (categoria.nombre === categoriaEditando) {
        return {
          nombre: nombre,
          };
       } else {
          return categoria; 
        }
      
      });
  
      setCategorias(categoriasActualizados);
      setNombre('');
      setFormularioAbierto(false);
      setCategoriaEditando(null);

      setMensajeSnackbar("Se actualizo la categoria ✅"); 
        setSnackbarAbierto(true);
    }
        
    function guardarCategoria() {
      if (categoriaEditando === null) {
      agregarCategoria();
      } else {
      actualizarCategoria();
      }
    }

    return ( 
    
    <>

    <Button variant="outlined" color="secondary" onClick = {() => setFormularioAbierto(true)} > Agregar Categoria </Button>

    <TableContainer component={Paper} sx={{ mt: 3, backgroundColor: lightGreen[50] }}>
      <Table sx={{ minWidth: 650  }} aria-label="simple table">
        <TableHead>
          <TableRow sx={{backgroundColor: lightGreen[800]}} >
            <TableCell>Nombre</TableCell>
            <TableCell align="right">Acciones</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

    
          
          {categorias.map((categoria) => (
            <TableRow
              key={categoria.nombre }
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{categoria.nombre}</TableCell>
              <TableCell align="right"> <Button variant="outlined" color="error" size="small" onClick={() => eliminarCategoria(categoria.nombre)}>Eliminar</Button> </TableCell>
              <TableCell align="right"> <Button variant="outlined" color="success" size="small" onClick={() => editarCategoria(categoria)}>Editar</Button> </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>


    {formularioAbierto && (
    <Paper sx={{ padding: 3, marginTop: 7, width: 450 }}>
    <h3>Agregar Nueva categoria</h3>
    <Stack spacing={2}>
    <TextField label="nombre" variant="outlined" value={nombre} onChange={(e) => setNombre(e.target.value)} />
    


    <Button variant="outlined" color="secondary" type="button" onClick={guardarCategoria}>
        Guardar
    </Button>
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