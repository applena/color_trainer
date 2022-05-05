import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import colorsAF from './assets/colorsAF.json';
import colorsGM from './assets/colorsGM.json';
import colorsNZ from './assets/colorsNZ.json';

export default function App() {
  const [indexes, setIndexes] = useState([]);
  const [hexColors, setHexColors] = useState([]);
  const allColors = [...colorsAF, ...colorsGM, ...colorsNZ];

  useEffect(() => {
    let tempArray = [];
    for (let i = 0; i < 4; i++) {
      let index = Math.floor(Math.random() * allColors.length);
      if (tempArray.includes(index)) { i--; continue; }
      tempArray.push(index);
    }
    setIndexes(tempArray);

    const hexArray = tempArray.map(arr => arr[1]);
    setHexColors(hexArray);
  }, [])

  return (
    <View style={styles.container}>
      <Text>Train yourself to recognize the names of colors</Text>
      <Text style={styles.colorBox}></Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  colorBox: {
    height: "20px",
    width: "20px",
    color: hexColors[0]
  }
});
