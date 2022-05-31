import React from 'react';
import { Card } from 'react-native-elements';
import { View, TouchableHighlight } from 'react-native';

function GuessColorGame(props) {

  const checkAnswer = (arr) => props.checkAnswer(arr);

  return (
    <Card containerStyle={{ display: 'flex', height: "100%" }}>
      {!props.status ? props.indexes.map(i => (
        <TouchableHighlight
          key={i}
          onClick={() => checkAnswer(props.colorArray[i])}
          onPress={() => checkAnswer(props.colorArray[i])}
          style={{ width: '50%', height: '100%' }}
        >
          <View style={{
            width: '50%', height: '80%',
            backgroundColor: props.colorArray[i] ? props.colorArray[i][1] : '#eee'
          }}
          >
          </View>
        </TouchableHighlight>
      ))
        :
        <View style={{ backgroundColor: props.chosenColor[1], height: '30%', width: '50%' }}></View>
      }
      <Card.Title>Which color is: {props.chosenColor[0]}</Card.Title>
    </Card>
  )
}

export default GuessColorGame;