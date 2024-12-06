import React from "react";
import { useAuth } from "../../contexts/auth_context.jsx";
import Navbar from "../Navbar.jsx"; // Asegúrate de ajustar la ruta si es necesario
import { Box, Typography, Button, Grid, Paper } from "@mui/material";

export const ClientHome = () => {
  const { user } = useAuth();

  console.log(user);
  return (
    <Box
      sx={{
        height: "100vh", // Pantalla completa
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        bgcolor: "white", // Fondo blanco
        overflow: "hidden",
        color: "white",
      }}
    >
      {/* Navbar */}
      <Navbar />

      {/* Contenedor Principal */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          px: 2,
          textAlign: "center",
          width: "100%",
        }}
      >
        {/* Información del Cliente */}
        <Paper
          elevation={4}
          sx={{
            width: "80%",
            maxWidth: "600px",
            p: 4,
            borderRadius: 4,
            textAlign: "center",
            bgcolor: "white",
            color: "#01015C",
          }}
        >
          <Typography variant="h5" gutterBottom>
            Saldo Disponible:{" "}
            <span style={{ color: "#1976D2", fontWeight: "bold" }}>
              ${user.Saldo}
            </span>
          </Typography>
          <Typography variant="body1">Descuento: {user.Discount}%</Typography>
        </Paper>

        {/* Botones */}
        <Grid
          container
          spacing={3}
          sx={{ mt: 4, width: "80%", maxWidth: "600px" }}
        >
          <Grid item xs={12} sm={4}>
            <Button
              fullWidth
              variant="contained"
              size="large"
              sx={{
                bgcolor: "#1976D2",
                "&:hover": { bgcolor: "#115293" },
                height: "56px",
              }}
              onClick={() => console.log("Abonar")}
            >
              Abonar
            </Button>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button
              fullWidth
              variant="contained"
              size="large"
              sx={{
                bgcolor: "#1976D2",
                "&:hover": { bgcolor: "#115293" },
                height: "56px",
              }}
              onClick={() => console.log("Pagar Ticket")}
            >
              Pagar Ticket
            </Button>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button
              fullWidth
              variant="outlined"
              size="large"
              sx={{
                color: "#fff",
                bgcolor: "#1976D2",
                "&:hover": { bgcolor: "#115293" },
                height: "56px",
              }}
              onClick={() => console.log("Generar Ticket")}
            >
              Generar Ticket
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          textAlign: "center",
          py: 2,
          width: "100%",
          bgcolor: "rgba(255, 255, 255, 0.2)",
          color: "white",
          fontSize: "0.875rem",
        }}
      >
        © {new Date().getFullYear()} Mi Empresa. Todos los derechos reservados.
      </Box>
    </Box>
  );
};
