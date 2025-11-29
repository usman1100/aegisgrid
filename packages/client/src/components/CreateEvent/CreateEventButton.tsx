import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import CloseIcon from "@mui/icons-material/Close";
import { useStore } from "../../state";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApiClient } from "../../lib/api/client";
import { useFormik } from "formik";
import * as yup from "yup";
import { createEventSchema } from "@aegisgrid/shared/validators";
import type { CreateEvent } from "@aegisgrid/shared/validators";

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

const validationSchema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters long")
    .max(100, "Name must be at most 100 characters long"),
});

export const CreateEventButton = () => {
  const client = useApiClient();
  const queryClient = useQueryClient();

  const { mutateAsync: createEvent, isPending } = useMutation({
    mutationFn: (variables: CreateEvent) =>
      client
        .post("/events", {
          ...variables
        })
        .then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    onSubmit: async (values) => {
      try {
        const variables = createEventSchema.parse({
          name: values.name,
          location: {
            x: currentFeature?.geometry?.coordinates?.[0],
            y: currentFeature?.geometry?.coordinates?.[1],
          }
        });
        await createEvent(variables);
        savePoint();
      } catch (error) {
        console.log(error);
      }
    },
    validationSchema,
  });

  const {
    modal,
    drawMode,
    closeCreateEventModal,
    initiateCreateEvent,
    savePoint,
    currentFeature,
  } = useStore();

  const onClose = () => {
    closeCreateEventModal();
    formik.resetForm();
  };

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
        onClose={onClose}
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
            <IconButton onClick={onClose} size="small">
              <CloseIcon />
            </IconButton>
          </Stack>
          <Box my={1}>
            <Typography>Lat: {lat}</Typography>
            <Typography>Lng: {ln}</Typography>
          </Box>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              label="Event Name"
              variant="outlined"
              fullWidth
              placeholder="Enter event name"
              value={formik.values.name}
              onChange={formik.handleChange}
              disabled={formik.isSubmitting}
              name="name"
              key="name"
              id="name"
              helperText={formik.touched.name && formik.errors.name}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              disabled={isPending}
              sx={{ mt: 2 }}
              type="submit"
            >
              Create
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  );
};
