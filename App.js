import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  ImageBackground
} from "react-native";
import Communications from "react-native-communications";
import RadioForm from "react-native-simple-radio-button";

var positiveProps = [
  { label: "I love you,", value: "I love you, " },
  { label: "You're amazing,", value: "You're amazing, " },
  { label: "You're important to me,", value: "You're important to me, " },
  { label: "It's not you,", value: "It's not you, " }
];

var spaceProps = [
  { label: "but I need some space.", value: "but I need some space." },
  {
    label: "but I need to be alone right now.",
    value: "but I need to be alone right now."
  },
  { label: "but I need some me time.", value: "but I need some me time." },
  {
    label: "but I just want to play video games alone.",
    value: "but I just want to play video games alone."
  }
];

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      positiveValue: "",
      spaceValue: "",
      phoneNumber: ""
    };
  }

  render() {
    return (
      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
        accessible={false}>
        <ImageBackground source={require("./src/images/background.png")} style={{ width: "100%", height: "100%"}}>
          <View style={styles.MainContainer}>
            <View
              style={styles.form}
            >
              <TextInput
                style={styles.Input}
                keyboardType={"phone-pad"}
                onBlur={text => this.setState({ phoneNumber: text })}
                value={this.state.text}
                placeholder={"10 digit phone number"}
                placeholderTextColor={"#fff"}
              />
              <Text style={styles.text}>Positive Note</Text>
              <RadioForm
                style={{ color: "#fff" }}
                buttonColor={"#444343"}
                selectedButtonColor={"#444343"}
                labelColor={"#FFF"}
                radio_props={positiveProps}
                initial={0}
                onPress={value => {
                  this.setState({ positiveValue: value });
                }}
              />
              <Text style={styles.text}>Space Note</Text>
              <RadioForm
                style={styles.RadioForm}
                buttonColor={"#444343"}
                selectedButtonColor={"#444343"}
                radio_props={spaceProps}
                initial={0}
                labelColor={"#FFF"}
                onPress={value => {
                  this.setState({ spaceValue: value });
                }}
              />
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.sendMessage()}
            >
              <Text style={styles.ButtonText}>Send</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </TouchableWithoutFeedback>
    );
  }
  sendMessage = () => {
    Communications.text(
      `${this.state.phoneNumber}`,
      this.state.positiveValue + this.state.spaceValue
    );
    console.log("state on send", this.state);
  };
}

console.log("state", this.state);

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#E6A498",
    borderWidth: 1,
    borderColor: "#000"
  },
  button: {
    alignItems: "center",
    backgroundColor: "#444343",
    paddingHorizontal: 30,
    // margin: 20,
    borderRadius: 50
  },
  ButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 24,
    margin: 15,
  },
  form: {
    backgroundColor: "#fff",
    opacity: 0.5,
    borderRadius: 5,
    padding: 40,
    margin: 40,
  },
  text: {
    color: "#000",
    textAlign: "center",
    fontSize: 24,
    margin: 15,
    textAlign: "center",
    fontFamily: 'Exo DemiBold',
  },
  Input: {
    // margin: 15,
    height: 40,
    color: "white",
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: "#1b1b1b",
  },
  ImageStyle: {
    height: 150,
    width: 150,
    resizeMode: "stretch"
  },
  RadioForm: {
    color: "#fff"
  }
});