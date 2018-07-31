
const styles = theme => ({
  resultsWrapper: {
    textAlign: 'left',
    margin: 0,
    padding: 0
  },
  listItem: {
    padding: 0,
    margin: 0,
    marginBottom: 10,
    marginTop: 10
  },
  card: {
    borderRadius: theme.radius
  },
  gridContainer: {
    margin: 0,
    width: '100%'
  },
  paperRelative: {
    margin: 0
  },
  content: {
    width: '55%',
    float: 'right'
  },
  cover: {
    width: '45%',
    height: 300,
    float: 'left',
  },
  paper: {
    paddingTop: 1,
    marginTop: 10,
    borderRadius: theme.radius,
    boxShadow: 'none',
    textAlign: 'center',
    backgroundColor: 'transparent'
  },
  secondaryText:{
    color: theme.palette.text.secondary[500],
  },
  whiteText: {
    color: '#ffffff'
  },
  cardHeader: {
    background: `linear-gradient(60deg, ${theme.palette.primary[500]}, ${theme.palette.primary[500]})!important`,
    boxShadow: theme.shadows[2]
  },
  lastBtn: {
    marginRight: 'auto'
  }
});

export default styles;