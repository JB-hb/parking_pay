import React, { useState } from "react";
import { useAuth } from "../../contexts/auth_context.jsx";
import Navbar from "../Navbar.jsx"; // Ajusta la ruta si es necesario
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  Modal,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";

export const AdminHome = () => {
  const { user } = useAuth();

  const [openModal, setOpenModal] = useState(null);

  const handleOpen = (modalName) => setOpenModal(modalName);
  const handleClose = () => setOpenModal(null);

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
        {/* Información del Administrador */}
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
            Administrador:{" "}
            <span style={{ color: "#1976D2", fontWeight: "bold" }}>
              {user.Name}
            </span>
          </Typography>
          <Typography variant="body1">
            Nombre de Administrador: {user.Name}
          </Typography>
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
              onClick={() => handleOpen("crearUsuario")}
            >
              Crear Usuario
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
                fontSize: "13px",
              }}
              onClick={() => handleOpen("cambiarEstadoTicket")}
            >
              Cambiar Estado de Ticket
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
              onClick={() => handleOpen("confirmarPago")}
            >
              Confirmar Pago
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Modales */}
      <Modal open={openModal === "crearUsuario"} onClose={handleClose}>
        <Box
          sx={{
            bgcolor: "white",
            color: "black",
            p: 4,
            borderRadius: 4,
            maxWidth: 400,
            mx: "auto",
            mt: "10%",
            textAlign: "center",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Crear Usuario
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Complete el formulario para registrar un nuevo usuario.
          </Typography>
          <TextField
            fullWidth
            label="Nombre de Usuario"
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Nombre"
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Tipo de Usuario</InputLabel>
            <Select>
              <MenuItem value="cliente">Cliente</MenuItem>
              <MenuItem value="empresa">Empresa</MenuItem>
              <MenuItem value="administrador">Administrador</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Contraseña"
            type="password"
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <Button variant="contained" onClick={handleClose}>
            Guardar
          </Button>
        </Box>
      </Modal>

      <Modal open={openModal === "cambiarEstadoTicket"} onClose={handleClose}>
        <Box
          sx={{
            bgcolor: "white",
            color: "black",
            p: 4,
            borderRadius: 4,
            maxWidth: 500,
            mx: "auto",
            mt: "10%",
            textAlign: "center",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Cambiar Estado de Ticket
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Busque un ticket por ID o descripción y actualice su estado.
          </Typography>
          <TextField
            fullWidth
            label="Buscar Ticket"
            variant="outlined"
            sx={{ mb: 2 }}
          />
          {/* Aquí podrías añadir una lista dinámica de tickets */}
          <Button variant="contained" onClick={handleClose}>
            Actualizar Estado
          </Button>
        </Box>
      </Modal>

      <Modal open={openModal === "confirmarPago"} onClose={handleClose}>
        <Box
          sx={{
            bgcolor: "white",
            color: "black",
            p: 4,
            borderRadius: 4,
            maxWidth: 400,
            mx: "auto",
            mt: "10%",
            textAlign: "center",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Confirmar Pago
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Ingrese el número de factura para confirmar el pago.
          </Typography>
          <TextField
            fullWidth
            label="Número de Factura"
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <Button variant="contained" onClick={handleClose}>
            Confirmar
          </Button>
        </Box>
      </Modal>

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
