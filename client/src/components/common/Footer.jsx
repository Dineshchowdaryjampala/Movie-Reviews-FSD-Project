import { Paper, Stack, Button, Box, Typography } from '@mui/material';
import React from 'react';
import Container from './Container';
import Logo from './Logo';
import menuConfigs from "../../configs/menu.configs";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Container>
      <Paper square={true} sx={{ backgroundImage: "unset", padding: "2rem" }}>
        <Stack
          alignItems="center"
          justifyContent="space-between"
          direction={{ xs: "column", md: "row " }}
          sx={{ height: "max-content" }}
        >
          <Logo />
          <Box>
            {menuConfigs.main.map((item, index) => (
              <Button
                key={index}
                sx={{ color: "inherit" }}
                component={Link}
                to={item.path}
              >
                {item.display}
              </Button>
            ))}
          </Box>
        </Stack>
        <Typography
          variant="body2"
          color="textSecondary"
          align="center"
          sx={{ marginTop: "1rem" }}
        >
          Handcrafted with 💖 by - NSL Karthikeya Reddy, J Dinesh Chowdary, AK Charith Kumar Reddy, and B Satish.
        </Typography>
      </Paper>
    </Container>
  );
};

export default Footer;
