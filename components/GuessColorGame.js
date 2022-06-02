import React from 'react';
import { Card } from 'react-native-elements';
import { View, TouchableHighlight } from 'react-native';

function GuessColorGame(props) {
  console.log(props.colorArray, props.indexes)

  const checkAnswer = (arr) => props.checkAnswer(arr);

  return (
    <Card containerStyle={{ height: "60%" }}>
      <View style={{ display: 'grid', gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr" }}>
        {!props.status ? props.indexes.map(i => (
          <TouchableHighlight
            key={i}
            onClick={() => checkAnswer(props.colorArray[i])}
            onPress={() => checkAnswer(props.colorArray[i])}
          >
            <View style={{
              width: '100%', height: '20%',
              backgroundColor: props.colorArray[i] ? props.colorArray[i][1] : '#eee'
            }}
            >
            </View>
          </TouchableHighlight>
        ))
          :
          <View style={{ backgroundColor: props.chosenColor[1], height: '30%', width: '50%' }}></View>
        }
      </View>
      <Card.Title>{!props.status ? `Which color is: ${props.chosenColor[0]}` : `${props.chosenColor[0]}`}</Card.Title>
    </Card >
  )
}

export default GuessColorGame;