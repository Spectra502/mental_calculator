import { Link } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, SIZES, STYLES } from '../constants/theme'; // Import theme

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🧮 Master Math</Text>
      
      <Link href="/train" asChild>
        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.btnText}>Start Training</Text>
        </TouchableOpacity>
      </Link>

      <Link href="/learn" asChild>
        <TouchableOpacity style={styles.secondaryButton}>
          <Text style={styles.btnText}>Learn Tables</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: COLORS.background // Uses theme background
  },
  title: { 
    fontSize: SIZES.title, 
    fontWeight: 'bold', 
    marginBottom: 50, 
    color: COLORS.text 
  },
  primaryButton: { 
    backgroundColor: COLORS.primary, 
    padding: SIZES.padding, 
    borderRadius: SIZES.borderRadius, 
    width: '80%', 
    alignItems: 'center',
    ...STYLES.shadow // Applies the shadow logic we defined
  },
  secondaryButton: { 
    backgroundColor: COLORS.secondary, // Different color for this button
    padding: SIZES.padding, 
    borderRadius: SIZES.borderRadius, 
    width: '80%', 
    alignItems: 'center',
    marginTop: 20,
    ...STYLES.shadow
  },
  btnText: { 
    color: COLORS.surface, 
    fontSize: 18, 
    fontWeight: 'bold' 
  }
});