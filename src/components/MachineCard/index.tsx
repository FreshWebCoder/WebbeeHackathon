import React from 'react';
import { View } from 'react-native';
import dayjs from 'dayjs';
import { Box, Heading, Input, Switch, Text } from 'native-base';

import DatePicker from '../DatePicker';
import DeleteButton from '../DeleteButton';

import { IAttribute } from '../../store/slices/machines';

import styles from './styles';

const MachineCard = (
  {
    data,
    attributes,
    titleAttr,
    onChange,
    onDelete,
  }:
  {
    data: { [key: string]: any; };
    attributes: IAttribute[];
    titleAttr: number;
    onChange: (val: { [key: string]: any; }) => void;
    onDelete: () => void;
  }
) => {
  const handleChange = (name: string, value: any) => {
    onChange({
      ...data,
      [name]: value
    })
  };

  const renderTitle = () => {
    const attr = attributes[titleAttr];
    if (attr.type === "checkbox") {
      return `${data[attr.name] ? "Not " : ""}${attr.name}`;
    } else if (attr.type === "date") {
      return data[attr.name] ? dayjs(data[attr.name]).format("MM/DD/YYYY") : "No Title";
    }
    
    return data[attr.name] ? data[attr.name] : "No Title";
  };

  return (
    <Box style={styles.container}>
      <View style={styles.header}>
        <Heading size="md" style={styles.title}>
          {renderTitle()}
        </Heading>

        <DeleteButton onPress={onDelete} />
      </View>

      {attributes.map((el, idx) => (
        <View key={idx} style={styles.attrRow}>
          {el.type === "checkbox" ? (
            <>
              <Text>{el.name}</Text>
              <Switch
                isChecked={data[el.name]}
                onToggle={(val) => handleChange(el.name, val)}
              />
            </>
          ) : el.type === "date" ? (
            <DatePicker
              value={data[el.name]}
              placeholder={el.name}
              onChange={(val) => handleChange(el.name, val)}
            />
          ) : el.type === "number" ? (
            <Input
              variant="outline"
              keyboardType="numeric"
              placeholder={el.name}
              value={data[el.name]}
              onChangeText={(val) => handleChange(el.name, val.replace(/[^0-9]/g, ''))}
            />
          ) : (
            <Input
              variant="outline"
              placeholder={el.name}
              value={data[el.name]}
              onChangeText={(val) => handleChange(el.name, val)}
            />
          )}
        </View>
      ))}
    </Box>
  )
};

export default MachineCard;
