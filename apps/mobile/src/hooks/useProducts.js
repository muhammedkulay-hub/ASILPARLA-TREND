import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './redux';
import {
  fetchProducts,
  fetchProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  setFilters,
  clearFilters,
} from '../store/productSlice';

export const useProducts = () => {
  const dispatch = useAppDispatch();
  const { products, currentProduct, isLoading, error, filters, pagination } =
    useAppSelector((state) => state.products);

  const loadProducts = useCallback(
    async (params) => {
      return dispatch(fetchProducts(params || filters));
    },
    [dispatch, filters]
  );

  const loadProduct = useCallback(
    async (id) => {
      return dispatch(fetchProductById(id));
    },
    [dispatch]
  );

  const addProduct = useCallback(
    async (productData) => {
      return dispatch(createProduct(productData));
    },
    [dispatch]
  );

  const editProduct = useCallback(
    async (id, productData) => {
      return dispatch(updateProduct({ id, data: productData }));
    },
    [dispatch]
  );

  const removeProduct = useCallback(
    async (id) => {
      return dispatch(deleteProduct(id));
    },
    [dispatch]
  );

  const updateFilters = useCallback(
    (newFilters) => {
      dispatch(setFilters(newFilters));
    },
    [dispatch]
  );

  const resetFilters = useCallback(() => {
    dispatch(clearFilters());
  }, [dispatch]);

  useEffect(() => {
    loadProducts();
  }, [filters]);

  return {
    products,
    currentProduct,
    isLoading,
    error,
    filters,
    pagination,
    loadProducts,
    loadProduct,
    addProduct,
    editProduct,
    removeProduct,
    updateFilters,
    resetFilters,
  };
};

