import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
 
import { deepPurple } from '@mui/material/colors';

export default function TarjetaDashboard(props) {
  return (
    <Card sx={{ backgroundColor: deepPurple[400]}}>
      <CardContent>
        <h2> {props.titulo} </h2>
        <h3> {props.valor} </h3>
      </CardContent>
    </Card>
  )
}


