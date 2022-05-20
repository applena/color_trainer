import DropDownPicker from 'react-native-dropdown-picker';
import React, { useState } from 'react';

function DropdownLevelPicker(props) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('Beginner');
  const [items, setItems] = useState([
    { label: 'Beginner', value: 'Beginner' },
    { label: 'Expert', value: 'Expert' }
  ]);

  return (
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      onChangeValue={(value) => {
        props.setNewLevel(value);
      }}
    />
  );
}

export default DropdownLevelPicker;