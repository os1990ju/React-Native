import { Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";
import Header from "./src/components/header";
import Timer from "./src/components/Timer";
import {Audio} from "expo-av";

const colors = ["#F7DC6F", "#A2D9CE", "#D7BDE2"];

export default function App() {
  const [isWorking, setIsWorking] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [time, setTime] = useState(25 * 60);
  const [currentTime, setCurrentTime] = useState("POMO" | "SHORT" | "BREAK");
  
  useEffect(()=>{
    let interval = null;

    if(isActive){
      interval = setInterval(()=>{
        setTime(time -1);
      }, 1000);
    }else {
      clearInterval(interval);
    }

    if(time === 0){
      setIsActive(false);
      setIsWorking(prev => !prev); //actualiza el estado previo
      setTime(currentTime === 0 ? 1500 : currentTime === 1? 300 : 900);
      console.log(currentTime);
    }

    return ()=> clearInterval(interval);
  },[isActive, time])

  function handleStartStop(){
    playSound();
    setIsActive(!isActive);
  }
  
  async function playSound(){
    const { sound } = await Audio.Sound.createAsync(
      require("./assets/click.mp3")
    );
    await sound.playAsync();
  }
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors[currentTime] }]}
    >
      <View style={{ 
        paddingHorizontal:15,
        flex:1,
        paddingTop: Platform.OS === "android" && 30 }}>
        <Text style={styles.text}>Pomodoro</Text>
        <Header
          currentTime={currentTime}
          setCurrentTime={setCurrentTime}
          setTime={setTime} 
        />
        <Timer time={time}/>
        <TouchableOpacity 
          onPress={()=>handleStartStop()}
          style={styles.button}>
          <Text style={{color:"white", fontWeight:"bold"}}>
            {isActive ? "STOP" : "START"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
  },
  button:{
    alignItems:"center",
    backgroundColor:"#333333",
    padding:15,
    marginTop:15,
    borderRadius:15
  }
});
