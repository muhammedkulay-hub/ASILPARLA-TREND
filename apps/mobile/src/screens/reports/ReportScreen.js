import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import Card from '../../components/common/Card';
import { colors } from '../../constants/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ReportScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const reportTypes = [
    {
      id: 'sales',
      title: t('reports.salesReport'),
      icon: 'chart-line',
      screen: 'SalesReport',
    },
    {
      id: 'finance',
      title: t('reports.financeReport'),
      icon: 'currency-usd',
      screen: 'FinanceReport',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {reportTypes.map((report) => (
          <TouchableOpacity
            key={report.id}
            onPress={() => navigation.navigate(report.screen)}
          >
            <Card>
              <View style={styles.reportRow}>
                <Icon name={report.icon} size={32} color={colors.primary} />
                <Text style={styles.reportTitle}>{report.title}</Text>
                <Icon name="chevron-right" size={24} color={colors.textSecondary} />
              </View>
            </Card>
          </TouchableOpacity>
        ))}
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
  reportRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  reportTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
});

export default ReportScreen;

