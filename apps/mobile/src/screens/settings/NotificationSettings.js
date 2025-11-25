import React from 'react';
import { View, Text, StyleSheet, ScrollView, Switch } from 'react-native';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { updateNotifications } from '../../store/settingsSlice';
import Card from '../../components/common/Card';
import { colors } from '../../constants/colors';

const NotificationSettings = () => {
  const dispatch = useAppDispatch();
  const { notifications } = useAppSelector((state) => state.settings);

  const handleToggle = (key, value) => {
    dispatch(updateNotifications({ [key]: value }));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Card>
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Bildirimler</Text>
            <Switch
              value={notifications.enabled}
              onValueChange={(value) => handleToggle('enabled', value)}
              trackColor={{ false: colors.border, true: colors.primary }}
            />
          </View>
        </Card>

        <Card>
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Ses</Text>
            <Switch
              value={notifications.sound}
              onValueChange={(value) => handleToggle('sound', value)}
              trackColor={{ false: colors.border, true: colors.primary }}
            />
          </View>
        </Card>

        <Card>
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Titreşim</Text>
            <Switch
              value={notifications.vibration}
              onValueChange={(value) => handleToggle('vibration', value)}
              trackColor={{ false: colors.border, true: colors.primary }}
            />
          </View>
        </Card>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 16,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingLabel: {
    fontSize: 16,
    color: colors.text,
  },
});

export default NotificationSettings;

