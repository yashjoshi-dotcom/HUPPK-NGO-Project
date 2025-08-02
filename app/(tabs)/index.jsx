import { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StatusBar, Text, Image,View } from 'react-native';
import { Modal } from 'react-native-paper';
import GameList from '../../components/ui/Home/Gamelist';
import Header from '../../components/ui/Home/Header';
import { useStreak } from '../../hooks/steakContext.js';

export default function HomeScreen() {
  const { pointsStreak, daysStreak,lastLoginDate,updateLastLoginDate,incrementPointsStreak,incrementDaysStreak } = useStreak();
  const [ modelContent, setModelContent] = useState({
    heading: 'Welcome to HUPPK',
    message: '',
  });
  const [ popUpVisible, setPopupVisible] = useState(false);

  const containerStyle = {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 100,
    shadowColor: '#000',
    minHeight: 100,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  }; 
  const today = new Date().toDateString();
  useEffect(() => {
    console.log('Checking lastLoginDate:', lastLoginDate, 'today:', today," daysStreak:", daysStreak, "pointsStreak:", pointsStreak);
    if(lastLoginDate === null && daysStreak===0){
      console.log('No last login date found or daysStreak is 0, setting popup message.');
      setModelContent({
        heading: 'Welcome to HUPPK',
        message: 'You have earned 100 points for starting your streak.',
      });
      setPopupVisible(true);
      incrementPointsStreak(100);
      incrementDaysStreak();
      updateLastLoginDate();
      return;
    } else if ( lastLoginDate!=null && lastLoginDate?.toDateString() !== today) {
      console.log('Last login date is different from today, updating streaks.');
      setModelContent({
        heading: 'Welcome back!',
        message: `You have ${daysStreak || 0} days streak and ${pointsStreak || 0} points.`,
      });
      setPopupVisible(true);
      incrementPointsStreak(100);
      incrementDaysStreak();
      updateLastLoginDate();
      // resetStorage();
    } else {
      console.log('Last login date is today, no popup needed.');
    }
  }, [daysStreak, pointsStreak, lastLoginDate]);


  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="light-content" />
      {/* --- REMOVE nestedScrollEnabled={true} --- */}
      <ScrollView scrollEventThrottle={16}>
        <Header />
        <GameList />
        <Modal visible={popUpVisible} onDismiss={() => setPopupVisible(false)} contentContainerStyle={containerStyle}  >
          {
            modelContent?.heading && <Text className="font-bold text-xl text-blue-600 ">{modelContent.heading}</Text>
          }
          <View className="flex flex-row items-center justify-center gap-2">
            <Text className="text-2xl font-bold text-orange-500 " >{daysStreak} Day Streak</Text>
            <Image source={require('../../assets/images/fire.png')} style={{ width: 30, height: 30 }} />
          </View>
          {
            modelContent?.message && <Text className="text-lg text-gray-700">{modelContent.message}</Text>
          }
        </Modal>
        {/* You can add more sections here later */}
      </ScrollView>
    </SafeAreaView>
  );
}