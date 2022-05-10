import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import colorsAF from './assets/colorsAF.json';
import colorsGM from './assets/colorsGM.json';
import colorsNZ from './assets/colorsNZ.json';
import { Card, ListItem, Button, Icon } from 'react-native-elements'

export default function App() {
  const [indexes, setIndexes] = useState([]);
  const allColors = [...colorsAF, ...colorsGM, ...colorsNZ];
  const [chosenColor, setChosenColor] = useState({});
  const [colorMode, setColorMode] = useState(false);
  const [displayColor, setDisplayColor] = useState(false);
  const [gameMode, setGameMode] = useState(false);

  console.log({ displayColor, gameMode })

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

  console.log(allColors[indexes[0]] ? allColors[indexes[0]][0] : '')
  return (
    <View style={styles.container}>
      {!gameMode &&
        <View>
          <Text>Train yourself to recognize the names of colors</Text>

          <Card onClick={() => setGameMode(true)}>
            <Card.Title>Choose the correct NAME</Card.Title>
          </Card>

          <Card onClick={() => { setGameMode(true); setDisplayColor(true); }}>
            <Card.Title>Choose the correct COLOR</Card.Title>
          </Card>
        </View>
      }

      {gameMode &&
        <View>
          {displayColor ?
            <Card>
              {indexes.map(i => (
                <ListItem style={styles.colorBox} key={i}>
                  <Text style={{
                    ...styles.colorBox, width: '200px',
                    backgroundColor: allColors[i] ? allColors[i][1] : '#eee'
                  }}>.</Text>
                </ListItem>
              ))}
              <Card.Title>Which color is: {chosenColor[0]}</Card.Title>
            </Card>
            :
            <Card>
              <Card.Title>What is the NAME of this COLOR</Card.Title>
              <Text style={{ backgroundColor: chosenColor[1] ? chosenColor[1] : '#fff' }}>.</Text>
              {indexes.map(i => (
                <ListItem key={i}>
                  <ListItem.Title>
                    {allColors[i] ? allColors[i][0] : ""}
                  </ListItem.Title>
                </ListItem>
              ))}
            </Card>
          }
        </View>
      }
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
    // height: "200px",
    width: "200px",
    display: 'block'
  }
});
