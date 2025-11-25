import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useProducts } from '../../hooks/useProducts';
import Card from '../../components/common/Card';
import Button from '../../components/forms/Button';
import LoadingSpinner from '../../components/loaders/LoadingSpinner';
import { colors } from '../../constants/colors';
import { formatCurrency } from '../../utils/helpers';

const ProductDetailScreen = ({ route, navigation }) => {
  const { t } = useTranslation();
  const { productId } = route.params;
  const { currentProduct, loadProduct, isLoading } = useProducts();

  useEffect(() => {
    if (productId) {
      loadProduct(productId);
    }
  }, [productId, loadProduct]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const product = currentProduct || {};

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Card>
          <Text style={styles.title}>{product.name || 'Ürün Adı'}</Text>
          <Text style={styles.price}>{formatCurrency(product.price || 0)}</Text>
          <Text style={styles.description}>{product.description || 'Açıklama yok'}</Text>
        </Card>

        <View style={styles.actions}>
          <Button
            title={t('common.edit')}
            onPress={() => navigation.navigate('EditProduct', { productId })}
            style={styles.button}
          />
        </View>
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
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    color: colors.primary,
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  actions: {
    marginTop: 16,
  },
  button: {
    marginBottom: 12,
  },
});

export default ProductDetailScreen;

