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
  console.log('rendering APP', hexColors)

  useEffect(() => {
    let tempArray = [];
    for (let i = 0; i < 4; i++) {
      let index = Math.floor(Math.random() * allColors.length);
      if (tempArray.includes(index)) { i--; continue; }
      tempArray.push(index);
    }
    setIndexes(tempArray);

    const hexArray = tempArray.map(index => allColors[index][1]);
    setHexColors(hexArray);
    console.log({ hexArray })
  }, [])

  return (
    <View style={styles.container}>
      <Text>Train yourself to recognize the names of colors</Text>
      <View style={styles.colorBox}>
        <Text id="banana" style={{ backgroundColor: hexColors[0] ? hexColors[0] : '#eee' }}>.</Text>
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
