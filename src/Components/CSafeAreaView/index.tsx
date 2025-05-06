import React from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView, SafeAreaViewProps} from 'react-native-safe-area-context';
import {colors} from 'src/theme';

interface CSafeAreaViewProps extends SafeAreaViewProps {
  children: React.ReactNode;
  removeBottomSafeArea?: boolean;
}

const CSafeAreaView: React.FC<CSafeAreaViewProps> = ({
  children,
  removeBottomSafeArea,
  ...props
}) => {
  return (
    <SafeAreaView
      edges={removeBottomSafeArea ? ['top'] : ['top', 'bottom']}
      style={styles.container}
      {...props}>
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {backgroundColor: colors.white, flex: 1},
});

export default CSafeAreaView;
