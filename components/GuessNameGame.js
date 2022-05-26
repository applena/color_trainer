import React from 'react';
import { Card, ListItem } from 'react-native-elements';
import { Text, TouchableHighlight } from 'react-native';

function GuessNameGame(props) {
  console.log('status', props.status, { props })

  const checkAnswer = (arr) => props.checkAnswer(arr);

  return (
    <Card>
      <Card.Title>What is the NAME of this COLOR</Card.Title>
      <Text style={{ width: '100px', height: '100px', display: 'inline', alignItems: 'center', backgroundColor: props.chosenColor[1] ? props.chosenColor[1] : 'ff0000' }}></Text>
      {props.indexes.map(i => (
        <ListItem
          key={i}
          // containerStyle={{ backgroundColor: props.status === 'correct' ? '#00ff00' : props.status === 'incorrect' ? '#8e1600' : '#fff' }}
          containerStyle={{ backgroundColor: props.status === false ? '#fff' : props.chosenColor[1] === props.colorArray[i][1] ? '#00ff00' : '#8e1600' }}
        >
          <TouchableHighlight
            onClick={() => checkAnswer(props.colorArray[i])}
            onPress={() => checkAnswer(props.colorArray[i])}
          // underlayColor={props.status === 'correct' ? '#00ff00' : props.status === 'incorrect' ? '#8e1600' : '#fff'}
          >
            <Text>{props.colorArray[i] ? props.colorArray[i][0] : ""}</Text>
          </TouchableHighlight>
        </ListItem>
      ))}
    </Card>
  )
}

export default GuessNameGame;