import React, { useState } from "react";
import { useAuth } from "../contexts/auth_context.jsx";
import { useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button, Paper } from "@mui/material";

export const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState({
    mail: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const submitLogin = async (e) => {
    e.preventDefault();
    const response = await login(data);
    setError(null); // Limpia el error actual
    if (response.statusText) {
      navigate("/parking"); // Redirige al área de parking si el login es exitoso
    } else {
      setError(response.error); // Muestra el error si existe
    }
  };

  const changeData = ({ target: { id, value } }) => {
    setData((curr) => ({
      ...curr,
      [id]: value,
    }));
  };

  return (
    <Box
      sx={{
        height: "100vh", // Pantalla completa
        width: "100vw", // Asegura que ocupe todo el ancho de la pantalla
        display: "flex",
        flexDirection: "column",
        justifyContent: "center", // Centrado vertical
        alignItems: "center", // Centrado horizontal
        bgcolor: "#f0f0f0", // Fondo gris claro
        overflow: "hidden",
      }}
    >
      {/* Formulario de Login */}
      <Paper
        elevation={4}
        sx={{
          width: "80%", // Ancho del formulario
          maxWidth: "400px", // Limita el ancho máximo del formulario
          p: 4,
          borderRadius: 4,
          textAlign: "center",
          bgcolor: "white",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: "#01015C", // Color azul para el título
            mb: 2,
          }}
        >
          Iniciar Sesión
        </Typography>

        {error && (
          <Typography
            color="error"
            sx={{
              mb: 2,
            }}
          >
            {error}
          </Typography>
        )}

        <Box component="form" onSubmit={submitLogin} sx={{ width: "100%" }}>
          <TextField
            label="Correo Electrónico"
            id="mail"
            type="email"
            placeholder="example@gmail.com"
            fullWidth
            margin="normal"
            variant="outlined"
            onChange={changeData}
            value={data.mail}
            required
          />
          <TextField
            label="Contraseña"
            id="password"
            type="password"
            placeholder="*****"
            fullWidth
            margin="normal"
            variant="outlined"
            onChange={changeData}
            value={data.password}
            required
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{
              mt: 2,
              height: "56px", // Altura consistente de botón
            }}
          >
            Iniciar sesión
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};
