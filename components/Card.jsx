
import * as React from "react";
import { Pressable } from "react-native";
import { Card, Text } from "react-native-paper";

const CardView = ({ title,setVisible,state,onPress }) => {
  

  return (
      <Card onPress={() => state?setVisible(state):onPress()} style={{ margin: 10 }}>
        <Card.Content>
          <Text variant="titleLarge">{title}</Text>
        </Card.Content>
      </Card>
  );
};

export default CardView;
