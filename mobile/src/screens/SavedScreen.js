import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const COLORS = {
  bg: '#0A0A0F',
  text: '#F0EDE6',
  muted: '#7A7880',
};

const SavedScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Saved Content</Text>
      <Text style={styles.subtitle}>Your watchlisted items will appear here.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.muted,
    textAlign: 'center',
  },
});

export default SavedScreen;
