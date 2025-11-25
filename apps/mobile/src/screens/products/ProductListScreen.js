import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useProducts } from '../../hooks/useProducts';
import { useNavigation } from '@react-navigation/native';
import Card from '../../components/common/Card';
import LoadingSpinner from '../../components/loaders/LoadingSpinner';
import { colors } from '../../constants/colors';
import { formatCurrency } from '../../utils/helpers';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ProductListScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { products, isLoading, loadProducts } = useProducts();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadProducts();
    setRefreshing(false);
  };

  const renderProduct = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
    >
      <Card>
        <View style={styles.productRow}>
          <View style={styles.productInfo}>
            <Text style={styles.productName}>{item.name || 'Ürün Adı'}</Text>
            <Text style={styles.productPrice}>
              {formatCurrency(item.price || 0)}
            </Text>
          </View>
          <Icon name="chevron-right" size={24} color={colors.textSecondary} />
        </View>
      </Card>
    </TouchableOpacity>
  );

  if (isLoading && !refreshing) {
    return <LoadingSpinner />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>{t('products.noProducts')}</Text>
          </View>
        }
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  list: {
    padding: 16,
  },
  productRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
    color: colors.primary,
  },
  empty: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: colors.textSecondary,
  },
});

export default ProductListScreen;

