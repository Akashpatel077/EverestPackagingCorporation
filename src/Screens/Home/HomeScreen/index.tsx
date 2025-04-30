import React, {useRef, useEffect} from 'react';
import {View} from 'react-native';
import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-controls';
import styles from './styles';
import {Header} from 'src/Components';
import {Search, Menu} from 'assets/icons';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import {SEARCH_SCREEN} from 'src/Navigation/home/routes';
import CSafeAreaView from 'src/Components/CSafeAreaView';

const HomeScreen = () => {
  const navigation = useNavigation();
  const videoRef = useRef(null);
  const isFocused = useIsFocused();

  // useEffect(() => {
  //   if (!isFocused && videoRef.current) {
  //     videoRef.current.pause();
  //   }
  // }, [isFocused]);

  return (
    <CSafeAreaView removeBottomSafeArea>
      <View style={styles.container}>
        <Header
          icon1={Menu}
          onPressFirst={() => navigation.openDrawer()}
          icon2={Search}
          icon2Color="#FFF"
          onPressSecond={() => navigation.navigate(SEARCH_SCREEN)}
          title={'Everest Packaging'}
        />
        <View style={styles.videoContainer}>
          <VideoPlayer
            ref={videoRef}
            source={{
              uri: 'https://everestpackaging.co.in/wp-content/uploads/2022/04/Compressed-Video-For-Insta-Fb.mp4#t=5',
            }}
            style={styles.video}
            disableFullscreen
            disableBack
            // seekColor="#0088cc"
            controlColor="red"
            controlTimeout={10000}
            paused={!isFocused}
            repeat={true}
          />
          {/* <Video
            ref={videoRef}
            source={{
              uri: 'https://everestpackaging.co.in/wp-content/uploads/2022/04/Compressed-Video-For-Insta-Fb.mp4#t=5',
            }}
            style={styles.video}
            resizeMode="contain"
            repeat
            controls
            paused={!isFocused}
          /> */}
        </View>
      </View>
    </CSafeAreaView>
  );
};

export default HomeScreen;
