import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView, ScrollView } from 'react-native';
import { Button, Flex } from 'native-base';

import { CategoryCard, ResponsiveView } from '../../components';

import { addType, updateType, deleteType } from '../../store/slices/machines';
import { getMachines } from '../../store/selectors/machines';
import { IMachineType } from '../../store/slices/machines';

import styles from './styles';

const ManageCategoriesScreen = () => {
  const dispatch = useDispatch();
  const machineTypes = useSelector(getMachines);
  const [pendingItem, setPendingItem] = useState<IMachineType | null>(null);

  const getLastId = () => {
    if (machineTypes.length) {
      return machineTypes[machineTypes.length - 1].id;
    }

    return 0;
  };

  const onPressNew = () => {
    setPendingItem({
      id: getLastId() + 1,
      title: "",
      attributes: [{
        id: 1,
        name: "",
        type: "text"
      }],
      titleAttr: 1,
      machines: [],
      isNew: true,
    });
  };

  const onItemSubmit = (val: IMachineType) => {
    if (val.isNew) {
      setPendingItem(null);
      dispatch(addType({
        ...val,
        isNew: false,
      }));
    } else {
      dispatch(updateType(val));
    }
  };

  const onItemDelete = (val: IMachineType) => {
    if (val.isNew) {
      setPendingItem(null);
    } else {
      dispatch(deleteType(val.id));
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Flex direction="row" wrap="wrap">
          {machineTypes.map((el) => (
            <ResponsiveView key={el.id}>
              <CategoryCard
                data={el}
                onSubmit={onItemSubmit}
                onDelete={onItemDelete}
              />
            </ResponsiveView>
          ))}
          {pendingItem && (
            <ResponsiveView>
              <CategoryCard
                data={pendingItem}
                onSubmit={onItemSubmit}
                onDelete={onItemDelete}
              />
            </ResponsiveView>
          )}
        </Flex>

        {!pendingItem && (
          <Button
            style={styles.btnNew}
            onPress={onPressNew}
          >
            Add New Category
          </Button>
        )}
      </ScrollView>
    </SafeAreaView>
  )
};

export default ManageCategoriesScreen;
