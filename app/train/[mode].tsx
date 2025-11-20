import * as Haptics from 'expo-haptics'; // Install this if needed, or comment it out
import { Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import NumPad from '../../components/NumPad';
import { COLORS } from '../../constants/theme';
import { generateQuestion } from '../../utils/gameLogic';

export default function GameScreen() {
  const { mode, difficulty } = useLocalSearchParams();
  
  // GAME STATE
  const [question, setQuestion] = useState({ text: '...', answer: 0 });
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  
  // FEEDBACK STATE (For colors)
  const [statusColor, setStatusColor] = useState(COLORS.background); 

  // 1. Load the first question when screen opens
  useEffect(() => {
    newQuestion();
  }, []);

  const newQuestion = () => {
    // 2. Pass the actual difficulty instead of hardcoded 'medium'
    // Default to 'medium' if undefined
    const diffLevel = difficulty || 'medium'; 
    const q = generateQuestion(mode, diffLevel); 
    
    setQuestion(q);
    setInput("");
    setStatusColor(COLORS.background);
  };

  const handlePress = (val) => {
    if (val === 'DEL') {
      setInput(prev => prev.slice(0, -1));
    } 
    else if (val === 'ENTER') {
      checkAnswer();
    } 
    else {
      // Prevent typing too many digits (max 6)
      if (input.length < 6) setInput(prev => prev + val);
    }
  };

  const checkAnswer = () => {
    const userNum = parseInt(input);

    if (userNum === question.answer) {
      // CORRECT!
      setScore(s => s + 1);
      setStatusColor(COLORS.success + '33'); // Add transparency (hex 33) for a light tint
      
      // Optional: Vibration (Run `npx expo install expo-haptics` if this crashes)
      try { Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success); } catch(e){}

      // Wait 200ms so user sees the result, then next question
      setTimeout(newQuestion, 200);
    } else {
      // WRONG!
      setStatusColor(COLORS.error + '33'); // Light red
      try { Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error); } catch(e){}
      
      // Clear input so they can try again? Or allow retry? 
      // Let's clear it for now.
      setInput("");
      setTimeout(() => setStatusColor(COLORS.background), 500);
    }
  };

  return (
    // The background color changes based on Correct/Wrong status
    <View style={[styles.container, { backgroundColor: statusColor }]}>
      <Stack.Screen options={{ 
        title: mode?.toString().toUpperCase(),
        headerRight: () => <Text style={styles.score}>Score: {score}</Text> 
      }} />

      {/* Question Area */}
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>{question.text}</Text>
        <View style={styles.inputLine}>
            <Text style={styles.inputText}>{input}</Text>
            {/* Blinking cursor simulation (optional char) */}
            <Text style={[styles.inputText, {color: COLORS.primary}]}>|</Text>
        </View>
      </View>

      {/* Keypad Area */}
      <View style={styles.padContainer}>
        <NumPad onPress={handlePress} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  score: { fontSize: 18, fontWeight: 'bold', color: '#fff', marginRight: 10 },
  
  questionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionText: { 
    fontSize: 52, 
    fontWeight: 'bold', 
    color: COLORS.text,
    marginBottom: 20 
  },
  inputLine: {
    flexDirection: 'row',
    minHeight: 60,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.subText,
    paddingHorizontal: 20,
    alignItems: 'center'
  },
  inputText: { 
    fontSize: 48, 
    fontWeight: 'bold', 
    color: COLORS.primary 
  },
  padContainer: {
    justifyContent: 'flex-end',
  }
});