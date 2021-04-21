import React from 'react';
import Switch from '@material-ui/core/Switch';
import { useSwitch } from '../context/SwitchContext';

const MySwitch = () => {
  const { switchState, setSwitchState } = useSwitch();
  const handleChange = () => {
    setSwitchState(!switchState);
  };

  return (
    <Switch
      checked={switchState}
      onChange={handleChange}
      name="checkedA"
    ></Switch>
  );
};

export default MySwitch;
