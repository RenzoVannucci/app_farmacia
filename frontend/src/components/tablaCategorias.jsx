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

    <button onClick = {() => setFormularioAbierto(true)} > Agregar Categoria </button>

    <TableContainer component={Paper} sx={{ mt: 3 }}>
      <Table sx={{ minWidth: 650  }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell align="right">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

    
          
          {categorias.map((categoria) => (
            <TableRow
              key={categoria.nombre }
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{categoria.nombre}</TableCell>
              <TableCell align="right"> <button onClick={() => eliminarCategoria(categoria.nombre)}>Eliminar</button> </TableCell>
              <TableCell align="right"> <button onClick={() => editarCategoria(categoria)}>Editar</button> </TableCell>
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
    


    <button type="button" onClick={guardarCategoria}>
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