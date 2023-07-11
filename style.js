import { Dimensions } from "react-native"

const back = 'rgba(105,155,247,0.4)'
const action = '#699BF7'
const words = 'white'

const style = {
  main: {
    width: Dimensions.get('window').width,
    backgroundImage: 'url(./images/background.webp)',
    backgroundSize: 'cover',
    minHeight: Dimensions.get('window').height,
    paddingTop: 75,
    boxSizing: "border-box",
    color: words
  },
  leadboardItem: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,

  },
  saveButton: {
    position: 'absolute',
    top: -15,
    right: -15,
    width: 30,
    height: 30,
  },
  saved: {
    marginTop: 20,
    width: Dimensions.get('window').width,
    paddingLeft: 18,
    paddingRight: 18,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    gap: 25,
  },
  savedItem: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  savedImage: {
    width: 50,
    height: 50,
    borderRadius: '50%',
  },
  savedWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7
  },
  savedDetails: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    height: 50,
    gap:8
  },
  savedName: {
    fontSize: 18,
    color: words,
    fontWeight: 'bold',
  },
  savedSpot: {
    fontSize: 14,
    color: words,
    opacity: 0.5,
  },
  remove: {
    opacity: 0.5,
    fontSize: 14,
    color: words,
  },
  noSaved: {
    fontSize: 18,
    color: words,
    opacity: 0.5,
    textAlign: 'center',
    marginTop: 20
  },
  header: {
    backgroundImage: 'url(./images/background.webp)',
    width: Dimensions.get('window').width,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'fixed',
    top: 0,
    height: 70,
    paddingTop:30,
    zIndex: 1,
    borderBottomColor: back,
    borderBottomWidth: 1,
    paddingLeft: 15,
    paddingRight: 15,
  },
  headerText: {
    fontSize: 20,
    color: words,
  },
  menuIcon: {
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