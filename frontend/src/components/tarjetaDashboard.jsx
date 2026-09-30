import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
 

export default function TarjetaDashboard(props) {
  return (
    <Card sx={{ backgroundColor: '#1d6fbf', width: 300, margin: '0 auto' }}>
      <CardContent>
        {props.icono}
        <h2> {props.titulo} </h2>
        <h3> {props.valor} </h3>
      </CardContent>
    </Card>
  )
}


