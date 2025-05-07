import {StyleSheet} from 'react-native';
import {colors, metrics, scale} from 'src/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.ghostWhite,
    padding: metrics.padding.md,
  },
  videoContainer: {
    width: '100%',
    height: scale(180),
    backgroundColor: colors.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: '100%',
    height: '100%',
    borderWidth: 2,
    elevation: 4,
  },
});

export default styles;
