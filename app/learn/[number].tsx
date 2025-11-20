import { Stack, useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { COLORS, STYLES } from '../../constants/theme';

export default function TableDetail() {
  const { number } = useLocalSearchParams();
  const num = parseInt(number);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Stack.Screen options={{ title: `Table of ${num}` }} />
      
      <View style={[styles.card, STYLES.shadow]}>
        {/* Loop 1 to 10 to show the table */}
        {Array.from({ length: 10 }, (_, i) => i + 1).map((i) => (
          <View key={i} style={styles.row}>
            <Text style={styles.mathText}>
              {num} × {i} = <Text style={styles.result}>{num * i}</Text>
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: COLORS.background, minHeight: '100%' },
  card: { backgroundColor: COLORS.surface, borderRadius: 15, padding: 20 },
  row: { 
    paddingVertical: 15, 
    borderBottomWidth: 1, 
    borderBottomColor: '#f0f0f0',
    alignItems: 'center'
  },
  mathText: { fontSize: 24, color: COLORS.text },
  result: { fontWeight: 'bold', color: COLORS.primary }
});