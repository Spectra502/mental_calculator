import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, STYLES } from '../../constants/theme';

export default function TrainMenu() {
  const router = useRouter();
  const [difficulty, setDifficulty] = useState('medium'); // Default state

  const modes = [
    { id: 'addition', label: 'Addition (+)', color: '#FF9800' },
    { id: 'subtraction', label: 'Subtraction (-)', color: '#2196F3' },
    { id: 'multiplication', label: 'Multiplication (×)', color: '#9C27B0' },
    { id: 'division', label: 'Division (÷)', color: '#4CAF50' },
  ];

  const difficulties = ['easy', 'medium', 'hard'];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Select Difficulty</Text>
      
      {/* Difficulty Segmented Control */}
      <View style={styles.diffContainer}>
        {difficulties.map((diff) => (
          <TouchableOpacity
            key={diff}
            style={[
              styles.diffButton,
              difficulty === diff && { backgroundColor: COLORS.primary }
            ]}
            onPress={() => setDifficulty(diff)}
          >
            <Text style={[
              styles.diffText,
              difficulty === diff && { color: '#fff' }
            ]}>
              {diff.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={[styles.header, { marginTop: 30 }]}>Select Mode</Text>
      
      {/* Mode Buttons */}
      <View style={styles.grid}>
        {modes.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[styles.card, { backgroundColor: item.color }, STYLES.shadow]}
            onPress={() => {
              // Navigate and pass BOTH mode and difficulty parameters
              router.push({
                pathname: `/train/${item.id}`,
                params: { difficulty: difficulty }
              });
            }}
          >
            <Text style={styles.cardText}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: COLORS.background },
  header: { fontSize: 20, fontWeight: 'bold', color: COLORS.subText, marginBottom: 15 },
  
  // Difficulty Styles
  diffContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 5,
  },
  diffButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  diffText: { fontWeight: 'bold', color: COLORS.subText },

  // Grid Styles
  grid: { gap: 15 },
  card: {
    padding: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  }
});