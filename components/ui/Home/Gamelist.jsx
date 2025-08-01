import { Ionicons } from '@expo/vector-icons';
import { Animated, Dimensions, PanResponder, Text, TouchableOpacity, View } from 'react-native';

// Custom horizontal scrolling implementation that bypasses potential gesture conflicts
export default function GameList() {
  // Create animated value for horizontal position
  const scrollX = new Animated.Value(0);
  const { width } = Dimensions.get('window');
  
  // Game data
  const games = [
    { id: '1', title: 'Picture Quiz', icon: 'images-outline', color: 'bg-purple-300', iconColor: 'bg-purple-400' },
    { id: '2', title: 'Sorting Game', icon: 'swap-horizontal-outline', color: 'bg-yellow-300', iconColor: 'bg-yellow-400' },
    { id: '3', title: 'Emotion Game', icon: 'happy-outline', color: 'bg-blue-300', iconColor: 'bg-blue-400' },
  ];

  // Create pan responder to handle horizontal swipes
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: (_, gestureState) => {
      // Only respond to horizontal gestures
      return Math.abs(gestureState.dx) > Math.abs(gestureState.dy);
    },
    onPanResponderGrant: () => {
      scrollX.setOffset(scrollX._value);
    },
    onPanResponderMove: (_, gestureState) => {
      scrollX.setValue(gestureState.dx);
    },
    onPanResponderRelease: () => {
      scrollX.flattenOffset();
    }
  });

  // Game card component
  const GameCard = ({ title, icon, color, iconColor, onPress }) => (
    <TouchableOpacity
      className={`rounded-3xl p-4 justify-between mr-4 ${color}`}
      onPress={onPress}
      style={{
        width: 160,
        height: 160,
        flexShrink: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      }}
    >
      <View className={`w-10 h-10 rounded-full justify-center items-center ${iconColor}`}>
        <Ionicons name={icon} size={24} color="white" />
      </View>
      <Text className="text-black text-lg font-bold">{title}</Text>
    </TouchableOpacity>
  );

  return (
    <View className="mt-6 px-5">
      <Text className="text-2xl font-bold text-gray-800 mb-4">Let's Play!</Text>
      
      {/* Container with fixed height and overflow visible */}
      <View style={{ height: 180, overflow: 'visible' }}>
        {/* Non-scrollable View with absolute positioning and manual transformation */}
        <Animated.View
          {...panResponder.panHandlers}
          style={{
            flexDirection: 'row',
            position: 'absolute',
            transform: [{ translateX: scrollX }],
            height: 160,
            alignItems: 'center',
          }}
        >
          {games.map(game => (
            <GameCard
              key={game.id}
              title={game.title}
              icon={game.icon}
              color={game.color}
              iconColor={game.iconColor}
              onPress={() => console.log(`${game.title} pressed`)}
            />
          ))}
        </Animated.View>
      </View>
    </View>
  );
}