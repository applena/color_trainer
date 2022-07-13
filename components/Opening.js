import React from 'react';
import { Card } from 'react-native-elements';
import { View, Button, Text } from 'react-native';

function Opening(props) {
  const setGameMode = (bool) => props.setGameMode(bool);
  const setDisplayColor = (bool) => props.setDisplayColor(bool);

  return (
    <View>
      <Text>Train yourself to recognize the names of colors</Text>
      <Card>
        <Button
          onPress={() => setGameMode(true)}
          title='Choose the correct NAME'
        >
        </Button>
      </Card>

      <Card>
        <Button
          onPress={() => {
            setGameMode(true);
            setDisplayColor(true);
          }
          }
          title="Choose the correct COLOR"
        >
        </Button>
      </Card>
    </View>
  )
}

export default Opening;