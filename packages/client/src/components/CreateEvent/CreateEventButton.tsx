import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import CloseIcon from "@mui/icons-material/Close";
import { useStore } from "../../state";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  outline: "none",
};

export const CreateEventButton = () => {
  const {
    modal,
    drawMode,
    closeCreateEventModal,
    initiateCreateEvent,
    savePoint,
    currentFeature,
  } = useStore();

  const open = modal === "create-event";
  const buttonText = drawMode == "point" ? "Add a point" : "Create Event";
  const [lat, ln] = currentFeature?.geometry.coordinates || [];

  return (
    <>
      <Button variant="contained" onClick={initiateCreateEvent} disabled={open}>
        {buttonText}
      </Button>
      <Modal
        open={open}
        onClose={closeCreateEventModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Create Event
            </Typography>
            <IconButton onClick={closeCreateEventModal} size="small">
              <CloseIcon />
            </IconButton>
          </Stack>
          <Box my={1}>
            <Typography>Lat: {lat}</Typography>
            <Typography>Lng: {ln}</Typography>
          </Box>
          <Stack spacing={3}>
            <TextField
              label="Event Name"
              variant="outlined"
              fullWidth
              placeholder="Enter event name"
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={savePoint}
            >
              Create
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
};
