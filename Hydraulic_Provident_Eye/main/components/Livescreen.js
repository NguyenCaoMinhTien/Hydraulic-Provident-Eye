import React, { useState, useCallback } from "react";
import { View, StyleSheet, Button } from "react-native";
import YoutubeIframe from "react-native-youtube-iframe";

const LiveScreen = () => {
  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      alert("Video đã kết thúc!");
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev); 
  }, []);

  return (
    <View style={styles.screen}>
      <YoutubeIframe
        height={300}
        width={'95%'}
        videoId={"DaTBdDX3L7o"}
        play={playing}
        onChangeState={onStateChange}
      />

      
      <Button
        title={playing ? "Pause Video" : "Play Video"} 
        onPress={togglePlaying} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "top",
    alignItems: "center",
    backgroundColor: "#fff", 
    marginTop: 50,
  },
});

export default LiveScreen;