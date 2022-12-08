import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { Box, Button, Checkbox, Heading, Input, Menu, useToast } from 'native-base';

import DeleteButton from '../DeleteButton';

import { getMachines } from '../../store/selectors/machines';
import { IMachineType } from '../../store/slices/machines';

import styles from './styles';

const attributeTypes = ["text", "date", "checkbox", "number"];

const CategoryCard = (
  {
    data,
    onSubmit,
    onDelete,
  }:
  {
    data: IMachineType;
    onSubmit: (val: IMachineType) => void;
    onDelete: (val: IMachineType) => void;
  }
) => {
  const toast = useToast();
  const machineTypes = useSelector(getMachines);
  const [detail, setDetail] = useState<IMachineType | null>(null);

  useEffect(() => {
    setDetail(data);
  }, [data]);

  const onTitleChange = (val: string) => {
    if (detail) {
      setDetail({
        ...detail,
        title: val,
      });
    }
  };

  const onAddAttr = () => {
    if (detail) {
      setDetail({
        ...detail,
        attributes: [
          ...detail.attributes,
          {
            name: "",
            type: "text"
          }
        ],
      });
    }
  };

  const onUpdateAttr = (idx: number, field: "titleAttr" | "name" | "type", value: any) => {
    if (field === "titleAttr") {
      if (value) {
        setDetail((prevVal) => prevVal ? {
          ...prevVal,
          titleAttr: idx,
        } : prevVal)
      }
    } else {
      setDetail((prevVal) => prevVal ? ({
        ...prevVal,
        attributes: prevVal.attributes.map((el, i) => {
          if (i === idx) {
            return {
              ...el,
              [field]: value
            }
          }

          return el;
        })
      }) : prevVal)
    }
  };

  const onRemoveAttr = (idx: number) => {
    setDetail((prevVal) => {
      if (prevVal) {
        let titleAttr = prevVal.titleAttr;
        if (idx === prevVal.titleAttr) {
          titleAttr = 0;
        } else if (idx < prevVal.titleAttr) {
          titleAttr -= 1;
        }
  
        return {
          ...prevVal,
          titleAttr,
          attributes: prevVal.attributes.filter((_, i) => idx !== i),
        }
      }

      return prevVal;
    });
  };

  const handleDelete = () => {
    onDelete(data);
  };

  const handleSubmit = () => {
    if (detail) {
      if (!detail.title) {
        toast.show({
          description: "Title is required",
          placement: "top"
        });
      } else if (machineTypes.find(el => el.id !== detail.id && el.title === detail.title)) {
        toast.show({
          description: "Category with same title already exists",
          placement: "top"
        });
      } else if (detail.attributes.find((el) => !el.name)) {
        toast.show({
          description: "Attributes must have name",
          placement: "top"
        });
      } else {
        onSubmit(detail);
      }
    }
  };

  return detail && (
    <Box style={styles.container}>
      <View style={styles.header}>
        <Heading size="md" style={styles.title}>
          {!detail.title ? detail.isNew ? "New Category" : "No Title" : detail.title}
        </Heading>

        <DeleteButton onPress={handleDelete} />
      </View>

      <Input
        variant="outline"
        placeholder="Category Name"
        mb="2"
        value={detail.title}
        onChangeText={onTitleChange}
      />

      {detail.attributes.map((el, idx) => (
        <View key={idx} style={styles.attrRow}>
          <Checkbox
            value={idx.toString()}
            accessibilityLabel="checkbox"
            isChecked={detail.titleAttr === idx}
            isDisabled={detail.attributes.length === 1}
            onChange={(val) => onUpdateAttr(idx, "titleAttr", val)}
          />

          <Input
            value={el.name}
            flex={1}
            mx={4}
            variant="outline"
            onChangeText={(val) => onUpdateAttr(idx, "name", val)}
          />

          <Menu
            trigger={(props) => (
              <Button size="sm" variant="ghost" {...props}>
                {el.type.toUpperCase()}
              </Button>
            )}
          >
            {attributeTypes.map((el) => (
              <Menu.Item
                key={el}
                onPress={() => onUpdateAttr(idx, "type", el)}
              >
                {el.toUpperCase()}
              </Menu.Item>
            ))}
          </Menu>

          {detail.attributes.length > 1 && (
            <DeleteButton onPress={() => onRemoveAttr(idx)} />
          )}
        </View>
      ))}

      <Button size="sm" variant="link" mr="auto" onPress={onAddAttr}>
        Add New Attribute
      </Button>

      <Button
        style={styles.btnSubmit}
        onPress={handleSubmit}
      >
        {detail.isNew ? "Add" : "Update"}
      </Button>
    </Box>
  )
};

export default CategoryCard;
