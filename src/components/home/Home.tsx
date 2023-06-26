"use client";
import { useEffect, useState } from "react";

import CardNasa from '@/components/card/Card';
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getMarsRover } from "@/feautures/marsRoverSlice"
import { Box, Grid, Typography } from "@mui/material";
import Loader from "@/components/loader/Loader";
import MarsRover from "@/interfaces/interfaces";
import InfiniteScroll from "react-infinite-scroll-component";
import { subHeaderTitle } from "./styles";

const HomePage = () => {
  const dispatch = useAppDispatch();
  const { error, loading, marsRover, queryString, marsRoverPages }: any = useAppSelector((state) => state.marsRover);
  // const [items, setItems] = useState([]);

  // const [hasMore, sethasMore] = useState(true);

  // const [page, setpage] = useState(0);


  // const fetchData = async () => {

  //   let queryObject: any = {
  //     initialString: queryString ? queryString : `curiosity/latest_photos?`,
  //     pageNumber: page + 1
  //   }
  //   dispatch(getMarsRover(queryObject));
  //   if (marsRoverPages.length === 0 || marsRoverPages.length < 25) {
  //     sethasMore(false);
  //   }
  //   setpage(page + 1);
  // };

  

  useEffect(() => {
    let pageNumber = 1
    let initialString = `curiosity/latest_photos?`
    let queryObject: any = {
      initialString,
      pageNumber
    }
    dispatch(getMarsRover(queryObject));
  }, [dispatch]);


  if (error) {
    return <Box> <Typography variant="h4">HUBO UN ERROR AL CARGAR LA API DE LA NASA</Typography></Box>
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
      <Typography sx={subHeaderTitle}> Code challenge using the NASA API to obtain photos from the Mars Rover</Typography>
      {/* <InfiniteScroll
        dataLength={items.length} 
        next={fetchData}
        hasMore={hasMore}
        endMessage={
          <Typography sx={{ textAlign: "center" }}> no more data</Typography>
        }
        loader={<Loader size={30} />}
      > */}
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
      {/* </InfiniteScroll> */}
    </>
  )
}

export default HomePage