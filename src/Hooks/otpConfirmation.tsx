import React, {createContext, useContext, useState} from 'react';

const OtpContext = createContext({
  confirm: null,
  addConfirm: {},
});

export const useOtp = () => {
  return useContext(OtpContext);
};

const OtpProvider = ({children}: any) => {
  const [confirm, setConfirm] = useState(null);

  const addConfirm = (res: any) => {
    setConfirm(res);
  };

  return (
    <OtpContext.Provider value={{confirm, addConfirm}}>
      {children}
    </OtpContext.Provider>
  );
};

export default OtpProvider;
