export const headerBox =(theme:any) => ({
    height: "60px",
    [theme.breakpoints.down('xs')]: {
        height:"65px",
    },
    display: "flex",
    textAlign: "center",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
    backgroundColor: (theme: any) => theme.palette.primary.light,
})

export const headerTitle = (theme:any) => ({
    fontSize: 30,
    padding: 1,
    fontWeight: "bold",
    color: (theme: any) => theme.palette.primary.main,
    [theme.breakpoints.down('md')]: {
        fontSize: 20,
      },
    [theme.breakpoints.down('xs')]: {
        fontSize: 16,
    },
    
  });


export const boxIconStyle = {
    flexGrow: 0
}

export const boxTitleStyle = {
    flexGrow: 1
}