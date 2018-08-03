
const styles = (theme) => ({

  FourOhFour: {
    position: 'absolute',
    top: 20,
    left: 0,
    width: '100%',
    height: '100%',
    background: '#121212e6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.radius
  },
  bg: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    mixBlendMode: 'overlay'
  },
  code: {
    fontSize: '144px',
    height:  '100%',
    color: 'white',
    width:  '100%',
    display: 'flex',
    backgroundPosition: 'center',
    alignItems: 'center',
    backgroundSize: 'cover',
    justifyContent: 'center'
  }
});

export default styles;