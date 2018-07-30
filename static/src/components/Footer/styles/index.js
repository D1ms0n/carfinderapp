
const styles = theme => ({
  iconWrap: {
    width: 58,
    height: 58
  },
  icon: {
    margin: theme.spacing.unit,
    fontSize: 50,
    marginTop: 4
  },
  '@global': {
    '.scrollToTop': {
      position: 'fixed',
      transition: 'all .2s ease-in-out',
      right: -150,
      bottom: 15,
      zIndex: 100
    },
    '.scrollToTop.active': {
      right: 15,
    }
  }
});

export default styles;