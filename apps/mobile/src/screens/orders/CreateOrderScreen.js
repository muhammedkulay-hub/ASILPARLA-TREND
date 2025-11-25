import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useOrders } from '../../hooks/useOrders';
import Button from '../../components/forms/Button';
import Input from '../../components/forms/Input';
import { colors } from '../../constants/colors';
import Toast from 'react-native-toast-message';

const CreateOrderScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const { addOrder } = useOrders();
  const [formData, setFormData] = useState({
    customer_name: '',
    total: '',
    notes: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!formData.customer_name || !formData.total) {
      Toast.show({
        type: 'error',
        text1: t('common.error'),
        text2: 'Müşteri adı ve toplam gerekli',
      });
      return;
    }

    setIsLoading(true);
    try {
      await addOrder({
        ...formData,
        total: parseFloat(formData.total),
      });
      Toast.show({
        type: 'success',
        text1: 'Sipariş oluşturuldu',
      });
      navigation.goBack();
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Hata',
        text2: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Input
            label="Müşteri Adı"
            value={formData.customer_name}
            onChangeText={(text) => setFormData({ ...formData, customer_name: text })}
            placeholder="Müşteri adını girin"
          />

          <Input
            label="Toplam"
            value={formData.total}
            onChangeText={(text) => setFormData({ ...formData, total: text })}
            placeholder="0.00"
            keyboardType="decimal-pad"
          />

          <Input
            label="Notlar"
            value={formData.notes}
            onChangeText={(text) => setFormData({ ...formData, notes: text })}
            placeholder="Sipariş notları"
            multiline
            numberOfLines={4}
          />

          <Button
            title={t('common.save')}
            onPress={handleSubmit}
            loading={isLoading}
            style={styles.button}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  button: {
    marginTop: 20,
  },
});

export default CreateOrderScreen;

