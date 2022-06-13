import React from 'react';
import { Card } from 'react-native-elements';
import { View, TouchableHighlight, Text } from 'react-native';

function GuessColorGame(props) {
  console.log(props.colorArray, props.indexes)

  const checkAnswer = (arr) => props.checkAnswer(arr);
  // style={{ display: 'grid', gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr" }}

  return (
    <Card containerStyle={{ height: "60%" }}>
      <View
        style={{ height: '96%' }}
      >
        {!props.status ? props.indexes.map(i => (
          <TouchableHighlight
            key={i}
            onClick={() => checkAnswer(props.colorArray[i])}
            onPress={() => checkAnswer(props.colorArray[i])}
            style={{ height: '25%' }}
          >
            <View style={{
              width: '100%', height: '100%',
              backgroundColor: props.colorArray[i] ? props.colorArray[i][1] : '#eee'
            }}
            >
            </View>
          </TouchableHighlight>
        ))
          :
          <View style={{ backgroundColor: props.chosenColor[1], height: '100%', width: '100%' }}></View>
        }
      </View>
      <Text>{!props.status ? `Which color is: ${props.chosenColor[0]}` : `${props.chosenColor[0]}`}</Text>
      {/* <Card.Title>{!props.status ? `Which color is: ${props.chosenColor[0]}` : `${props.chosenColor[0]}`}</Card.Title> */}
    </Card >
  )
}

export default GuessColorGame;