import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TouchableHighlight } from 'react-native';
import colorsAF from './assets/colorsAF.json';
import colorsGM from './assets/colorsGM.json';
import colorsNZ from './assets/colorsNZ.json';
import { Card, ListItem } from 'react-native-elements';
import style from './App.module.css';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  const [firstGuess, setFirstGuess] = useState(true);

  useEffect(() => {
    getNewColor();
    getScore();
  }, [])

  const getNewColor = () => {
    setFirstGuess(true);
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
    if (answer[0] === chosenColor[0]) {
      if (firstGuess) {
        let tempScore = score + 1;
        setScore(tempScore);
        saveScore(tempScore);
      }
      setStatus('correct');
      setTimeout(function () { getNewColor(); }, 1000);
    } else {
      setFirstGuess(false);
      setStatus('incorrect');
    }
  }

  const saveScore = async (playerScore) => {
    try {
      const stringScore = JSON.stringify(playerScore);
      await AsyncStorage.setItem('score', stringScore);
      console.log('successfully stored score', stringScore)
    } catch (e) {
      console.error('ERROR saving score', e);
    }
  }

  const getScore = async () => {
    try {
      const value = await AsyncStorage.getItem('score')
      if (value !== null) {
        let tempScore = JSON.parse(value);
        setScore(tempScore);
      }
    } catch (e) {
      console.error('ERROR getting score', e);
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
              onClick={() => {
                setGameMode(true);
                setDisplayColor(true);
              }
              }
              onPress={() => {
                setGameMode(true);
                setDisplayColor(true);
              }
              }
              title="Choose the correct COLOR"
            >
            </Button>
          </Card>
        </View>
      }

      {gameMode &&
        <View>
          <Text>{status} Your Score is: {score}</Text>
          {displayColor ?
            <Card containerStyle={{ display: 'flex' }}>
              {indexes.map(i => (
                <TouchableHighlight
                  key={i}
                  onClick={() => checkAnswer(allColors[i])}
                  onPress={() => checkAnswer(allColors[i])}
                >
                  <Text style={{
                    width: '100px', height: '100px', display: 'inline',
                    backgroundColor: allColors[i] ? allColors[i][1] : '#eee'
                  }}></Text>
                </TouchableHighlight>
              ))}
              <Card.Title>Which color is: {chosenColor[0]}</Card.Title>
            </Card>
            :
            <Card>
              <Card.Title>What is the NAME of this COLOR</Card.Title>
              <Text style={{ width: '100px', height: '100px', display: 'inline', alignItems: 'center', backgroundColor: chosenColor[1] ? chosenColor[1] : '#fff' }}></Text>
              {indexes.map(i => (
                <ListItem key={i}>
                  <TouchableHighlight
                    onClick={() => checkAnswer(allColors[i])}
                    onPress={() => checkAnswer(allColors[i])}
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
  }
});
