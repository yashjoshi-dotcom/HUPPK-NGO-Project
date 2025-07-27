import { View, StyleSheet,Text } from 'react-native';
import { useTheme } from '../../hooks';
import { Home } from '../../components/ui/Home/home';

export default function HomeScreen() {
  const { theme } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Home />
         <Text className="text-xl font-bold text-blue-500">
        Welcome to Nativewind! You can now use Tailwind CSS classes in your React Native components.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});