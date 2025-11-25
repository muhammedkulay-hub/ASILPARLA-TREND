import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';

const Footer = () => {
  return (
    <View style={styles.footer}>
      <Text style={styles.text}>AsilParla v1.17.02</Text>
      <Text style={styles.subtext}>© 2024 Muhammed Kulay</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    padding: 16,
    alignItems: 'center',
    backgroundColor: colors.backgroundSecondary,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  text: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  subtext: {
    fontSize: 10,
    color: colors.textTertiary,
    marginTop: 4,
  },
});

export default Footer;

