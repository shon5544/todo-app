import React from "react";
import { TextInput, StyleSheet } from "react-native";

const Inputbar = ({ value, changeText, addTodo }) => (
  <TextInput
    value={value}
    onChangeText={changeText}
    onEndEditing={addTodo}
    style={styles.styleInput}
    placeholder={"오늘의 할일을 적어주세요!"}
    maxLength={30}
    returnKeyType="done"
  />
);
const styles = StyleSheet.create({
  styleInput: {
    fontSize: 20,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
});
export default Inputbar;
