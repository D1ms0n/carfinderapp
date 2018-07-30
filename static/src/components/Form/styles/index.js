
const ITEM_HEIGHT = 48;

const styles = theme => ({
  mileageField: {
    width: '100%',
    marginTop: 0
  },
  subheading: {
    textAlign: 'left',
    minHeight: 24
  },
  button: {
    width: '100%',
    marginBottom: 15,
    backgroundColor: theme.palette.primary[500],
  },
  textField: {
    width: '100%',
  },
  paperRelative: {
    position: 'relative',
  },
  milesLabel: {
    position: 'absolute',
    bottom: 25,
    right: 20
  },
  chip: {
    margin: theme.spacing.unit / 4,
  },
  paper: {
    padding: 15,
    marginTop: 10,
    borderRadius: theme.radius,
    color: theme.palette.text.secondary[500],
    boxShadow: 'none',
    textAlign: 'center'
  },
  cardHeader: {
    background: `linear-gradient(60deg, ${theme.palette.primary[500]}, ${theme.palette.primary[500]})!important`,
    boxShadow: theme.shadows[2]
  },
  '@global': {
    '#root': {
      overflow: 'hidden'
    },
    '.rc-slider-handle': {
      border: `2px solid ${theme.palette.primary[500]}`,
      marginTop: -8,
      marginLeft: -10,
      width: 20,
      height: 20
    },
    '.rc-slider-handle:active': {
      borderColor: theme.palette.primary[100],
      boxShadow: `0 0 5px ${theme.palette.primary[500]}`
    },
    '.rc-slider-track': {
      backgroundColor: theme.palette.primary[500]
    },
    '.Select-control': {
      display: 'flex',
      alignItems: 'center',
      border: 0,
      height: 'auto',
      background: 'transparent',
      '&:hover': {
        boxShadow: 'none',
      },
    },
    '.Select-multi-value-wrapper': {
      flexGrow: 1,
      display: 'flex',
      flexWrap: 'wrap',
    },
    '.Select--multi .Select-input': {
      margin: 0,
    },
    '.Select.has-value.is-clearable.Select--single > .Select-control .Select-value': {
      padding: 0,
    },
    '.Select-noresults': {
      padding: theme.spacing.unit * 2,
    },
    '.Select-input': {
      display: 'inline-flex !important',
      padding: 0,
      height: 'auto',
    },
    '.Select-input input': {
      background: 'transparent',
      border: 0,
      padding: 0,
      cursor: 'default',
      display: 'inline-block',
      fontFamily: 'inherit',
      fontSize: 'inherit',
      margin: 0,
      outline: 0,
    },
    '.Select-placeholder, .Select--single .Select-value': {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.pxToRem(16),
      padding: 0,
    },
    '.Select-placeholder': {
      opacity: 0.42,
      color: theme.palette.common.black,
    },
    '.Select-menu-outer': {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[2],
      position: 'absolute',
      left: 0,
      top: `calc(100% + ${theme.spacing.unit}px)`,
      width: '100%',
      zIndex: 2,
      maxHeight: ITEM_HEIGHT * 4.5,
    },
    '.Select.is-focused:not(.is-open) > .Select-control': {
      boxShadow: 'none',
    },
    '.Select-menu': {
      maxHeight: ITEM_HEIGHT * 4.5,
      overflowY: 'auto',
    },
    '.Select-menu div': {
      boxSizing: 'content-box',
    },
    '.Select-arrow-zone, .Select-clear-zone': {
      color: theme.palette.action.active,
      cursor: 'pointer',
      height: 21,
      width: 21,
      zIndex: 1,
    },
    '.Select-aria-only': {
      position: 'absolute',
      overflow: 'hidden',
      clip: 'rect(0 0 0 0)',
      height: 1,
      width: 1,
      margin: -1,
    },
  },
});

export default styles;