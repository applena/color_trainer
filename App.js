import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import pantoneColors from './assets/pantoneColors.json';
import { Card } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropdownLevelPicker from './components/DropdownLevelPicker';
import GuessColorGame from './components/GuessColorGame';
import GuessNameGame from './components/GuessNameGame';
import Opening from './components/Opening';

let newPantoneColors = pantoneColors.map(color => color[0].split(","))
newPantoneColors = newPantoneColors.map(color => [color[0], color[1].substring(0, 7)]);

export default function App() {
  console.log('APP')

  const allColors = newPantoneColors;
  const [colorArray, setColorArray] = useState(newPantoneColors);
  const [indexes, setIndexes] = useState([]);
  const [chosenColor, setChosenColor] = useState([]);
  const [displayColor, setDisplayColor] = useState(false);
  const [gameMode, setGameMode] = useState(false);
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState(false);
  const [colorsReady, setColorsReady] = useState(false);

  useEffect(() => {
    getNewColor();
    getScore();
  }, [])

  const getNewColor = (array = allColors) => {
    // console.log('getNewColor', array, array.length)
    setColorsReady(false);
    setStatus(false);
    let tempArray = [];
    for (let i = 0; i < 4; i++) {
      let index = Math.floor(Math.random() * array.length);
      // console.log('in the for loop with ', i, index)
      if (tempArray.includes(index)) { i--; continue; }
      tempArray.push(index);
    }
    setIndexes(tempArray);

    const pickedColors = tempArray.map(index => {
      return array[index];
    })

    // console.log({ pickedColors })

    pickChosenColor(pickedColors);
  }

  const setNewLevel = (level) => {
    if (level === 'Expert') {
      setExpertLevel();
    } else {
      getNewColor(colorArray);
    }
  }

  const pickChosenColor = (array) => {
    // console.log('in pickChosenColor', array)
    let chosenColorIndex = Math.floor(Math.random() * array.length);
    // console.log('chosen color', array[chosenColorIndex]);
    setChosenColor(array[chosenColorIndex]);
    setStatus(false);
    setColorsReady(true);
  }

  const setExpertLevel = () => {
    const sortedArray = allColors.sort((a, b) => a[2] > b[2] ? 1 : -1);
    const groupedSortedArray = [];
    let counter = 0;
    let tempArr = [];

    // group colors in shades of 50
    sortedArray.forEach(color => {
      tempArr.push(color);
      counter++;
      if (counter === 50) {
        groupedSortedArray.push(tempArr);
        counter = 0;
        tempArr = [];
      }
    })

    let index = Math.floor(Math.random() * groupedSortedArray.length);
    setColorArray(groupedSortedArray[index]);
    getNewColor(groupedSortedArray[index]);
  }

  const checkAnswer = (answer) => {
    if (answer[0] === chosenColor[0]) {
      let tempScore = score + 1;
      setScore(tempScore);
      saveScore(tempScore);
      setStatus('correct');
    } else {
      setStatus('incorrect');
    }
    setTimeout(function () { getNewColor(colorArray); }, 2000);
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
      {!gameMode ?
        <Opening
          setGameMode={setGameMode}
          setDisplayColor={setDisplayColor}
        />
        :
        colorsReady &&
        <View>
          <Text>{status} Score: {score}</Text>
          <DropdownLevelPicker
            setNewLevel={setNewLevel}
          />
          {displayColor ?
            <GuessColorGame
              indexes={indexes}
              colorArray={colorArray}
              chosenColor={chosenColor}
              checkAnswer={checkAnswer}
              status={status}
            />
            :
            <GuessNameGame
              indexes={indexes}
              chosenColor={chosenColor}
              checkAnswer={checkAnswer}
              colorArray={colorArray}
              status={status}
            />
          }
          <Card>
            <Button
              onPress={() => {
                displayColor ? setDisplayColor(false) : setDisplayColor(true);
              }
              }
              title="Switch Games"
            >
            </Button>
          </Card>
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
