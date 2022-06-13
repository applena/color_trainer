import React from 'react';
import { Card, ListItem } from 'react-native-elements';
import { Text, View, Button } from 'react-native';
import { color } from 'react-native-elements/dist/helpers';

function GuessNameGame(props) {

  const checkAnswer = (arr) => props.checkAnswer(arr);

  return (
    <Card containerStyle={{ display: 'flex', height: "60%" }}>
      <Card.Title>What is the NAME of this COLOR</Card.Title>
      <View
        style={{
          width: '100%',
          height: '20%',
          alignItems: 'center',
          backgroundColor: props.chosenColor[1] ? props.chosenColor[1] : 'ff0000'
        }}
      ></View>
      {props.indexes.map(i => (
        <Button
          onClick={() => checkAnswer(props.colorArray[i])}
          onPress={() => checkAnswer(props.colorArray[i])}
          title={props.colorArray[i] ? props.colorArray[i][0] : ""}
          color={props.status === false ? '#3a3b3c' : props.chosenColor[1] === props.colorArray[i][1] ? '#2e8bc0' : '#a9a9a9'}
          // style={{
          //   borderRadius: '10px',
          //   borderWidth: 'medium',
          //   borderColor: '#eee',
          //   overflow: "hidden",
          //   backgroundColor: 'red'
          // }}
          key={i}
        >
          {/* <ListItem
            containerStyle={{
              backgroundColor: props.status === false ? '#fff' : props.chosenColor[1] === props.colorArray[i][1] ? '#2e8bc0' : '#eee',
              cursor: 'pointer',
              // marginTop: '2%'
            }}
          >
            <Text>{props.colorArray[i] ? props.colorArray[i][0] : ""}</Text>
          </ListItem> */}
        </Button>
      ))}
    </Card>
  )
}

export default GuessNameGame;