import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useProducts } from '../../hooks/useProducts';
import Button from '../../components/forms/Button';
import Input from '../../components/forms/Input';
import { colors } from '../../constants/colors';
import Toast from 'react-native-toast-message';

const AddProductScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const { addProduct } = useProducts();
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!formData.name || !formData.price) {
      Toast.show({
        type: 'error',
        text1: t('common.error'),
        text2: 'Ürün adı ve fiyat gerekli',
      });
      return;
    }

    setIsLoading(true);
    try {
      await addProduct({
        ...formData,
        price: parseFloat(formData.price),
      });
      Toast.show({
        type: 'success',
        text1: 'Ürün eklendi',
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
            label="Ürün Adı"
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
            placeholder="Ürün adını girin"
          />

          <Input
            label="Fiyat"
            value={formData.price}
            onChangeText={(text) => setFormData({ ...formData, price: text })}
            placeholder="0.00"
            keyboardType="decimal-pad"
          />

          <Input
            label="Açıklama"
            value={formData.description}
            onChangeText={(text) => setFormData({ ...formData, description: text })}
            placeholder="Ürün açıklaması"
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

export default AddProductScreen;

