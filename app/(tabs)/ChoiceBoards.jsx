import { ScrollView, StyleSheet, Image } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { useRouter } from 'expo-router';

export default function ChoiceBoards() {
    const router = useRouter();
  return (
    //  <ImageBackground
    //   source={require('../../assets/images/choiceBoards/choiceboards-cover.jpg')}
    //   style={styles.background}
    //   resizeMode='cover'
    //   resizeMethod='auto'
    // >
    <ScrollView style={styles.container}>
      <Card style={styles.card} onPress={() => router.push('choiceBoards/ChoiceBoards', { type: 'Clothes' })}>
         <Image source={require('../../assets/images/choiceBoards/clothes.jpg')} style={{ width: '100%', height: 200, borderRadius: 8}} resizeMode='cover' resizeMethod='auto' />
        <Card.Content>
          <Text variant="titleLarge">Clothes</Text>
          <Text variant="bodyMedium">Explore clothing options and preferences.</Text>
        </Card.Content>
      </Card>

      <Card style={styles.card} onPress={() => router.push('choiceBoards/ChoiceBoards', { type: 'RoadSafety' })}>
         <Image source={require('../../assets/images/choiceBoards/roadsafety.jpg')} style={{ width: '100%', height: 200, borderRadius: 8 }} resizeMode='cover' resizeMethod='auto' />
        <Card.Content>
          <Text variant="titleLarge">Road Safety</Text>
          <Text variant="bodyMedium">Learn about safety measures on roads.</Text>
        </Card.Content>
      </Card>

      <Card style={styles.card} onPress={() => router.push('choiceBoards/ChoiceBoards', { type: 'Clothes' })}>
        <Image source={require('../../assets/images/choiceBoards/food.jpg')} style={{ width: '100%', height: 200, borderRadius: 8 }} resizeMode='cover' resizeMethod='auto' />
        <Card.Content>
          <Text variant="titleLarge">Food</Text>
          <Text variant="bodyMedium">Pick your favorite meals and learn healthy eating.</Text>
        </Card.Content>
      </Card>
    </ScrollView>
    // </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  card: {
    marginBottom: 16,
    elevation: 3,
    borderRadius: 12,
    margin:'auto',
    width:300
  },
  image: {
    resizeMode: 'contain',
    borderRadius: 12,
  },
background: {
    flex: 1,
  },
});
