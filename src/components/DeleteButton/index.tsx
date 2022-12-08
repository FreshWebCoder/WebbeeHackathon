import { DeleteIcon, IconButton } from 'native-base';
import React from 'react';

const DeleteButton = ({ onPress }: { onPress: () => void; }) => (
  <IconButton
    icon={<DeleteIcon />}
    borderRadius="full"
    _icon={{
      color: "red.600",
    }}
    _hover={{
      bg: "red.600:alpha.20"
    }}
    _pressed={{
      bg: "red.600:alpha.20"
    }}
    onPress={onPress}
  />
);

export default DeleteButton;
