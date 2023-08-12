import { Text, TouchableOpacity, View, StyleSheet } from "react-native";

const options = ["Pomodoro", "Short Break", "Long Break"];

export default function Header({ currentTime, setCurrentTime, setTime }) {
  function handlePress(index) {
    const newTime = index === 0 ? 25 : index === 1 ? 5 : 15;
    setCurrentTime(index);
    setTime(newTime * 60);
  }

  return (
    <View style={styles.container}>
      {options.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handlePress(index)}
          style={[
            styles.itemStyle, 
            currentTime !==  index && {borderColor: "transparent"}]}
        >
          <Text style={{fontWeight:"bold"}}>{item}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemStyle: {
    borderWidth: 2,
    padding: 5,
    flex: 1,
    borderRadius:10,
    borderColor:"white",
    marginVertical:20,
    alignItems:"center"
  },
});