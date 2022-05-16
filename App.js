import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TouchableHighlight } from 'react-native';
import colorsAF from './assets/colorsAF.json';
import colorsGM from './assets/colorsGM.json';
import colorsNZ from './assets/colorsNZ.json';
import { Card, ListItem } from 'react-native-elements';
import style from './App.module.css';

console.log({ style })
// import AppStyles from './App.scss';

// console.log({ AppStyles })

export default function App() {
  const [indexes, setIndexes] = useState([]);
  const allColors = [...colorsAF, ...colorsGM, ...colorsNZ];
  const [chosenColor, setChosenColor] = useState({});
  const [displayColor, setDisplayColor] = useState(false);
  const [gameMode, setGameMode] = useState(false);
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState('incorrect');

  console.log({ displayColor, gameMode })

  useEffect(() => {
    getNewColor();
  }, [])

  const getNewColor = () => {
    let tempArray = [];
    for (let i = 0; i < 4; i++) {
      let index = Math.floor(Math.random() * allColors.length);
      if (tempArray.includes(index)) { i--; continue; }
      tempArray.push(index);
    }
    setIndexes(tempArray);

    let chosenColorIndex = Math.floor(Math.random() * tempArray.length);
    setChosenColor(allColors[tempArray[chosenColorIndex]]);
    setStatus('');
  }

  const checkAnswer = (answer) => {
    console.log({ answer, chosenColor });
    if (answer[0] === chosenColor[0]) {
      console.log('correct');
      setStatus('correct');
      setTimeout(function () { getNewColor(); }, 1000);
    } else {
      console.log('wrong');
      setStatus('incorrect');
    }
  }

  return (
    <View style={styles.container}>
      {!gameMode &&
        <View>
          <Text>Train yourself to recognize the names of colors</Text>

          <Card>
            <Button
              onClick={() => setGameMode(true)} onPress={() => setGameMode(true)}
              title='Choose the correct NAME'
            >
            </Button>
          </Card>

          <Card>
            <Button
              onClick={() => { setGameMode(true); setDisplayColor(true); }} onPress={() => { setGameMode(true); setDisplayColor(true); }}
              title="Choose the correct COLOR"
            >
            </Button>
          </Card>
        </View>
      }

      {gameMode &&
        <View>
          <Text>{status}</Text>
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
                  <TouchableHighlight
                    onClick={() => checkAnswer(allColors[i])} onPress={() => checkAnswer(allColors[i])}
                  >
                    <Text>{allColors[i] ? allColors[i][0] : ""}</Text>
                  </TouchableHighlight>
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
