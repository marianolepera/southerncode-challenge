"use client";
import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material"
import { boxIconStyle, boxTitleStyle, headerBox, headerTitle } from "./styles"
import LeftDrawer from "../drawer/Drawer";

const NavBar = () => {

    return (
        <>
            <AppBar position="static" sx={headerBox}>
                <Container maxWidth="xl" >
                    <Toolbar disableGutters>
                        <Box sx={boxIconStyle}>
                            <LeftDrawer />
                        </Box>
                        <Box sx={boxTitleStyle}>
                            <Typography sx={headerTitle}> Southern Code Challenge</Typography>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    )

}

export default NavBar