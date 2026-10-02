
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { lightGreen } from '@mui/material/colors';

import { useEffect, useState } from 'react';

import AvisoSnackbar from './avisoSnackbar.jsx'; 



export default function TablaMedicamentos() {
  const [medicamentos, setMedicamentos] = useState([]);
  const [categorias, setCategorias] = useState([]);

  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');
  const [categoriaId, setCategoriaId] = useState('');
  const [fecha, setFecha] = useState('');

  const [formularioAbierto, setFormularioAbierto] = useState(false);
  const [medicamentoEditando, setMedicamentoEditando] = useState(null);

  const [snackbarAbierto, setSnackbarAbierto] = useState(false);
  const [mensajeSnackbar, setMensajeSnackbar] = useState('');

  const [textoBusqueda, setTextoBusqueda] = useState('');

  useEffect(() => {
    fetch('http://127.0.0.1:8000/medicamentos/')
      .then((respuesta) => respuesta.json())
      .then((datos) => setMedicamentos(datos));

    fetch('http://127.0.0.1:8000/categorias/')
      .then((respuesta) => respuesta.json())
      .then((datos) => setCategorias(datos));
  }, []);

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

    if (categoriaId === '') {
      setMensajeSnackbar('La categoría es obligatoria');
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

  function limpiarFormulario() {
    setNombre('');
    setPrecio('');
    setStock('');
    setCategoriaId('');
    setFecha('');
    setFormularioAbierto(false);
    setMedicamentoEditando(null);
  }

  async function agregarMedicamento() {
    if (!validarMedicamento()) {
      return;
    }

    const nuevoMedicamento = {
      nombre: nombre,
      precio: Number(precio),
      stock: Number(stock),
      categoria_id: Number(categoriaId),
      fecha: fecha
    };

    const respuesta = await fetch('http://127.0.0.1:8000/medicamentos/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(nuevoMedicamento)
    });

    const datos = await respuesta.json();

    if (!respuesta.ok) {
      setMensajeSnackbar(datos.detail || 'Error al crear medicamento');
      setSnackbarAbierto(true);
      return;
    }

    setMedicamentos([...medicamentos, datos.medicamento]);
    limpiarFormulario();

    setMensajeSnackbar('Se agregó el medicamento ✅');
    setSnackbarAbierto(true);
  }

  async function eliminarMedicamento(medicamentoId) {
    const respuesta = await fetch(
      `http://127.0.0.1:8000/medicamentos/${medicamentoId}`,
      {
        method: 'DELETE'
      }
    );

    const datos = await respuesta.json();

    if (!respuesta.ok) {
      setMensajeSnackbar(datos.detail || 'Error al eliminar medicamento');
      setSnackbarAbierto(true);
      return;
    }

    setMedicamentos(
      medicamentos.filter((medicamento) => medicamento.id !== medicamentoId)
    );

    setMensajeSnackbar('Se eliminó el medicamento ✅');
    setSnackbarAbierto(true);
  }

  function editarMedicamento(medicamento) {
    setFormularioAbierto(true);

    setMedicamentoEditando(medicamento.id);
    setNombre(medicamento.nombre);
    setPrecio(medicamento.precio);
    setStock(medicamento.stock);
    setCategoriaId(medicamento.categoria_id);
    setFecha(medicamento.fecha);
  }

  async function actualizarMedicamento() {
    if (!validarMedicamento()) {
      return;
    }

    const medicamentoActualizado = {
      nombre: nombre,
      precio: Number(precio),
      stock: Number(stock),
      categoria_id: Number(categoriaId),
      fecha: fecha
    };

    const respuesta = await fetch(
      `http://127.0.0.1:8000/medicamentos/${medicamentoEditando}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(medicamentoActualizado)
      }
    );

    const datos = await respuesta.json();

    if (!respuesta.ok) {
      setMensajeSnackbar(datos.detail || 'Error al actualizar medicamento');
      setSnackbarAbierto(true);
      return;
    }

    setMedicamentos(
      medicamentos.map((medicamento) =>
        medicamento.id === medicamentoEditando
          ? datos.medicamento
          : medicamento
      )
    );

    limpiarFormulario();

    setMensajeSnackbar('Se actualizó el medicamento ✅');
    setSnackbarAbierto(true);
  }

  function guardarMedicamento() {
    if (medicamentoEditando === null) {
      agregarMedicamento();
    } else {
      actualizarMedicamento();
    }
  }

  function buscarMedicamentos() {
  if (textoBusqueda === '') {
    fetch('http://127.0.0.1:8000/medicamentos/')
      .then(respuesta => respuesta.json())
      .then(datos => setMedicamentos(datos));
    return;
  }
  fetch(`http://127.0.0.1:8000/medicamentos/buscar/nombre?nombre=${textoBusqueda}`)
    .then(respuesta => respuesta.json())
    .then(datos => setMedicamentos(datos));
}

  return (
    <>
      <Button variant="outlined" color="secondary" onClick={() => setFormularioAbierto(true)}>
        Agregar Medicamento
      </Button>


      <Stack direction="row" spacing={2} sx={{ marginBottom: 2 }}>
  <TextField 
    label="Buscar por nombre" 
    variant="outlined" 
    size="small"
    value={textoBusqueda} 
    onChange={(e) => setTextoBusqueda(e.target.value)} 
  />
  <Button variant="contained" onClick={buscarMedicamentos}>Buscar</Button>
</Stack>


      <TableContainer component={Paper} sx={{ mt: 3, backgroundColor: lightGreen[50] }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ backgroundColor: lightGreen[800] }}>
              <TableCell>Nombre</TableCell>
              <TableCell align="right">Precio</TableCell>
              <TableCell align="right">Stock</TableCell>
              <TableCell align="right">Categoría</TableCell>
              <TableCell align="right">Fecha</TableCell>
              <TableCell align="right">Acciones</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {medicamentos.map((medicamento) => (
              <TableRow
                key={medicamento.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">{medicamento.nombre}</TableCell>
                <TableCell align="right">{medicamento.precio}</TableCell>
                <TableCell align="right">{medicamento.stock}</TableCell>
                <TableCell align="right">
                  {categorias.find((categoria) => categoria.id === medicamento.categoria_id)?.nombre || medicamento.categoria_id}
                </TableCell>
                <TableCell align="right">{medicamento.fecha}</TableCell>

                <TableCell align="right">
                  <Button variant="outlined" color="error" size="small" onClick={() => eliminarMedicamento(medicamento.id)}>Eliminar</Button>
                </TableCell>

                <TableCell align="right">
                  <Button variant="outlined" color="success" size="small" onClick={() => editarMedicamento(medicamento)}>Editar</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {formularioAbierto && (
        <Paper sx={{ padding: 3, marginTop: 7, width: 450 }}>
          <h3>{medicamentoEditando === null ? 'Agregar Nuevo Medicamento' : 'Editar Medicamento'}</h3>

          <Stack spacing={2}>
            <TextField label="nombre" variant="outlined" value={nombre} onChange={(e) => setNombre(e.target.value)} />

            <TextField label="precio" variant="outlined" value={precio} onChange={(e) => setPrecio(e.target.value)} />

            <TextField label="stock" variant="outlined" value={stock} onChange={(e) => setStock(e.target.value)} />

            <TextField
              select
              label="categoría"
              value={categoriaId}
              onChange={(e) => setCategoriaId(e.target.value)}
            >
              {categorias.map((categoria) => (
                <MenuItem key={categoria.id} value={categoria.id}>
                  {categoria.nombre}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="fecha"
              type="date"
              variant="outlined"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />

            <Button variant="outlined" color="secondary" type="button" onClick={guardarMedicamento}>
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

