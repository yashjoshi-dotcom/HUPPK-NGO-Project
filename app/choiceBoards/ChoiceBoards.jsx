import { PaperProvider } from 'react-native-paper';
import { quizData } from '../../constants/QuizData.js';

import ChoiceBoardsView from '../../components/ChoiceBoardsView.jsx';
export default function ChoiceBoardsScreen() {
  
  return (
    <PaperProvider>
    <ChoiceBoardsView data={quizData}/>
    </PaperProvider>
  );
}
