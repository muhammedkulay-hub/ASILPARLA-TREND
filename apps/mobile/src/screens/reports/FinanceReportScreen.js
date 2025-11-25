import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { colors } from '../../constants/colors';
import Card from '../../components/common/Card';
import BarChart from '../../components/charts/BarChart';
import { formatCurrency } from '../../utils/helpers';

const FinanceReportScreen = () => {
  const sampleData = {
    labels: ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz'],
    datasets: [
      {
        data: [50000, 75000, 60000, 90000, 110000, 85000],
      },
    ],
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Card>
          <Text style={styles.title}>Finans Raporu</Text>
          <BarChart data={sampleData} />
        </Card>

        <Card>
          <View style={styles.summary}>
            <Text style={styles.summaryLabel}>Toplam Gelir</Text>
            <Text style={styles.summaryValue}>{formatCurrency(470000)}</Text>
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
  },
});

export default FinanceReportScreen;

