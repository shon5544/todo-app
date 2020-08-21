import React from "react";
import { StyleSheet, Text, View, FlatList, AsyncStorage } from "react-native";
import Inputbar from "./inputting/inputbar";
import Todo from "./inputting/todo";
import MenuScreen from "./navigator/menuScreen";

export default class Main extends React.Component {
  state = {
    inputValue: "",
    todo: [
      //글자수 제한은 15글자
    ],
  };

  saveTodo = () => {
    AsyncStorage.setItem("@todo-app:state", JSON.stringify(this.state));
  };

  componentDidMount() {
    AsyncStorage.getItem("@todo-app:state").then((state) => {
      if (state != null) {
        this.setState(JSON.parse(state));
      }
    });
  }

  _makeTodoItem = ({ item, index }) => {
    return (
      <Todo
        text={item.work}
        isChecked={item.isChecked}
        changeCheck={() => {
          const newTodo = [...this.state.todo];
          newTodo[index].isChecked = !newTodo[index].isChecked;
          this.setState({ todo: newTodo }, this.saveTodo);
        }}
        viewStyle={styles.styleView}
        checkStyle={styles.styleCheck}
        delectTodo={() => {
          const newTodo = [...this.state.todo];
          newTodo.splice(index, 1);
          this.setState({ todo: newTodo }, this.saveTodo);
        }}
      />
    );
  };

  _addTodoItem = () => {
    if (this.state.inputValue !== "") {
      const Input = this.state.inputValue;
      const prevItem = this.state.todo;
      const newItem = { work: Input, isChecked: false };
      this.setState(
        {
          inputValue: "",
          todo: prevItem.concat(newItem),
        },
        this.saveItem
      );
    }
  };

  _changeText = (value) => {
    this.setState({ inputValue: value });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.textView}>
          <Text style={styles.text}>오늘의 할일</Text>
        </View>
        <View style={styles.inview}>
          <View style={styles.styleScroll}>
            <Inputbar
              value={this.state.inputValue}
              changeText={this._changeText}
              addTodo={this._addTodoItem}
            />
            <FlatList
              data={this.state.todo}
              renderItem={this._makeTodoItem}
              keyExtractor={(item, index) => {
                return `${index}`;
              }}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#AAF0D1",
    alignItems: "center",
    justifyContent: "center",
  },
  inview: {
    flex: 0.9,
    backgroundColor: "white",
    width: 350,
    top: -23,
    borderRadius: 17,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    alignItems: "center",
    paddingTop: 20,
  },
  textView: {
    backgroundColor: "white",
    borderRadius: 10,
    top: 15,
    left: -85,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  text: {
    fontSize: 17,
    fontWeight: "700",
  },

  inputValue: {
    fontSize: 18,
    marginBottom: 10,
  },
  styleView: {
    padding: 10,
    marginTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#F6F6F6",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  styleScroll: {
    paddingTop: 5,
    paddingRight: 20,
    paddingLeft: 20,
  },
});
