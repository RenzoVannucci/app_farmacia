import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
 
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function TarjetaDashboard(props) {
  return (
    <Card
      elevation={0}
      sx={{
        width: '100%',
        maxWidth: 340,
        minHeight: 175,
        margin: '0 auto',
        color: '#ffffff',
        borderRadius: '20px',
        overflow: 'hidden',
        position: 'relative',
        background:
          'linear-gradient(135deg, #1769aa 0%, #124e83 100%)',
        border: '1px solid rgba(255,255,255,0.12)',
        boxShadow: '0 8px 24px rgba(18, 78, 131, 0.18)',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease',

        '&:hover': {
          transform: 'translateY(-6px)',
          boxShadow: '0 16px 32px rgba(18, 78, 131, 0.28)',
        },

        '&::before': {
          content: '""',
          position: 'absolute',
          width: 140,
          height: 140,
          borderRadius: '50%',
          backgroundColor: 'rgba(255,255,255,0.07)',
          top: -55,
          right: -35,
        },
      }}
    >
      <CardContent
        sx={{
          position: 'relative',
          zIndex: 1,
          p: 3,
          '&:last-child': { pb: 3 },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3,
          }}
        >
          <Typography
            sx={{
              fontSize: 14,
              fontWeight: 500,
              color: 'rgba(255,255,255,0.85)',
              letterSpacing: '0.3px',
            }}
          >
            {props.titulo}
          </Typography>

          <Box
            sx={{
              width: 46,
              height: 46,
              borderRadius: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(255,255,255,0.16)',
              color: '#ffffff',

              '& svg': {
                fontSize: 27,
              },
            }}
          >
            {props.icono}
          </Box>
        </Box>

        <Typography
          sx={{
            fontSize: { xs: 34, sm: 40 },
            lineHeight: 1.1,
            fontWeight: 700,
            color: '#ffffff',
            letterSpacing: '-1px',
          }}
        >
          {props.valor}
        </Typography>

        <Box
          sx={{
            width: 38,
            height: 4,
            borderRadius: 10,
            backgroundColor: '#8ed8ff',
            mt: 2,
          }}
        />
      </CardContent>
    </Card>
  );
}


