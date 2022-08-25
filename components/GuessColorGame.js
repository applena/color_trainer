import React from 'react';
import { Card } from 'react-native-elements';
import { View, TouchableHighlight, Text, StyleSheet } from 'react-native';

function GuessColorGame(props) {
  console.log(props.colorArray, props.indexes)

  const checkAnswer = (arr) => props.checkAnswer(arr);
  const styles = StyleSheet.create({
    header: {
      fontWeight: 'bold',
      textAlign: 'center',
      padding: '3%',
      fontSize: 20
    }
  });

  return (
    <Card containerStyle={{ height: "70%" }}>
      <View
        style={{ height: '90%', minWidth: '100%', overflow: 'scroll' }}
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
      <Text style={styles.header}>{!props.status ? `Which color is: ${props.chosenColor[0]}` : `${props.chosenColor[0]}`}</Text>
    </Card >
  )
}

export default GuessColorGame;