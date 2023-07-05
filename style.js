const main = 'yellow'
const back = 'red'
const words = 'blue'

export const style = {
  main: {
    width: "100%",
    height: "90%",
    color: words,
    backgroundColor: main,
    marginTop:50
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
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 40,
    backgroundColor: back,
    paddingHorizontal: 10,
    paddingVertical: 0,
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
    padding: 20,
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
};
