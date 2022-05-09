import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import colorsAF from './assets/colorsAF.json';
import colorsGM from './assets/colorsGM.json';
import colorsNZ from './assets/colorsNZ.json';

export default function App() {
  const [indexes, setIndexes] = useState([]);
  const allColors = [...colorsAF, ...colorsGM, ...colorsNZ];
  const [chosenColor, setChosenColor] = useState({});

  useEffect(() => {
    let tempArray = [];
    for (let i = 0; i < 4; i++) {
      let index = Math.floor(Math.random() * allColors.length);
      if (tempArray.includes(index)) { i--; continue; }
      tempArray.push(index);
    }
    setIndexes(tempArray);

    let chosenColorIndex = Math.floor(Math.random() * tempArray.length);
    setChosenColor(allColors[tempArray[chosenColorIndex]]);
  }, [])

  return (
    <View style={styles.container}>
      <Text>Train yourself to recognize the names of colors</Text>
      <View style={styles.colorBox}>
        <Text id="banana" style={{ backgroundColor: allColors[indexes[0]] ? allColors[indexes[0]][1] : '#eee' }}>.</Text>
        <Text id="banana" style={{ backgroundColor: allColors[indexes[1]] ? allColors[indexes[1]][1] : '#eee' }}>.</Text>
        <Text id="banana" style={{ backgroundColor: allColors[indexes[2]] ? allColors[indexes[2]][1] : '#eee' }}>.</Text>
        <Text id="banana" style={{ backgroundColor: allColors[indexes[3]] ? allColors[indexes[3]][1] : '#eee' }}>.</Text>
        <Text>Which color is: {chosenColor[0]}</Text>
      </View>
      <StatusBar style="auto" />
    </View >
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
    height: "50px",
    width: "50px",
  }
});
