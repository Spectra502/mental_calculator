import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, STYLES } from '../constants/theme';

// Get screen width to calculate button size dynamically
const { width } = Dimensions.get('window');
const BUTTON_SIZE = width / 4; // Buttons will be roughly 1/4th of screen width

export default function NumPad({ onPress }) {
  
  // This handles the logic when a button is tapped
  const handlePress = (val) => {
    onPress(val); // Send the value back to the parent screen
  };

  // The layout of our keys
  const keys = [
    '1', '2', '3',
    '4', '5', '6',
    '7', '8', '9',
    'DEL', '0', 'ENTER'
  ];

  return (
    <View style={styles.container}>
      {keys.map((key) => {
        
        // Determine styling based on key type
        let bg = COLORS.surface;
        let txt = COLORS.text;

        if (key === 'ENTER') {
          bg = COLORS.success; // Green for Enter
          txt = '#FFFFFF';
        } else if (key === 'DEL') {
          bg = COLORS.error;   // Red for Delete
          txt = '#FFFFFF';
        }

        return (
          <TouchableOpacity
            key={key}
            style={[styles.button, { backgroundColor: bg }, STYLES.shadow]}
            onPress={() => handlePress(key)}
          >
            {/* Render Symbols for special keys, numbers for others */}
            <Text style={[styles.text, { color: txt }]}>
              {key === 'DEL' ? '⌫' : key === 'ENTER' ? '✓' : key}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // Arrange items in a row
    flexWrap: 'wrap',     // Allow them to wrap to next line
    justifyContent: 'center',
    gap: 15,              // Space between buttons
    marginTop: 20,
    paddingBottom: 30,    // Extra padding at bottom for phones with swipe bars
  },
  button: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE, // Make it square
    borderRadius: BUTTON_SIZE / 2, // Make it a perfect circle
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)'
  },
  text: {
    fontSize: 28,
    fontWeight: 'bold',
  }
});