import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { Text } from 'native-base';

import { CategoryDetail } from '../../components';

import { getMachineById } from '../../store/selectors/machines';

import styles from './styles';

const DashboardScreen = ({ route }: any) => {
  const { id } = route.params;
  const machine = useSelector(getMachineById(id));

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        {machine ? (
          <CategoryDetail data={machine} />
        ) : (
          <Text style={styles.noItemText}>
            No data to display
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  )
};

export default DashboardScreen;
