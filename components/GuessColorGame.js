import React from 'react';
import { Card } from 'react-native-elements';
import { Text, TouchableHighlight } from 'react-native';

function GuessColorGame(props) {

  const checkAnswer = (arr) => props.checkAnswer(arr);

  return (
    <Card containerStyle={{ display: 'flex' }}>
      {!props.status ? props.indexes.map(i => (
        <TouchableHighlight
          key={i}
          onClick={() => checkAnswer(props.colorArray[i])}
          onPress={() => checkAnswer(props.colorArray[i])}
          style={{ width: '100px', height: '100px' }}
        >
          <Text style={{
            width: '100px', height: '100px',
            backgroundColor: props.colorArray[i] ? props.colorArray[i][1] : '#eee'
          }}></Text>
        </TouchableHighlight>
      ))
        :
        <div style={{ backgroundColor: props.chosenColor[1], height: '100px', width: '100px' }}></div>
      }
      <Card.Title>Which color is: {props.chosenColor[0]}</Card.Title>
    </Card>
  )
}

export default GuessColorGame;