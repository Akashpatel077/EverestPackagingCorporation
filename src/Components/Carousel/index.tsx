import React, {useRef, useState} from 'react';
import {
  View,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const {width} = Dimensions.get('window');
const ITEM_WIDTH = width * 0.92;
const ITEM_HEIGHT = ITEM_WIDTH * 0.3;
const DOT_SIZE = 8;
const AUTO_SCROLL_INTERVAL = 3000;

interface CarouselProps {
  data: {id: string; image: string}[];
}

const Carousel: React.FC<CarouselProps> = ({data}) => {
  const flatListRef = useRef<FlatList>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / ITEM_WIDTH);
    setActiveIndex(index);
  };

  const goToNextSlide = () => {
    if (flatListRef.current) {
      const nextIndex = (activeIndex + 1) % data.length;
      flatListRef.current.scrollToIndex({index: nextIndex, animated: true});
    }
  };

  React.useEffect(() => {
    const interval = setInterval(goToNextSlide, AUTO_SCROLL_INTERVAL);
    return () => clearInterval(interval);
  }, [activeIndex]);

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={data}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity activeOpacity={0.8} style={styles.itemContainer}>
            <Image
              source={{uri: item.image}}
              style={styles.image}
              resizeMode="cover"
            />
          </TouchableOpacity>
        )}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{alignItems: 'center'}}
      />
      <View style={styles.pagination}>
        {data.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, activeIndex === index && styles.activeDot]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  itemContainer: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
  },
  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    backgroundColor: '#bbb',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#000',
  },
});

export default Carousel;
