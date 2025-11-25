import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import { colors } from '../../constants/colors';
import Button from '../forms/Button';
import Input from '../forms/Input';

const FilterModal = ({
  visible,
  onClose,
  onApply,
  filters = {},
  filterOptions = {},
}) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleApply = () => {
    onApply(localFilters);
    onClose();
  };

  const handleReset = () => {
    setLocalFilters({});
    onApply({});
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modal}>
              <Text style={styles.title}>Filtrele</Text>
              <ScrollView style={styles.content}>
                {filterOptions.search && (
                  <Input
                    label="Ara"
                    value={localFilters.search || ''}
                    onChangeText={(text) =>
                      setLocalFilters({ ...localFilters, search: text })
                    }
                    placeholder="Ara..."
                  />
                )}
                {/* Add more filter inputs based on filterOptions */}
              </ScrollView>
              <View style={styles.buttons}>
                <Button
                  title="Sıfırla"
                  onPress={handleReset}
                  variant="outline"
                  style={styles.button}
                />
                <Button
                  title="Uygula"
                  onPress={handleApply}
                  style={styles.button}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'flex-end',
  },
  modal: {
    backgroundColor: colors.backgroundCard,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 20,
  },
  content: {
    maxHeight: 400,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    gap: 12,
  },
  button: {
    flex: 1,
  },
});

export default FilterModal;

