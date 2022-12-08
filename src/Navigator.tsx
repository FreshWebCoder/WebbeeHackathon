import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import { useSelector } from 'react-redux';

import DashboardScreen from './screens/Dashboard';
import MachinesScreen from './screens/Machines';
import ManageCategoriesScreen from './screens/ManageCategories';

import { getMachines } from './store/selectors/machines';

const Drawer = createDrawerNavigator();

const Navigator = () => {
  const machineTypes = useSelector(getMachines);

  return (
    <Drawer.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        drawerType: 'slide'
      }}
    >
      <Drawer.Screen name="Dashboard" component={DashboardScreen}/>
      {machineTypes.map((el) => (
        <Drawer.Screen
          key={el.id}
          name={el.title}
          component={MachinesScreen}
          initialParams={{ id: el.id }}
        />
      ))}
      <Drawer.Screen
        name="ManageCategories"
        component={ManageCategoriesScreen}
        options={{ title: "Manage Categories" }}
      />
    </Drawer.Navigator>
  );
}

export default Navigator;
