const drawerWidth = 250;
const styles = theme => ({
  link: {
    color: theme.headerLinksColor[50],
    textDecoration: 'none',
    paddingLeft: 10
  },
  appBar: {
    backgroundColor: 'transparent',
    boxShadow: 'none',
    position: 'absolute',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  toolBar: {
    backgroundColor: theme.palette.primary[500],
    borderRadius: theme.radius,
    boxShadow: theme.shadows[2],
    margin: '0 20px'
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  'appBarShift-left': {
    marginLeft: drawerWidth,
  }
});

export default styles;