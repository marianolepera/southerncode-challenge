export const headerIconStyle = {
    p: 0,
    color: (theme: any) => theme.palette.primary.main,
    ":hover": {
        transform: "scale(1.2)",
        transition: "all 0.45s ease-in-out",
        cursor: "pointer"
    }
}

export const menuIconStyle = (theme: any) => ({
    fontSize: 40,
    [theme.breakpoints.down('md')]: {
        fontSize: 28,
    },
    [theme.breakpoints.down('xs')]: {
        fontSize: 18,
    },
})

export const boxDrawerContainer = (theme: any) => ({
    width: 350,
    [theme.breakpoints.down('md')]: {
        width: 250,
    },
    [theme.breakpoints.down('xs')]: {
        width: 210
    },
    margin: 3,
})

export const boxDrawerBody = {
    display: "flex",
    flexDirection: "column",
    marginTop: 1
}

export const selectStyle = (theme: any) => ({
    width: 201,
    [theme.breakpoints.down('md')]: {
        width: 170,
    },
    [theme.breakpoints.down('xs')]: {
        width: 140
    },
    marginTop: 1
})

export const boxDrawerTitle = {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 0
}

export const iconCloseStyle = {
    bottom: 7
}

export const buttonContainer = {
    marginTop: 1,
}

export const buttonCleanContainer = (theme: any) => ({
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    marginTop: 2,
    marginRight: 20,
    [theme.breakpoints.down('md')]: {
        marginRight: 5,
    },
    [theme.breakpoints.down('xs')]: {
        marginRight: 0,
    },
})

export const buttonFilter = {
    textTransform: "none"
}

export const buttonClean = {
    textTransform: "none",
    textAlign: "center",

}

export const buttonFilterFavorite = {
    textTransform: "none",
    marginLeft: 1
}

export const deleteIconButtonStyle = (theme: any) => ({
    color: (theme: any) => theme.palette.primary.main,
    marginTop: 4,
    marginLeft: 3,
    [theme.breakpoints.down('md')]: {
        marginLeft: 2,
    },
    [theme.breakpoints.down('xs')]: {
        marginLeft: 1,
    },
})

export const deleteIconStyle = {
    fontSize: 35
}

