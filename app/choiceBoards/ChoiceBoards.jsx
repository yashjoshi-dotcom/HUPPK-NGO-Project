import { PaperProvider } from 'react-native-paper';
import { FoodData,ClothData,roadSafetyData } from '../../constants/QuizData.js';
import {useLocalSearchParams } from 'expo-router';

import ChoiceBoardsView from '../../components/ChoiceBoardsView.jsx';
export default function ChoiceBoardsScreen() {
  const { type } = useLocalSearchParams();
  console.log('ChoiceBoardsScreen type:', type);
  let data = [];
  if(type === 'Clothes') {
    data = ClothData;
  } else if(type === 'Food') {
    data = FoodData;
  } else if(type === 'RoadSafety') {
    data = roadSafetyData;
  }

  
  return (
    <PaperProvider>
    <ChoiceBoardsView data={data}/>
    </PaperProvider>
  );
}
