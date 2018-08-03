
const drawerWidth = 250;

const styles = theme => ({
  root: {
    flexGrow: 1,
    paddingTop: 10,
  },
  appFrame: {
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
    minHeight: '100vh'
  },
  toolBar: {
    backgroundColor: theme.palette.primary[500],
    borderRadius: theme.radius,
    boxShadow: theme.shadows[2],
    margin: '0 20px'
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
    height: '100%'
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    borderRadius: theme.radius,
    ...theme.mixins.toolbar,
  },
  content: {
    marginTop: 20,
    padding: '0 20px',
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    borderRadius: theme.radius,
    boxShadow: theme.shadows[5],
    backgroundColor: '#ffffff'
  },
  'content-left': {
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  'contentShift-left': {
    marginLeft: 0,
  }
});

export default styles;