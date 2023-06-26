"use client";
import { useEffect, useState } from "react";
import CardNasa from '@/components/card/Card';
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getMarsRover, resetToast } from "@/feautures/marsRoverSlice"
import { Box, Grid, Typography } from "@mui/material";
import Loader from "@/components/loader/Loader";
import MarsRover from "@/interfaces/interfaces";
import { errorStyle, subHeaderTitle } from "./styles";
import Toaster from "../toast/Toaster";

const HomePage = () => {
  const dispatch = useAppDispatch();
  const { error, loading, marsRover, success, message }: any = useAppSelector((state) => state.marsRover);
  const [open, setOpen] = useState(false);
  const [openError, setOpenError] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickOpenError = () => {
    setOpenError(true);
  };


  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };


  useEffect(() => {
    if (error) {
      handleClickOpenError()
    }
    if (success) {
      handleClickOpen()
    }

    let pageNumber = 1
    let initialString = `curiosity/latest_photos?`
    let queryObject: any = {
      initialString,
      pageNumber
    }
    dispatch(getMarsRover(queryObject));
  }, [dispatch,error,success,message]);

  useEffect(() => {
  
    dispatch(resetToast());
  }, [dispatch]);

 

  if (error) {
    return <Box sx={errorStyle}> <Typography variant="h4">There was an error loading the nasa api!</Typography></Box>
  }

  if (loading) {
    return <Loader size={60} />
  }

  let photos = []
  let latest_photos = []

  if (marsRover?.photos) {
    photos = marsRover?.photos
  } else {
    latest_photos = marsRover?.latest_photos
  }

  return (
    <>
      {message != "" &&
        <>
          <Toaster severity="success" open={open} message={message} handleClose={handleClose} />
          <Toaster severity="error" open={openError} message={message} handleClose={handleClose} />
        </>
      }
      <Typography sx={subHeaderTitle}> Code challenge using the NASA API to obtain photos from the Mars Rover</Typography>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {photos.length != 0 ?
          <>
            {photos && photos?.map((mars: MarsRover) => (
              <Grid item xs={12} md={3} lg={5} xl={5} key={mars?.id}>
                <CardNasa mars={mars} />
              </Grid>
            ))}
          </>
          :
          <>
            {latest_photos && latest_photos?.map((mars: MarsRover) => (
              <Grid item xs={12} md={3} lg={5} xl={5} key={mars?.id}>
                <CardNasa mars={mars} />
              </Grid>
            ))}
          </>
        }
      </Grid>
    </>
  )
}

export default HomePage