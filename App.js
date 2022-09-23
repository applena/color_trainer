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
  // console.log('APP')

  const allColors = newPantoneColors;
  const [colorArray, setColorArray] = useState(newPantoneColors);
  const [indexes, setIndexes] = useState([]);
  const [chosenColor, setChosenColor] = useState([]);
  const [displayColor, setDisplayColor] = useState(false);
  const [gameMode, setGameMode] = useState(false);
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState(false);
  const [colorsReady, setColorsReady] = useState(false);
  const [incorrectAnswers, setIncorrectAnswers] = useState([]);
  const [mistakeMode, setMistakeMode] = useState(false);
  const [mistakes, setMistakes] = useState('no mistakes so far!');

  useEffect(() => {
    getNewColor();
    getFromLS('score');
    const misses = getFromLS('wrongGuesses');
    !misses ? setMistakes('no mistakes so far!') : setMistakes('Reivew Mistakes');
  }, [])

  const getNewColor = (array = allColors) => {
    console.log('getNewColor', array, array.length)
    setColorsReady(false);
    setStatus(false);

    let tempArray = [];
    for (let i = 0; i < 4; i++) {
      let index = Math.floor(Math.random() * array.length);
      if (tempArray.includes(index)) { i--; continue; }
      tempArray.push(index);
    }

    if (!mistakeMode) {

      const pickedColors = tempArray.map(index => {
        return array[index];
      })
      // console.log({ pickedColors })

      pickChosenColor(pickedColors);
    } else {
      tempArray.pop();
      tempArray.push(pickChosenColor(array));
    }

    setIndexes(tempArray);
    // console.log({ tempArray })
  }

  const pickChosenColor = (array) => {
    console.log('in pickChosenColor', array)
    let chosenColorIndex = Math.floor(Math.random() * array.length);
    // console.log('chosen color', array[chosenColorIndex]);

    setChosenColor(array[chosenColorIndex]);
    setStatus(false);
    setColorsReady(true);

    return array[chosenColorIndex];
  }

  const checkAnswer = (answer) => {
    if (!answer) return;
    console.log({ answer, chosenColor })
    const duplicateAnswer = incorrectAnswers.find(wrongAnswer => answer === wrongAnswer);

    // if answer is correct
    if (answer[0] === chosenColor[0]) {
      let tempScore = score + 1;
      setScore(tempScore);
      saveToLS('score', tempScore);
      setStatus('correct');

      const newIncorrectAnswers = incorrectAnswers.filter(answer => answer[0] !== chosenColor[0]);

      console.log('correct answer', { newIncorrectAnswers, incorrectAnswers });

      // remove duplicate answers from our inocrrect array
      duplicateAnswer ? setIncorrectAnswers(newIncorrectAnswers) : '';

      // update the colorarray
      mistakeMode ? setColorArray(newIncorrectAnswers) : setColorArray(newPantoneColors);

    } else {
      // if answer is incorrect
      setStatus('incorrect');

      !mistakeMode ? setMistakes('Reivew Mistakes') : setMistakes('view all colors');

      if (!duplicateAnswer) {
        const wrongGusses = [...incorrectAnswers, chosenColor];
        console.log({ wrongGusses })
        setIncorrectAnswers(wrongGusses);
        saveToLS('wrongGuesses', wrongGusses);
      }
    }
    setTimeout(function () { getNewColor(colorArray); }, 2000);
  }

  const displayMissedColors = () => {
    console.log({ incorrectAnswers })
    if (!incorrectAnswers.length) { setMistakes('no mistakes yet'); return; }
    setColorArray(incorrectAnswers);
    getNewColor(incorrectAnswers);
    setMistakeMode(true);
  }

  const displayAllColors = () => {
    getNewColor();
    setMistakeMode(false);
    setColorArray(newPantoneColors);
  }

  const saveToLS = async (key, value) => {
    try {
      const stringValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, stringValue);
      // console.log(`saving ${key} ${value} to LS`)
    } catch (e) {
      console.error('ERROR saving to LS', e);
    }
  }

  const getFromLS = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        let tempValue = JSON.parse(value);
        if (key === 'score') setScore(tempValue);
        if (key === 'wrongGuesses') setIncorrectAnswers(tempValue);
      }
      return value;
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
          <View style={{ display: 'felx', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text>{status} Score: {score}</Text>
            {!mistakeMode ?
              <Text onPress={displayMissedColors}>{mistakes}</Text>
              :
              <Text onPress={displayAllColors}>View All Colors</Text>
            }
          </View>
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
    textAlign: 'center',
    width: '100%'
  }
});
