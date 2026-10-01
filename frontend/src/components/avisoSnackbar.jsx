
import Snackbar from '@mui/material/Snackbar';



export default function AvisoSnackbar(props) {

  return (
    <div>
      
      <Snackbar
        open={props.abierto}
        autoHideDuration={6000}
        onClose={props.onCerrar}
        message={props.mensaje}
        
      />
    </div>
  );
}
