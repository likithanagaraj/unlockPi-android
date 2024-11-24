import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Animated,
  Pressable,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

const SCREEN_WIDTH = Dimensions.get('window').width;
const CAROUSEL_ITEM_WIDTH = SCREEN_WIDTH;

type CarouselItemType = {
  type: 'card' | 'link';
  title: string;
  content: string;
  link: string;
};

const carouselItems: CarouselItemType[] = [
  {
    type: 'link',
    title: 'Latest News',
    content: 'Stay updated with the newest Raspberry Pi announcements and releases.',
    link: '/(tabs)/news',
  },
  {
    type: 'link',
    title: 'Featured Companies',
    content: 'Explore companies leveraging Raspberry Pi in innovative ways.',
    link: '/(tabs)/search',
  },
  {
    type: 'link',
    title: 'Upcoming Events',
    content: 'Join Raspberry Pi enthusiasts at our upcoming events and workshops.',
    link: '/(tabs)/events',
  },
];

// Banner Component
const Banner = ({ title, content }: { title?: string; content?: string }) => {
  return (
    <LinearGradient
      colors={['#FFFFFF', '#DE3333']}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y:  0}}
      style={styles.bannerContainer}
    >
      <Text style={styles.title}>{title || 'Welcome to UnlockPi'}</Text>
      <Text style={styles.content} numberOfLines={3}>
        {content ||
          'Discover the latest in Raspberry Pi innovations and community projects.'}
      </Text>
     <Pressable onPress={()=>router.push(`/${title}`)}>
     <Text className='w-32 h-12 font-semibold text-[16px] bg-black text-white text-center align-middle rounded-md mt-2'>Join Now</Text>
     </Pressable>
    </LinearGradient>
  );
};

const HomeBannerCarousel = ({ navigation }: any) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timer = setInterval(() => {
      if (scrollViewRef.current) {
        const nextIndex = (currentIndex + 1) % (carouselItems.length + 1); // Loop back to the first banner
        scrollViewRef.current.scrollTo({
          x: nextIndex * CAROUSEL_ITEM_WIDTH,
          animated: true,
        });
        setCurrentIndex(nextIndex);
      }
    }, 5000);

    return () => clearInterval(timer); // Cleanup timer on unmount
  }, [currentIndex]);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false }
  );

  const handleMomentumScrollEnd = (event: any) => {
    const newIndex = Math.round(
      event.nativeEvent.contentOffset.x / CAROUSEL_ITEM_WIDTH
    );
    setCurrentIndex(newIndex);
  };

 

  const renderItem = (item: CarouselItemType, index: number) => (
    <TouchableOpacity
      key={index}
      style={styles.carouselItem}
      onPress={() => router.push(item.link)}
    >
      <Banner title={item.title} content={item.content} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Carousel */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        scrollEventThrottle={16}
      >
        {/* Default Banner */}
        <View style={styles.carouselItem}>
          <Banner />
        </View>
        {carouselItems.map((item, index) => renderItem(item, index))}
      </ScrollView>

      {/* Pagination */}
      <View style={styles.pagination}>
        {[...Array(carouselItems.length + 1)].map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              currentIndex === index && styles.paginationDotActive,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 250,
    marginBottom: 20,
  },
  carouselItem: {
    width: CAROUSEL_ITEM_WIDTH,
    
  },
  bannerContainer: {
    borderRadius: 10,
    padding: 20,
    height: 200,
    justifyContent: 'center',

  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000000',
  },
  content: {
    fontSize: 16,
    color: '#333333',
    lineHeight: 22,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: '#333',
    width: 12,
    height: 12,
    borderRadius: 6,
  },
});

export default HomeBannerCarousel;
