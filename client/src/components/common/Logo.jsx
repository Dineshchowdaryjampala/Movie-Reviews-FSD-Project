import { Typography, useTheme, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Logo = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => navigate("/")}>
      <img src="/rename1.png" alt="Logo" style={{ width: 40, height: 40, marginRight: 10 }} />
      <Typography variant="h6" fontWeight="700">
        <span>Movie</span>
        <span style={{ color: theme.palette.primary.main }}> Review System</span>
      </Typography>
    </Box>
  );
};

export default Logo;
