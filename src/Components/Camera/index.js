import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Image, Modal, SafeAreaView, Text, View, TouchableOpacity} from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';

import * as Location from 'expo-location';


export default function TakePicture(props) {
  const ref = useRef(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [captured, setCaptured] = useState(null);
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);
  useEffect(() => {
    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);
  useEffect(() => {
    (async () => {
      const { statusLoc } = await Location.requestForegroundPermissionsAsync();
      if (statusLoc !== 'granted') {
        setErrorMsg('Permissão Não Concedida!');
      }
    })();
  }, []);


  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>Permita o uso da câmera</Text>;
  }

  async function saveLocation() {
    
    let actualLocation = await Location.getCurrentPositionAsync({});
    setLocation(actualLocation.coords);
    console.log(actualLocation.coords);
    
    if (errorMsg) {
      text = errorMsg;
    } else if (location) {
      text = JSON.stringify(location);
    }
  }

  async function take() {
    if (ref) {
      const opt = {
        quality: 0.8,
        base64: true,
        flexOrientation: true,
        forceUpOrientation: true,
      }
      saveLocation();
      const data = await ref.current.takePictureAsync(opt);
      setCaptured(data.uri)
      setOpen(true)
      await MediaLibrary.saveToLibraryAsync(data.uri);
      console.log(data)
    }
  }


return (
  <SafeAreaView style={styles.container}>
        <Camera style={styles.camera} type={type} ref={ref}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.buttonFlip}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}>
            <Image style={styles.icon} source={require("../../../assets/flip.png")}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonTake}
              onPress={take}>
              <Image style={styles.icon} source={require("../../../assets/camera.png")}/>
            </TouchableOpacity>
          </View>
        </Camera>
        <Modal transparent={true} visible={open} >
          <View style={styles.contentPhoto}>
            <View style={styles.contentPhotoButton}>
              <TouchableOpacity style={styles.buttonClose} onPress={() => setOpen(false)}>
              <Image style={styles.icon} source={require("../../../assets/close.png")}/>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonConf} onPress={() => props.confirmarEnvio()}>
              <Image style={styles.icon} source={require("../../../assets/certo.png")}/>
              </TouchableOpacity>
            </View>
            <Image style={styles.img} source={{ uri: captured }} />
          </View>
        </Modal>
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  icon:{
  width: "50%",
  height:"50%"
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    width: "100%",
    height: "100%",
  },
  buttonContainer: {
    flex:1,
    backgroundColor: "transparent",
    flexDirection: "row",

  },
  buttonFlip: {
    position:"absolute",
    bottom: 50,
    left: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:"#fff",
    margin: 20,
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  buttonTake: {
    position:"absolute",
    bottom: 50,
    right: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:"#fff",
    margin: 20,
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  contentPhoto:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 10
  },
  img:{
    width: "100%",
    height: "85%",
    top: "10%"
  },
  buttonClose:{
    position:"absolute",
    //(property) justifyContent: "center",
    bottom: -80,
    right: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:"#fff",
    margin: 20,
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  buttonConf:{
    position: "absolute",
    bottom: -80,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:"#fff",
    margin: 20,
    width: 50,
    height: 50,
    borderRadius: 50,
  }
});
