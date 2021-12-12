import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  containerSlider: {
    maxWidth: 400,
    height: 245,
    margin: '10px auto',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
    backgroundColor: '#cecececc',
  },
  slide: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    margin: 'auto auto',
    textAlign: 'center',
    color: '#948a04',
    fontWeight: 'bold',
    fontSize: '15.5px',
    opacity: 0,
    transition: 'opacity ease-out 3.5s',
  },
  slideImg: {
    width: '100%',
    height: 200,
    objectFit: 'fill',
  },
  activeAnim: {
    opacity: 1,
  },
  btnSlide: {
    width: 30,
    height: 30,
    borderRadius: '50%',
    background: '#f1f1f148',
    border: '1px solid rgba(34, 34, 34, 0.287)',
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
  },
  btnSlideImg: {
    width: 25,
    height: 25,
    pointerEvents: 'none',
  },
  imgAnimationIn: {
    animationName: '$slideIn',
    animationDuration: '5s',
    animationDelay: '-1s'

  },
  '@keyframes slideIn': {
    '0%': {
      marginLeft: '100%',
    },
    '100%': {
      marginLeft: '0%',
    },
  },
  prev: {
    top: '50%',
    left: 20,
    transform: 'translateY(-60%)',
    color: '#fff',
  },
  next: {
    top: '50%',
    right: 20,
    transform: 'translateY(-60%)',
    color: '#f2f2f2',
  },
  containerDots: {
    position: 'absolute',
    bottom: 10,
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: '50%',
    border: '3px solid #f1f1f1',
    margin: '0 5px',
    background: '#f1f1f148',
  },
  dotActive: {
    background: 'rgb(32, 32, 32)',
  }
}))

export default useStyles;