import React, {useState, useEffect, createContext} from 'react';
import NetInfo from '@react-native-community/netinfo';
import {useDispatch} from 'react-redux';
import {storeOnlinestatus} from '@mit-actions';
import NoInternet from 'src/screens/common/NoInternet';

export const NetworkContext = createContext({isConnected: true});

export const NetworkProvider = ({children}: any) => {
  const [isConnected, setIsConnected] = useState<boolean>(true);
  const dispatch = useDispatch();

  useEffect(() => {
    checkConnectivity();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkConnectivity = () => {
    const unsubscribe = NetInfo.addEventListener(handleConnectivityChange);

    return () => {
      unsubscribe();
    };
  };

  const handleConnectivityChange = (connectionInfo: any) => {
    if (connectionInfo.isConnected === true) {
      setIsConnected(connectionInfo.isConnected);
      dispatch(storeOnlinestatus(connectionInfo.isConnected));
    } else {
      setIsConnected(connectionInfo.isConnected);
      dispatch(storeOnlinestatus(connectionInfo.isConnected));
    }
  };

  return (
    <NetworkContext.Provider value={{isConnected}}>
      {isConnected ? (
        <>{children}</>
      ) : (
        <NoInternet checkConnectivity={checkConnectivity} />
      )}
    </NetworkContext.Provider>
  );
};
