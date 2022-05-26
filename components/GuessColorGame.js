import React from 'react';
import { Card } from 'react-native-elements';
import { Text, TouchableHighlight } from 'react-native';

function GuessColorGame(props) {

  const checkAnswer = (arr) => props.checkAnswer(arr);

  return (
    <Card containerStyle={{ display: 'flex' }}>
      {props.indexes.map(i => (
        <TouchableHighlight
          key={i}
          onClick={() => checkAnswer(props.colorArray[i])}
          onPress={() => checkAnswer(props.colorArray[i])}
        >
          <Text style={{
            width: '100px', height: '100px', display: 'inline',
            backgroundColor: props.colorArray[i] ? props.colorArray[i][1] : '#eee'
          }}></Text>
        </TouchableHighlight>
      ))}
      <Card.Title>Which color is: {props.chosenColor[0]}</Card.Title>
    </Card>
  )
}

export default GuessColorGame;