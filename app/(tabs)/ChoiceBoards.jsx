import { View, Text, StyleSheet } from 'react-native';
import CardView from '../../components/Card';
import { PaperProvider } from 'react-native-paper';
import ImageSliderModal from '../../components/ImageSliderModal';
import { useState } from 'react';
import { useRouter } from "expo-router";
export default function ChoiceBoardsScreen() {
   const [visible, setVisible] = useState(false);
   const router = useRouter();
  return (
    <PaperProvider>
       <ImageSliderModal
        visible={visible}
        onDismissed={() => setVisible(false)}
      />
    <View style={styles.container}>
      <CardView title="Choice Boards"  setVisible = {setVisible} state={true} style={{ width: '100%' }}/>
      <CardView title="Choices Test" setVisible = {setVisible} state={false} style={{ width: '100%' }} onPress={() => router.push("/quiz/QuizView")} />
    </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    gap: 10,
  },
  text: {
    fontSize: 24,
  },
});