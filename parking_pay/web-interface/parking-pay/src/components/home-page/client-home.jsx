import React, { useState } from "react";
import { useAuth } from "../../contexts/auth_context.jsx";
import Navbar from "../Navbar.jsx"; // Ajusta la ruta si es necesario
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

export const ClientHome = () => {
  const { user } = useAuth();

  // Estados para los modales
  const [openAbonar, setOpenAbonar] = useState(false);
  const [openPagarTicket, setOpenPagarTicket] = useState(false);
  const [openGenerarTicket, setOpenGenerarTicket] = useState(false);

  // Estados para inputs
  const [abono, setAbono] = useState("");
  const [facturaPago, setFacturaPago] = useState("");
  const [facturaGenerar, setFacturaGenerar] = useState("");

  // Datos de ejemplo para los tickets
  const tickets = [
    { id: 1, descripcion: "Ticket 001 - $50" },
    { id: 2, descripcion: "Ticket 002 - $100" },
  ];

  // Handlers para abrir/cerrar modales
  const handleCloseAbonar = () => setOpenAbonar(false);
  const handleClosePagarTicket = () => setOpenPagarTicket(false);
  const handleCloseGenerarTicket = () => setOpenGenerarTicket(false);

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
          <Typography variant="body1">Nombre: {user.Name}</Typography>

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
              onClick={() => setOpenAbonar(true)}
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
              onClick={() => setOpenPagarTicket(true)}
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
              onClick={() => setOpenGenerarTicket(true)}
            >
              Generar Ticket
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Modal Abonar */}
      <Dialog open={openAbonar} onClose={handleCloseAbonar}>
        <DialogTitle>Abonar a tu saldo</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Monto a abonar"
            type="number"
            fullWidth
            variant="outlined"
            value={abono}
            onChange={(e) => setAbono(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAbonar}>Cancelar</Button>
          <Button
            onClick={() => {
              console.log(`Abonaste: ${abono}`);
              setAbono(""); // Resetea el input
              handleCloseAbonar();
            }}
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal Pagar Ticket */}
      <Dialog open={openPagarTicket} onClose={handleClosePagarTicket}>
        <DialogTitle>Pagar Ticket</DialogTitle>
        <DialogContent>
          <List>
            {tickets.map((ticket) => (
              <ListItem key={ticket.id}>
                <ListItemText primary={ticket.descripcion} />
              </ListItem>
            ))}
          </List>
          <TextField
            autoFocus
            margin="dense"
            label="Factura"
            type="text"
            fullWidth
            variant="outlined"
            value={facturaPago}
            onChange={(e) => setFacturaPago(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePagarTicket}>Cancelar</Button>
          <Button
            onClick={() => {
              console.log(`Pagaste con factura: ${facturaPago}`);
              setFacturaPago(""); // Resetea el input
              handleClosePagarTicket();
            }}
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal Generar Ticket */}
      <Dialog open={openGenerarTicket} onClose={handleCloseGenerarTicket}>
        <DialogTitle>Generar Ticket</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Factura"
            type="text"
            fullWidth
            variant="outlined"
            value={facturaGenerar}
            onChange={(e) => setFacturaGenerar(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseGenerarTicket}>Cancelar</Button>
          <Button
            onClick={() => {
              console.log(`Generaste ticket con factura: ${facturaGenerar}`);
              setFacturaGenerar(""); // Resetea el input
              handleCloseGenerarTicket();
            }}
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>

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
