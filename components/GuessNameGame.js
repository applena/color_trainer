import React from 'react';
import { Card } from 'react-native-elements';
import { View, Button } from 'react-native';

function GuessNameGame(props) {
  console.log(props)

  const checkAnswer = (arr) => props.checkAnswer(arr);

  return (
    <Card containerStyle={{ display: 'flex', height: "70%" }}>
      <Card.Title>What is the NAME of this COLOR</Card.Title>
      <View
        style={{
          width: '100%',
          height: '60%',
          alignItems: 'center',
          backgroundColor: props.chosenColor[1] ? props.chosenColor[1] : 'ff000'
        }}
      ></View>
      {props.indexes.map(i => (
        <Button
          onClick={() => checkAnswer(props.colorArray[i])}
          onPress={() => checkAnswer(props.colorArray[i])}
          title={props.colorArray[i] ? props.colorArray[i][0] : ""}
          color={props.status === false ? '#3a3b3c' : props.chosenColor[1] === props.colorArray[i][1] ? '#2e8bc0' : '#a9a9a9'}
          key={i}
        >
        </Button>
      ))}
    </Card>
  )
}

export default GuessNameGame;