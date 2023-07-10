import { Dimensions } from "react-native"

const back = 'rgba(105,155,247,0.4)'
const action = '#699BF7'
const words = 'white'

const style = {
  main: {
    width: "100%",
    backgroundImage: 'url(./images/background.webp)',
    backgroundSize: 'cover',
    height: Dimensions.get('window').height,
    paddingTop: 75,
    boxSizing: "border-box",
    color: words
  },
  header: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'fixed',
    top: 35,
    height: 40,
    zIndex: 1,
    borderBottomColor: back,
    borderBottomWidth: 1,
    paddingLeft: 15,
    paddingRight: 15,
  },
  menuIcon:{
    width: 30,
    height: 30,
  },
  underline: {
    textDecorationLine: "underline",
  },
  hidden: {
    display: "none",
  },
  screen: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    opacity: 0,
    backgroundColor: "black",
    zIndex: 10,
  },
  blur: {
    opacity: 0.6,
  },
  landing: {
    color: words,
  },
  landingImg: {
    width: '100%',
    height: parseInt(Dimensions.get('window').width * 47 / 39),
  },
  landingTxt: {
    fontSize: 30,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
    color: words,
  },
  play: {
    width: '85%',
    backgroundColor: action,
    fontSize: 300,
    borderRadius: 10,
    margin: 'auto',
    textAlign: 'center',
    padding: 10,
    border: 'none',
  },
  upperPopupWrapper: {
    position: "absolute",
    zIndex: 1000,
    top: 40,
    borderRadius: 10,
    width: "100%",
    backgroundColor: "transparent",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  upperPopup: {
    width: "90%",
    textAlign: "center",
    backgroundColor: "rgb(241, 110, 110)",
    color: "rgb(0, 255, 34)",
    fontSize: "x-large",
  },
  words: {
    color: words,
  }
};

export default style;