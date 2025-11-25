import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { colors } from '../../constants/colors';
import LineChart from '../../components/charts/LineChart';
import BarChart from '../../components/charts/BarChart';
import Card from '../../components/common/Card';

const AnalyticsScreen = () => {
  const sampleData = {
    labels: ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43, 50],
      },
    ],
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Card>
          <Text style={styles.title}>Satış Trendi</Text>
          <LineChart data={sampleData} />
        </Card>

        <Card>
          <Text style={styles.title}>Ürün Kategorileri</Text>
          <BarChart data={sampleData} />
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
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
});

export default AnalyticsScreen;

