import React, { useRef, useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import {
  Text,
  TextInput,
  View,
  Pressable,
  TouchableOpacity,
} from "react-native";
/**
 * One time input.
 * https://blog.logrocket.com/creating-split-otp-input-fields-react-native/
 * https://github.com/Taofiqq/splitOTP
 * TODO: Add validation / link to backend.
 * @param {*} param0
 * @returns
 */
export default function OTPInput({
  code,
  setCode,
  maximumLength,
  setIsPinReady,
}) {
  const boxArray = new Array(maximumLength).fill(0);
  const inputRef = useRef();

  const [isInputBoxFocused, setIsInputBoxFocused] = useState(false);

  const handleOnPress = () => {
    setIsInputBoxFocused(true);
    inputRef.current.focus();
  };

  const handleOnBlur = () => {
    setIsInputBoxFocused(false);
  };

  useEffect(() => {
    // update pin ready status
    setIsPinReady(code.length === maximumLength);
    // clean up function
    return () => {
      setIsPinReady(false);
    };
  }, [code]);
  const boxDigit = (_, index) => {
    const emptyInput = "";
    const digit = code[index] || emptyInput;

    return (
      <View style={styles.SplitBoxes} key={index}>
        <Text style={styles.SplitBoxText}>{digit}</Text>
      </View>
    );
  };

  return (
    <View style={styles.OTPInputContainer}>
      <Pressable style={styles.SplitOTPBoxesContainer} onPress={handleOnPress}>
        {boxArray.map(boxDigit)}
      </Pressable>
      <TextInput
        style={styles.TextInputHidden}
        value={code}
        onChangeText={setCode}
        maxLength={maximumLength}
        ref={inputRef}
        onBlur={handleOnBlur}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  OTPInputContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  OTPInputContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  TextInputHidden: {
    /* width: 300px;
  border-color: #e5e5e5;
  border-width: 1px;
  border-radius: 5px;
  padding: 15px;
  margin-top: 50px;
  color: white; */
    position: "absolute",
    opacity: 0,
  },
  SplitOTPBoxesContainer: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  SplitBoxes: {
    borderColor: "#e5e5e5",
    borderWidth: "2px",
    borderRadius: "5px",
    padding: "12px",
    minWidth: "50px",
  },
  SplitBoxText: {
    fontSize: "20px",
    textAlign: "center",
    color: "#e5e5e5",
  },

  SplitBoxesFocused: {
    borderColor: "#ecdbba",
    backgroundColor: "gray",
  },
  ButtonContainer: {
    backgroundColor: "#000000",
    padding: "20px",
    justifyContent: "center",
    alignItems: "center",
    width: "200px",
    marginTop: "30px",
  },
  ButtonText: {
    color: "black",
    fontSize: "20px",
  },
});
