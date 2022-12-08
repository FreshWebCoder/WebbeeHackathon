import React from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import { Button, Flex, Heading, Text } from 'native-base';

import { ResponsiveView, MachineCard } from '../../components';

import { IMachineType, addMachine, updateMachine, deleteMachine } from '../../store/slices/machines';

import styles from './styles';

const CategoryDetail = ({ data }: { data: IMachineType }) => {
  const dispatch = useDispatch();

  const onAdd = () => {
    dispatch(addMachine(data.id));
  };

  const onUpdate = (idx: number, val: { [key: string]: any; }) => {
    dispatch(
      updateMachine({
        typeId: data.id,
        id: idx,
        data: val,
      })
    )
  };

  const onDelete = (idx: number) => {
    dispatch(
      deleteMachine({
        typeId: data.id,
        id: idx,
      })
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Heading size="lg" style={styles.title}>
          {data.title}
        </Heading>

        <Button onPress={onAdd}>
          Add
        </Button>
      </View>

      <Flex direction="row" wrap="wrap">
        {data.machines.length ? data.machines.map((el, idx) => (
          <ResponsiveView key={idx}>
            <MachineCard
              data={el}
              attributes={data.attributes}
              titleAttr={data.titleAttr}
              onChange={(val) => onUpdate(idx, val)}
              onDelete={() => onDelete(idx)}
            />
          </ResponsiveView>
        )) : (
          <Text style={styles.noItemText}>
            No Items to display
          </Text>
        )}
      </Flex>
    </View>
  )
};

export default CategoryDetail;
