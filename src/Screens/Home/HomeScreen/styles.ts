import {Dimensions, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },
  videoContainer: {
    width: '95%',
    height: 220,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  video: {
    width: '100%',
    height: '100%',
    borderWidth: 2,
    elevation: 4,
  },
});

export default styles;
