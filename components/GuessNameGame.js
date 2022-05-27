import React from 'react';
import { Card, ListItem } from 'react-native-elements';
import { Text, TouchableHighlight } from 'react-native';

function GuessNameGame(props) {

  const checkAnswer = (arr) => props.checkAnswer(arr);

  return (
    <Card>
      <Card.Title>What is the NAME of this COLOR</Card.Title>
      <Text style={{ width: '50%', height: '30%', alignItems: 'center', backgroundColor: props.chosenColor[1] ? props.chosenColor[1] : 'ff0000' }}></Text>
      {props.indexes.map(i => (
        <ListItem
          key={i}
          containerStyle={{
            backgroundColor: props.status === false ? '#fff' : props.chosenColor[1] === props.colorArray[i][1] ? '#028a0f' : '#8e1600',
            borderRadius: '10px'
          }}
        >
          <TouchableHighlight
            onClick={() => checkAnswer(props.colorArray[i])}
            onPress={() => checkAnswer(props.colorArray[i])}
          >
            <Text>{props.colorArray[i] ? props.colorArray[i][0] : ""}</Text>
          </TouchableHighlight>
        </ListItem>
      ))}
    </Card>
  )
}

export default GuessNameGame;