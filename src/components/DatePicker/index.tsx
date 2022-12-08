import React, { useState } from 'react';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';
import { Input, Pressable } from 'native-base';

const DatePicker = (
  { value, placeholder, onChange }:
  {
    value: string;
    placeholder: string;
    onChange: (val: Date) => void;
  }
) => {
  const [isOpened, setIsOpened] = useState(false);

  const onPress = () => {
    setIsOpened(false);

    setTimeout(() => {
      setIsOpened(true);
    }, 1);
  };

  const handleChange = (_: DateTimePickerEvent, date?: Date) => {
    setIsOpened(false);
    date && onChange(date);
  };

  return (
    <>
      <Pressable style={{ width: "100%" }} onPress={onPress}>
        <Input
          variant="outline"
          placeholder={placeholder}
          value={value ? dayjs(value).format("MM/DD/YYYY") : ""}
          isReadOnly
        />
      </Pressable>

      {isOpened && (
        <DateTimePicker
          mode="date"
          value={value ? dayjs(value).toDate() : new Date()}
          onChange={handleChange}
        />
      )}
    </>
  )
};

export default DatePicker;
