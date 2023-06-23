"use client"
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { buttonModalStyle } from './styles';
import { Typography } from '@mui/material';
import { BookMark } from '@/types/types';
import Toaster from '../toast/Toaster';


interface FormDialogProps {
  open: boolean;
  rover: string;
  camera: string;
  dateFilter: string;
  date: string;
  setOpen: (open: boolean) => void;
}
const FormDialog: React.FC<FormDialogProps> = ({ open, setOpen, rover, camera, dateFilter, date }: FormDialogProps) => {

  const [name, setName] = React.useState("")
  const [success, setSuccess] = React.useState(false)
  const [openToaster, setOpenToaster] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseToaster = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenToaster(false);
  };

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const addToFavorite = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query: BookMark = {
      rover: rover,
      camera: camera,
      dateFilter: dateFilter,
      date: date,
      name: name,
      id: Math.floor(Math.random() * 1000000)
    }
    if (typeof window !== 'undefined') {
      let bookmarks = JSON.parse(window.localStorage.getItem("bookmarks") || "[]");
      bookmarks.push(query);
      setSuccess(true)
      window.localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
      setOpenToaster(true)
      handleClose()
    }
  }
  return (
    <div>
      <Dialog maxWidth="sm" fullWidth open={open} onClose={handleClose}>
        <DialogTitle>Add filter to favorite</DialogTitle>
        <form onSubmit={addToFavorite}>
          <DialogContent>
            {rover != "select" &&
              <Typography>{rover}</Typography>
            }
            {camera != "select" &&
              <Typography>{camera}</Typography>
            }
            {dateFilter != "select" &&
              <Typography>{dateFilter}</Typography>
            }
            <Typography>{date}</Typography>
            <TextField
              autoFocus
              onChange={handleChangeName}
              margin="dense"
              id="name"
              value={name}
              type="text"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button sx={buttonModalStyle} variant="outlined" onClick={handleClose}>Cancel</Button>
            <Button sx={buttonModalStyle} disabled={!name} type="submit" variant="contained" >Add</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export default FormDialog