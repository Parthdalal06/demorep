import {
  Button,
  Dialog,
  DialogActions,
  TextField,
  DialogContent,
  DialogTitle,
  FormControl,
  Radio,
  FormControlLabel,
  RadioGroup,
  FormLabel,
} from "@mui/material";
import { Fragment, useEffect } from "react";
import { useState } from "react";

function TicketDialog({ open, handleTicket, ticketData }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ticketPriority, setTicketPriority] = useState(0);
  const [status, setStatus] = useState("OPEN");
  const [isCreate, setIsCreate] = useState(ticketData == null ? true : false);

  useEffect(() => {
    if (ticketData != null) {
      setIsCreate(false);
      setTitle(ticketData?.title);
      setDescription(ticketData?.description);
      setTicketPriority(ticketData?.ticketPriority);
      setStatus(ticketData?.status);
    }
    else{
      setIsCreate(true);
      setTitle("");
      setDescription("");
      setTicketPriority(4);
      setStatus("OPEN");
    }
  }, [ticketData]);
  return (
    <Dialog open={open}>
      <DialogTitle>{isCreate? `Create ` : `Update `}Ticket</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin='dense'
          id='title'
          label='Title'
          type='text'
          value={title}
          fullWidth
          variant='standard'
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
        <TextField
          autoFocus
          margin='dense'
          id='description'
          label='Description'
          type='text'
          fullWidth
          value={description}
          multiline
          variant='standard'
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        />
        {!isCreate && (
          <Fragment>
            <TextField
              autoFocus
              margin='dense'
              id='ticketPriority'
              label='Ticket Priority'
              type='number'
              fullWidth
              value={ticketPriority}
              variant='standard'
              onChange={(event) => {
                setTicketPriority(event.target.value);
              }}
            />

            <FormControl>
              <FormLabel id='demo-radio-buttons-group-label'>Status</FormLabel>
              <RadioGroup
                aria-labelledby='demo-radio-buttons-group-label'
                name='radio-buttons-group'
                onChange={(event) => {
                  setStatus(event.target.value);
                }}
                value={status}
              >
                <FormControlLabel
                  value='OPEN'
                  control={<Radio />}
                  label='OPEN'
                />
                <FormControlLabel
                  value='CLOSED'
                  control={<Radio />}
                  label='CLOSED'
                />
              </RadioGroup>
            </FormControl>
          </Fragment>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            handleTicket(isCreate, {
              title: title,
              ticketPriority: ticketPriority,
              description: description,
              status: status,
            });
          }}
        >
          {isCreate ? "Create" : "Update"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export default TicketDialog;
