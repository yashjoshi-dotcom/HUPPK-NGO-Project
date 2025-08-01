import { ScrollView, StyleSheet, Image, View, TouchableOpacity, Linking, Text as RNText } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useThemeContext'; // Adjust path if needed

export default function ChoiceBoards() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme ? useTheme() : { theme: { mode: 'normal' }, toggleTheme: () => {} };

  const handleIQTestPress = () => {
    Linking.openURL('https://example.com/iq-test');
  };

  const handleEmotionTestPress = () => {
    router.push('EmotionalChoices');
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* Refined Header Section */}
      <View style={styles.headerContainer}>
        <View style={styles.headerLeft}>
          <TouchableOpacity 
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Learning Zone</Text>
        </View>
        
        <TouchableOpacity
          onPress={toggleTheme}
          style={styles.headphoneButton}
        >
          <Ionicons
            name={theme?.mode === 'calming' ? 'headset' : 'headset-outline'}
            size={22}
            color="white"
          />
        </TouchableOpacity>
      </View>

      {/* Fixed IQ Box */}
      <View style={styles.fixedBox}>
        {/* IQ Box */}
        <TouchableOpacity onPress={handleIQTestPress} activeOpacity={0.9}>
          <View style={styles.iqBox}>
            <RNText style={styles.bulbIcon}>💡</RNText>
            <RNText style={styles.bigText}>IQ Points 🧠</RNText>
            <RNText style={styles.bottomText}>Take Your Free IQ Test Now!!!</RNText>
          </View>
        </TouchableOpacity>

        {/* Emotion Box */}
        <TouchableOpacity onPress={handleEmotionTestPress} activeOpacity={0.9} style={{ marginTop: 16 }}>
          <View style={[styles.iqBox, { backgroundColor: '#ffd6e0' }]}>
            <RNText style={styles.heartIcon}>❤️</RNText>
            <RNText style={styles.bigText}>Emotional Help 😊</RNText>
            <RNText style={styles.bottomText}>Discover Your Emotions Now!</RNText>
          </View>
        </TouchableOpacity>
        <Text style={styles.sectionTitle}>Choice boards</Text>
      </View>

      {/* Scrollable Content */}
      <ScrollView style={styles.scrollContainer} contentContainerStyle={{ paddingTop: 310 }}>
        <Card style={styles.card} onPress={() => router.push('choiceBoards/ChoiceBoards', { type: 'Clothes' })}>
          <Image
            source={require('../../assets/images/choiceBoards/clothes.jpg')}
            style={{ width: '100%', height: 200, borderRadius: 8 }}
            resizeMode="cover"
          />
          <Card.Content>
            <Text variant="titleLarge">Clothes</Text>
            <Text variant="bodyMedium">Explore clothing options and preferences.</Text>
          </Card.Content>
        </Card>

        <Card style={styles.card} onPress={() => router.push('choiceBoards/ChoiceBoards', { type: 'RoadSafety' })}>
          <Image
            source={require('../../assets/images/choiceBoards/roadsafety.jpg')}
            style={{ width: '100%', height: 200, borderRadius: 8 }}
            resizeMode="cover"
          />
          <Card.Content>
            <Text variant="titleLarge">Road Safety</Text>
            <Text variant="bodyMedium">Learn about safety measures on roads.</Text>
          </Card.Content>
        </Card>

        <Card style={styles.card} onPress={() => router.push('choiceBoards/ChoiceBoards', { type: 'Food' })}>
          <Image
            source={require('../../assets/images/choiceBoards/food.jpg')}
            style={{ width: '100%', height: 200, borderRadius: 8 }}
            resizeMode="cover"
          />
          <Card.Content>
            <Text variant="titleLarge">Food</Text>
            <Text variant="bodyMedium">Pick your favorite meals and learn healthy eating.</Text>
          </Card.Content>
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  // Updated header styles
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 8, 
    paddingBottom: 8,
    backgroundColor: 'white',
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    zIndex: 20,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    padding: 4,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  headphoneButton: {
    width: 35,
    height: 35,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CBD5E1',
  },
  
  // Existing styles with adjustments
  scrollContainer: {
    flex: 1,
    padding: 10,    
    marginBottom: 70,
  },
  card: {
    marginBottom: 16,
    elevation: 3,
    borderRadius: 12,
    alignSelf: 'center',
    width: 300,
  },
  image: {
    resizeMode: 'cover',
    borderRadius: 12,
  },
  fixedBox: {
    position: 'absolute',
    top: 60, // Increased from 60 to add space after header
    paddingTop: 15, // Added additional padding at the top
    zIndex: 10,
    width: '100%',
    backgroundColor: 'white',
  },
  iqBox: {
    backgroundColor: '#b2f07f',
    borderRadius: 20,
    paddingVertical: 24,
    paddingHorizontal: 28,
    alignItems: 'flex-start',
    justifyContent: 'center',
    position: 'relative',
    marginHorizontal: 20,
    // iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    // Android elevation
    elevation: 25,
  },
  bulbIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    fontSize: 60,
  },
  heartIcon: {
    position: 'absolute',
    top: 20,
    right: 15,
    fontSize: 50,
  },
  bigText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2a2a2a',
    marginBottom: 4,
  },
  bottomText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2a2a2a',
  },
  sectionTitle: {
    color: 'black',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 25,
    marginBottom: 15,
  },
});