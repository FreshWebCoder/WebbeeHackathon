import React, { ReactNode } from 'react';
import { View } from 'react-native';
import { Flex, useBreakpointValue } from 'native-base';

import styles from './styles';

const ResponsiveGrid = ({ children }: { children: ReactNode }) => {
  const flexDir = useBreakpointValue({
    base: "100%",
    sm: "50%"
  });

  return (
    <View
      style={[styles.item, { width: flexDir }]}
    >
      {children}
    </View>
  )
};

export default ResponsiveGrid;
