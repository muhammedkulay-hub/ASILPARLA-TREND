import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../constants/colors';

const Sidebar = ({ navigation, items = [] }) => {
  return (
    <View style={styles.sidebar}>
      {items.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.item}
          onPress={() => item.onPress && item.onPress()}
        >
          <Icon name={item.icon} size={24} color={colors.text} />
          <Text style={styles.itemText}>{item.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
    padding: 16,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 12,
  },
  itemText: {
    fontSize: 16,
    color: colors.text,
  },
});

export default Sidebar;

