import React, { useState } from "react";
import { useAuth } from "../../contexts/auth_context.jsx";
import Navbar from "../Navbar.jsx"; // Ajustar la ruta si es necesario
import { Box, Typography, Button, Grid, Paper, TextField, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemText } from "@mui/material";

export const EmpresaHome = () => {
  const { user } = useAuth();

  const [sucursales, setSucursales] = useState([
    { id: 1, nombre: "Sucursal Centro", ubicacion: "Ciudad Central", tarifa: "$500", tipo: "Premium" },
    { id: 2, nombre: "Sucursal Norte", ubicacion: "Zona Norte", tarifa: "$300", tipo: "Económica" },
  ]);
  const [showSucursales, setShowSucursales] = useState(false);
  const [showCrearSucursal, setShowCrearSucursal] = useState(false);
  const [formValues, setFormValues] = useState({
    nombre: "",
    ubicacion: "",
    tarifa: "",
    tipo: "",
    empresa: user?.Name || "",
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleAgregarSucursal = () => {
    const nuevaSucursal = {
      id: sucursales.length + 1,
      ...formValues,
    };
    setSucursales([...sucursales, nuevaSucursal]);
    setShowCrearSucursal(false);
    setFormValues({ nombre: "", ubicacion: "", tarifa: "", tipo: "", empresa: user?.Name || "" });
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        bgcolor: "white",
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
        {/* Información de la Empresa */}
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
            Empresa:{" "}
            <span style={{ color: "#1976D2", fontWeight: "bold" }}>
              {user.Name}
            </span>
          </Typography>
          <Typography variant="body1">ID de Empresa: {user.id}</Typography>
        </Paper>

        {/* Botones */}
        <Grid
          container
          spacing={3}
          sx={{ mt: 4, width: "80%", maxWidth: "600px" }}
        >
          <Grid item xs={12} sm={6}>
            <Button
              fullWidth
              variant="contained"
              size="large"
              sx={{
                bgcolor: "#1976D2",
                "&:hover": { bgcolor: "#115293" },
                height: "56px",
              }}
              onClick={() => setShowSucursales(true)}
            >
              Ver Lista de Sucursales
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              fullWidth
              variant="contained"
              size="large"
              sx={{
                bgcolor: "#1976D2",
                "&:hover": { bgcolor: "#115293" },
                height: "56px",
              }}
              onClick={() => setShowCrearSucursal(true)}
            >
              Crear Nueva Sucursal
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

      {/* Dialogo: Lista de Sucursales */}
      <Dialog open={showSucursales} onClose={() => setShowSucursales(false)}>
        <DialogTitle>Lista de Sucursales</DialogTitle>
        <DialogContent>
          <List>
            {sucursales.map((sucursal) => (
              <ListItem key={sucursal.id}>
                <ListItemText
                  primary={sucursal.nombre}
                  secondary={`Ubicación: ${sucursal.ubicacion} | Tarifa: ${sucursal.tarifa} | Tipo: ${sucursal.tipo}`}
                />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowSucursales(false)} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialogo: Crear Nueva Sucursal */}
      <Dialog open={showCrearSucursal} onClose={() => setShowCrearSucursal(false)}>
        <DialogTitle>Crear Nueva Sucursal</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            label="Nombre de la Sucursal"
            name="nombre"
            value={formValues.nombre}
            onChange={handleFormChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Ubicación"
            name="ubicacion"
            value={formValues.ubicacion}
            onChange={handleFormChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Tarifa"
            name="tarifa"
            value={formValues.tarifa}
            onChange={handleFormChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Tipo"
            name="tipo"
            value={formValues.tipo}
            onChange={handleFormChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Empresa"
            name="empresa"
            value={formValues.empresa}
            disabled
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowCrearSucursal(false)} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleAgregarSucursal} color="primary">
            Crear
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
