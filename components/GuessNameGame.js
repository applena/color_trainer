import React from 'react';
import { Card, ListItem } from 'react-native-elements';
import { Text, TouchableHighlight, View } from 'react-native';

function GuessNameGame(props) {

  const checkAnswer = (arr) => props.checkAnswer(arr);

  return (
    <Card containerStyle={{ display: 'flex', height: "90%" }}>
      <Card.Title>What is the NAME of this COLOR</Card.Title>
      <View
        style={{
          width: '50%',
          height: '40%',
          alignItems: 'center',
          backgroundColor: props.chosenColor[1] ? props.chosenColor[1] : 'ff0000'
        }}
      ></View>
      {props.indexes.map(i => (
        <TouchableHighlight
          onClick={() => checkAnswer(props.colorArray[i])}
          onPress={() => checkAnswer(props.colorArray[i])}
        >
          <ListItem
            key={i}
            containerStyle={{
              backgroundColor: props.status === false ? '#fff' : props.chosenColor[1] === props.colorArray[i][1] ? '#2e8bc0' : '#eee',
              borderRadius: '10px',
              border: '1px solid #2e8bc0',
              cursor: 'pointer',
              marginTop: '5px'
            }}
          >
            <Text>{props.colorArray[i] ? props.colorArray[i][0] : ""}</Text>
          </ListItem>
        </TouchableHighlight>
      ))}
    </Card>
  )
}

export default GuessNameGame;