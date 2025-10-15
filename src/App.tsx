import './App.css'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Header from '../shared/components/Header';
import Footer from '../shared/components/Footer';

function App() {
  const theme = useTheme();
  console.log(theme)

  return (
    <>
      <Header />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '70vh',
          backgroundColor: (theme) => theme.palette.background.paper,
          marginBottom: '80px'
        }}
      >
       
          <Stack
            direction="column"
            spacing={1}
            sx={{ alignItems: "center", }}
          >
            <Button variant="text">Text</Button>
            <Button variant="contained">Contained</Button>
            <Button variant="outlined">Outlined</Button>
            <Button color="secondary">Secondary</Button>
            <Button variant="contained" color="success">
              Success
            </Button>
            <Button variant="outlined" color="error">
              Error
            </Button>
            <Button variant="outlined" startIcon={<DeleteIcon />}>
              Delete
            </Button>
            <Button variant="contained" endIcon={<SendIcon />}>
              Send
            </Button>
          </Stack>
      </Box>
      <Footer />
    </>
  )
}

export default App
