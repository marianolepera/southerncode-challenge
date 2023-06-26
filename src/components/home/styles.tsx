export const subHeaderTitle = (theme: any) => ({
    fontSize: 20,
    textAlign: "center",
    marginTop: 2,
    color: (theme: any) => theme.palette.primary.main,
    [theme.breakpoints.down('md')]: {
        fontSize: 17,
    },
    [theme.breakpoints.down('xs')]: {
        fontSize: 15,
    },
})

export const errorStyle={
    display:"flex",
    textAlign:"center",
    margin:10,
    justifyContent:"center",
    color: (theme: any) => theme.palette.primary.main,
}