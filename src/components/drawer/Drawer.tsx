"use client"
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { FormControl, FormHelperText, FormLabel, IconButton, MenuItem, Select, SelectChangeEvent, TextField, Tooltip, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { boxDrawerBody, boxDrawerContainer, boxDrawerTitle, buttonClean, buttonCleanContainer, buttonContainer, buttonFilter, buttonFilterFavorite, deleteIconButtonStyle, deleteIconStyle, headerIconStyle, iconCloseStyle, menuIconStyle, selectStyle } from './styles';
import { BookMark, QueryString, RoverType, cameras, datesFilter } from '@/types/types';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import CameraAltRoundedIcon from '@mui/icons-material/CameraAltRounded';
import FormDialog from '../modal/Modal';
import { useAppDispatch } from "@/store/hooks";
import { addQueryString, getMarsRover, reset } from "@/feautures/marsRoverSlice"
import DeleteIcon from '@mui/icons-material/Delete';
import Toaster from '../toast/Toaster';

type Anchor = 'left';

export default function LeftDrawer() {
    const [state, setState] = React.useState({
        left: false,
    });
    const [rover, setRover] = React.useState("select")
    const [camera, setCamera] = React.useState("select")
    const [dateFilter, setDateFilter] = React.useState("select")
    const [date, setDate] = React.useState("")
    const [book, setBook] = React.useState("select")
    const [open, setOpen] = React.useState(false);
    const [openToaster, setOpenToaster] = React.useState(false);
    const [success, setSuccess] = React.useState(false)
    const [error, setError] = React.useState(false)

    const dispatch = useAppDispatch();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleChangeBookMark = (event: SelectChangeEvent) => {
        setBook(event.target.value);
        if (typeof window !== 'undefined') {
            let bookmarks = JSON.parse(window.localStorage.getItem("bookmarks") || "[]");
            const selectedBook = bookmarks.find((book: BookMark) => book.id === parseInt(event.target.value));
            if (selectedBook) {
                setRover(selectedBook?.rover)
                setCamera(selectedBook?.camera)
                setDateFilter(selectedBook?.dateFilter)
                setDate(selectedBook?.date)
            }

        };

    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let initialString = "photos?"
        let pageNumber = 1

        if (camera != "select") initialString += 'camera=' + camera
        if (date && dateFilter != "select") initialString += '&' + dateFilter + '=' + date
        if (initialString == 'photos?') initialString = 'latest_photos?'
        if (!rover) {
            initialString = `curiosity/latest_photos?`
        }
        initialString = `${rover}/${initialString}`
        let queryObject: QueryString = {
            initialString,
            pageNumber,
        }
        dispatch(addQueryString(queryObject))
        dispatch(getMarsRover(queryObject))
        dispatch(reset())
    }

    const clearFilter = () => {
        setRover("select")
        setCamera("select")
        setDateFilter("select")
        setDate("")
        setBook("select")
    };


    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenToaster(false);
        setSuccess(false)
        setError(false)
    };

    const deleteBookmark = () => {
        if (typeof window !== 'undefined') {
            let bookmarks = JSON.parse(window.localStorage.getItem("bookmarks") || "[]");
            const bookMarkFiltered = bookmarks.filter((bookMark: BookMark) => bookMark.id != parseInt(book));
            if (bookMarkFiltered) {
                window.localStorage.setItem("bookmarks", JSON.stringify(bookMarkFiltered));
                clearFilter()
                if (bookMarkFiltered.length == 0) {
                    window.localStorage.clear();
                }
                setOpenToaster(true);
                setSuccess(true)
            } else {
                setOpenToaster(true);
                setError(true)
            }
        }
    }

    const toggleDrawer =
        (anchor: Anchor, open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if (
                    event.type === 'keydown' &&
                    ((event as React.KeyboardEvent).key === 'Tab' ||
                        (event as React.KeyboardEvent).key === 'Shift')
                ) {
                    return;
                }

                setState({ ...state, [anchor]: open });
            };
    let bookmarks: any = []
    if (typeof window !== 'undefined') {
        bookmarks = JSON.parse(window.localStorage.getItem("bookmarks") || "[]");
    }
    const list = (anchor: Anchor) => (
        <Box
            sx={boxDrawerContainer}
            role="presentation"
        >
            <Box sx={boxDrawerTitle}>
                <Typography> Search photos</Typography>
                <IconButton sx={iconCloseStyle} onClick={toggleDrawer(anchor, false)}>
                    <HighlightOffRoundedIcon />
                </IconButton>
            </Box>
            <Divider />
            <Box sx={boxDrawerBody}>
                <form onSubmit={onSubmit}>
                    {success &&
                        <Toaster severity="success" open={openToaster} message="Bookmark deleted!" handleClose={handleClose} />
                    }
                    {error &&
                        <Toaster severity="error" open={openToaster} message="Error. Try again!" handleClose={handleClose} />
                    }
                    <FormControl>
                        <FormLabel>Bookmarks</FormLabel>
                        <Select sx={selectStyle} name="book" onChange={handleChangeBookMark} value={book}  >
                            <MenuItem value="select"> Select Bookmark</MenuItem>
                            {bookmarks?.map((book: BookMark) => (
                                <MenuItem key={book?.id} value={book?.id}>
                                    {book?.name}
                                </MenuItem>))}
                        </Select>
                        <FormHelperText>Select a bookmark</FormHelperText>
                    </FormControl>
                    <Tooltip title="Delete bookmark"  >
                        <IconButton sx={deleteIconButtonStyle} disabled={book == "select"} onClick={deleteBookmark}>
                            <DeleteIcon sx={deleteIconStyle} />
                        </IconButton>
                    </Tooltip>
                    <FormControl>
                        <FormLabel required>Rover</FormLabel>
                        <Select required sx={selectStyle} name="rover" onChange={(e) => setRover(e.target.value)} value={rover}>
                            <MenuItem value="select"> Select Rover</MenuItem>
                            {Object.values(RoverType).map((rover, index) => (<MenuItem key={index} value={rover}>{rover}</MenuItem>))}
                        </Select>
                        <FormHelperText>Select a rover</FormHelperText>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Camera</FormLabel>
                        <Select role="select" sx={selectStyle} name="camera" onChange={(e) => setCamera(e.target.value)} value={camera}  >
                            <MenuItem value="select"> Select Camera</MenuItem>
                            {cameras?.get(rover)?.map((camera, index) => (<MenuItem key={index} value={camera}>{camera}</MenuItem>))}
                        </Select>
                        <FormHelperText>Choose a rover to see the options</FormHelperText>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Date Filter</FormLabel>
                        <Select sx={selectStyle} name="dateFilter" onChange={(e) => setDateFilter(e.target.value)} value={dateFilter} >
                            <MenuItem value="select"> Select Date Filter</MenuItem>
                            {datesFilter?.get(rover)?.map((dateFilter, index) => (<MenuItem key={index} value={dateFilter}>{dateFilter}</MenuItem>))}
                        </Select>
                        <FormHelperText>Choose a rover to see the options</FormHelperText>
                    </FormControl>
                    {dateFilter != "select" &&
                        <>
                            {dateFilter == "earth_date" ?
                                (
                                    <FormControl>
                                        <FormLabel>Date</FormLabel>
                                        <TextField
                                            value={date}
                                            onChange={(e) => setDate(e.target.value)}
                                            id="date"
                                            helperText="Select a date"
                                            type="date"
                                            sx={selectStyle}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </FormControl>
                                )
                                :
                                (
                                    <FormControl>
                                        <FormLabel>Sol</FormLabel>
                                        <TextField
                                            InputProps={{
                                                inputProps: { min: 0 }
                                            }}
                                            value={date}
                                            onChange={(e) => setDate(e.target.value)}
                                            id="number"
                                            helperText="Select sol number from 0 to infinite"
                                            type="number"
                                            sx={selectStyle}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </FormControl>
                                )
                            }
                        </>
                    }
                    <Box sx={buttonContainer}>
                        <Button variant="contained" type="submit" sx={buttonFilter} disabled={rover == "select"} endIcon={<CameraAltRoundedIcon />}>
                            Search
                        </Button>
                        <Button variant="outlined" sx={buttonFilterFavorite} onClick={handleClickOpen} disabled={rover == "select"} endIcon={<FavoriteRoundedIcon />}>
                            Add to
                        </Button>

                    </Box>
                    <Box sx={buttonCleanContainer}>
                        <Button variant="outlined" sx={buttonClean} onClick={clearFilter} disabled={rover == "select"} endIcon={<DeleteIcon />}>
                            Clean
                        </Button>
                    </Box>
                </form>
                <FormDialog
                    rover={rover}
                    camera={camera}
                    dateFilter={dateFilter}
                    date={date}
                    open={open}
                    setOpen={setOpen}
                />
            </Box>
        </Box>
    );

    return (
        <div>
            {(['left'] as const).map((anchor) => (
                <React.Fragment key={anchor}>
                    <IconButton
                        sx={headerIconStyle}
                        size="large"
                        onClick={toggleDrawer(anchor, true)}
                        color="inherit"
                    >
                        <MenuIcon sx={menuIconStyle} />
                    </IconButton>
                    <Drawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                    >
                        {list(anchor)}
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
}
