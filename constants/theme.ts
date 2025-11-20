export const COLORS = {
  primary: '#6C63FF',    // A modern purple/blue (Main brand color)
  secondary: '#03DAC6',  // Accent color (Buttons, highlights)
  background: '#F0F2F5', // Light grey background (easier on eyes than pure white)
  surface: '#FFFFFF',    // Cards / Input fields background
  text: '#1A1A1A',       // Dark text for readability
  subText: '#757575',    // Grey text for hints
  
  // Game Logic Colors
  success: '#4CAF50',    // Green (Correct answer)
  error: '#FF5252',      // Red (Wrong answer)
};

export const SIZES = {
  padding: 20,
  borderRadius: 12,
  title: 28,
  text: 16,
};

export const STYLES = {
  // A common shadow style to make buttons pop
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5, // This is required for Android shadows
  }
};