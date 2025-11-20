import { Link } from 'expo-router';
import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// 1. SETUP DIMENSIONS
const { width } = Dimensions.get('window');
const GAP = 20; // Bigger gap between buttons
const PADDING = 30; // Space from the sides of the screen
// Calculate available space for 3 items
const AVAILABLE_WIDTH = width - (PADDING * 2) - (GAP * 2);
const ITEM_SIZE = AVAILABLE_WIDTH / 3;

export default function LearnMenu() {
  const numbers = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Multiplication Tables</Text>
        <Text style={styles.subHeader}>Select a number to study</Text>
      </View>
      
      <FlatList
        data={numbers}
        numColumns={3}
        keyExtractor={(item) => item.toString()}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={{ gap: GAP }} // Creates the horizontal space
        
        renderItem={({ item }) => (
          <Link href={`/learn/${item}`} asChild>
            <TouchableOpacity style={[styles.card, { width: ITEM_SIZE, height: ITEM_SIZE }]}>
              <Text style={styles.number}>{item}</Text>
            </TouchableOpacity>
          </Link>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F4F6F8', // Explicit light grey background
  },
  headerContainer: {
    marginTop: 50,
    marginBottom: 30,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  header: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    color: '#1A1A1A',
    marginBottom: 8,
  },
  subHeader: {
    fontSize: 16,
    color: '#757575',
  },
  grid: {
    paddingHorizontal: PADDING,
    alignItems: 'center',
    paddingBottom: 50,
  },
  card: {
    // 2. HIGH CONTRAST DESIGN
    backgroundColor: '#6C63FF', // Hardcoded Purple to ensure visibility
    borderRadius: 20,           // Very round corners
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: GAP,          // Vertical space
    
    // Shadow for "Pop" effect
    shadowColor: "#6C63FF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 8, // Android shadow
  },
  number: { 
    fontSize: 42, // Bigger Text
    fontWeight: 'bold', 
    color: '#6C63FF' // Pure White text
  }
});