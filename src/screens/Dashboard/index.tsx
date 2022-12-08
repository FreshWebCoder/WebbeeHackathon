import React from 'react';
import { ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { Text } from 'native-base';

import { CategoryDetail } from '../../components';

import { getMachines } from '../../store/selectors/machines';

import styles from './styles';

const DashboardScreen = () => {
  const machineTypes = useSelector(getMachines);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {machineTypes.length ? machineTypes.map((el) => (
        <CategoryDetail key={el.id} data={el} />
      )) : (
        <Text style={styles.noItemText}>
          No Items to display
        </Text>
      )}
    </ScrollView>
  )
};

export default DashboardScreen;
