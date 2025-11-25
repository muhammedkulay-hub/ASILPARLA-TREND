import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../constants/colors';

// Screens
import HomeScreen from '../screens/dashboard/HomeScreen';
import AnalyticsScreen from '../screens/dashboard/AnalyticsScreen';
import ProductListScreen from '../screens/products/ProductListScreen';
import ProductDetailScreen from '../screens/products/ProductDetailScreen';
import AddProductScreen from '../screens/products/AddProductScreen';
import EditProductScreen from '../screens/products/EditProductScreen';
import OrderListScreen from '../screens/orders/OrderListScreen';
import OrderDetailScreen from '../screens/orders/OrderDetailScreen';
import CreateOrderScreen from '../screens/orders/CreateOrderScreen';
import ReportScreen from '../screens/reports/ReportScreen';
import SalesReportScreen from '../screens/reports/SalesReportScreen';
import FinanceReportScreen from '../screens/reports/FinanceReportScreen';
import NotificationScreen from '../screens/notifications/NotificationScreen';
import SettingsScreen from '../screens/settings/SettingsScreen';
import ProfileScreen from '../screens/settings/ProfileScreen';
import NotificationSettings from '../screens/settings/NotificationSettings';
import HealthScreen from '../screens/account-health/HealthScreen';
import PerformanceScreen from '../screens/account-health/PerformanceScreen';
import SupplierScreen from '../screens/supplier/SupplierScreen';
import HelpScreen from '../screens/help/HelpScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// Main Tab Navigator
const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Products') {
            iconName = focused ? 'package-variant' : 'package-variant-closed';
          } else if (route.name === 'Orders') {
            iconName = focused ? 'shopping' : 'shopping-outline';
          } else if (route.name === 'Reports') {
            iconName = focused ? 'chart-line' : 'chart-line-variant';
          } else if (route.name === 'More') {
            iconName = focused ? 'menu' : 'menu';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.backgroundSecondary,
          borderTopColor: colors.border,
          borderTopWidth: 1,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Products" component={ProductListScreen} />
      <Tab.Screen name="Orders" component={OrderListScreen} />
      <Tab.Screen name="Reports" component={ReportScreen} />
      <Tab.Screen name="More" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

// Products Stack
const ProductsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.backgroundSecondary },
        headerTintColor: colors.text,
        headerTitleStyle: { color: colors.text },
      }}
    >
      <Stack.Screen name="ProductList" component={ProductListScreen} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
      <Stack.Screen name="AddProduct" component={AddProductScreen} />
      <Stack.Screen name="EditProduct" component={EditProductScreen} />
    </Stack.Navigator>
  );
};

// Orders Stack
const OrdersStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.backgroundSecondary },
        headerTintColor: colors.text,
        headerTitleStyle: { color: colors.text },
      }}
    >
      <Stack.Screen name="OrderList" component={OrderListScreen} />
      <Stack.Screen name="OrderDetail" component={OrderDetailScreen} />
      <Stack.Screen name="CreateOrder" component={CreateOrderScreen} />
    </Stack.Navigator>
  );
};

// Reports Stack
const ReportsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.backgroundSecondary },
        headerTintColor: colors.text,
        headerTitleStyle: { color: colors.text },
      }}
    >
      <Stack.Screen name="ReportList" component={ReportScreen} />
      <Stack.Screen name="SalesReport" component={SalesReportScreen} />
      <Stack.Screen name="FinanceReport" component={FinanceReportScreen} />
    </Stack.Navigator>
  );
};

// Main App Navigator with Drawer
const AppNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.backgroundSecondary },
        headerTintColor: colors.text,
        drawerStyle: { backgroundColor: colors.backgroundSecondary },
        drawerActiveTintColor: colors.primary,
        drawerInactiveTintColor: colors.textSecondary,
      }}
    >
      <Drawer.Screen
        name="MainTabs"
        component={MainTabs}
        options={{ title: 'Ana Sayfa', drawerLabel: 'Ana Sayfa' }}
      />
      <Drawer.Screen
        name="Analytics"
        component={AnalyticsScreen}
        options={{ title: 'Analitik', drawerLabel: 'Analitik' }}
      />
      <Drawer.Screen
        name="Health"
        component={HealthScreen}
        options={{ title: 'Hesap Sağlığı', drawerLabel: 'Hesap Sağlığı' }}
      />
      <Drawer.Screen
        name="Performance"
        component={PerformanceScreen}
        options={{ title: 'Performans', drawerLabel: 'Performans' }}
      />
      <Drawer.Screen
        name="Supplier"
        component={SupplierScreen}
        options={{ title: 'Tedarikçi', drawerLabel: 'Tedarikçi' }}
      />
      <Drawer.Screen
        name="Notifications"
        component={NotificationScreen}
        options={{ title: 'Bildirimler', drawerLabel: 'Bildirimler' }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: 'Profil', drawerLabel: 'Profil' }}
      />
      <Drawer.Screen
        name="Help"
        component={HelpScreen}
        options={{ title: 'Yardım', drawerLabel: 'Yardım' }}
      />
    </Drawer.Navigator>
  );
};

export default AppNavigator;

