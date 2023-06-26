export const subHeaderTitle =(theme:any)=> ({
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