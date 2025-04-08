import React from 'react';
import { View} from 'react-native';
import Video from 'react-native-video';
import styles from './styles';
import { Header } from 'src/Components';
import { Filter, Search } from 'assets/icons';
import { useNavigation } from '@react-navigation/native';
import { SEARCH_SCREEN } from 'src/Navigation/home/routes';

const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Header icon1={Search} onPressFirst={() => {navigation.navigate(SEARCH_SCREEN)}} icon2={Filter} icon2Color="#FFF" onPressSecond={() => {}}/>
      <View style={styles.videoContainer}>
        <Video
          source={{
            uri: 'https://everestpackaging.co.in/wp-content/uploads/2022/04/Compressed-Video-For-Insta-Fb.mp4#t=5',
          }}
          style={styles.video}
          resizeMode="contain"
          repeat
          controls
        />
      </View>
    </View>
  );
};



export default HomeScreen;
