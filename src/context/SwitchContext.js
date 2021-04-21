import { useContext, createContext, useState } from 'react';

const SwitchContext = createContext({});

const SwitchProvider = ({ children }) => {
  const [switchState, setSwitchState] = useState(false);

  return (
    <SwitchContext.Provider
      value={{
        switchState,
        setSwitchState,
      }}
    >
      {children}
    </SwitchContext.Provider>
  );
};

const useSwitch = () => {
  const { switchState, setSwitchState } = useContext(SwitchContext);

  return {
    switchState,
    setSwitchState,
  };
};

export { SwitchProvider, useSwitch };
