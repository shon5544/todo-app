import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

const Todo = ({
  text,
  isChecked,
  changeCheck,
  viewStyle,
  checkStyle,
  delectTodo,
}) => {
  return (
    <View style={viewStyle}>
      <TouchableOpacity onPress={changeCheck}>
        <AntDesign
          name={isChecked ? "checksquare" : "checksquareo"}
          size={19}
          color="black"
          style={checkStyle}
        />
      </TouchableOpacity>
      <Text>{text}</Text>
      <TouchableOpacity onPress={delectTodo}>
        <Feather name="trash-2" size={19} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default Todo;
