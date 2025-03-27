import React, {createContext, useState, useContext, useEffect} from 'react';
import {Appearance} from 'react-native';
import {color} from '../theme';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from 'src/store';
import {changeAppTheme} from '@mit-actions';

// Initial state based on system theme
const initialState = {
  isDarkTheme: Appearance.getColorScheme() === 'dark',
  dark: Appearance.getColorScheme() === 'dark',
  theme: Appearance.getColorScheme() === 'dark' ? color.dark : color.light,
  // changeTheme: theme => {},
};

const ThemeContext = createContext(initialState);

export const useTheme = () => useContext(ThemeContext);

const ThemeProvider = ({children}: any) => {
  const [dark, setDark] = useState(initialState.isDarkTheme);
  const store = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchStoredTheme = () => {
      if (store.home.theme === '') {
        dispatch(changeAppTheme('System Default'));
        const isDark = Appearance.getColorScheme() === 'dark';
        setDark(isDark);
      } else if (store.home.theme === 'System Default') {
        const isDark = Appearance.getColorScheme() === 'dark';
        setDark(isDark);
      } else {
        setDark(store.home.theme === 'dark');
      }
    };

    fetchStoredTheme();

    const listener = ({colorScheme}: any) => {
      if (store.home.theme === 'System Default') {
        setDark(colorScheme === 'dark');
      }
    };

    const subscription = Appearance.addChangeListener(listener);

    return () => {
      subscription.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store.home.theme]);

  const changeTheme = () => {
    if (store.home.theme === 'dark') {
      setDark(true);
    } else if (store.home.theme === 'light') {
      setDark(false);
    } else {
      setDark(initialState.isDarkTheme);
    }
  };

  const theme = dark ? color.dark : color.light;

  return (
    <ThemeContext.Provider
      value={{theme, dark, isDarkTheme: dark, changeTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};

const useThemedStyles = (styles: any) => {
  const {theme} = useTheme();
  return styles(theme);
};

export {ThemeContext, ThemeProvider, useThemedStyles};
