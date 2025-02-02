import { router } from 'expo-router';
import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, Dimensions, Pressable } from 'react-native';
import { theme } from '../../utils/theme';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = 350;

const HomeBannerCarousel = () => {
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const tabs = [
    {
      id: 1,
      title: 'Welcome to UnlockPi',
      subtitle: 'Your career compass for future opportunities.',
      button: 'Join Now',
      image: require('../../assets/images/bg2.png'),
      featuredImage: require('../../assets/images/engineer (1) 1.png'),
      link: '/(tabs)',
    },
    {
      id: 2,
      title: 'Latest News',
      subtitle: 'Stay updated with the latest news.',
      button: 'Join Now',
      image: require('../../assets/images/bg2.png'),
      featuredImage: require('../../assets/images/news_bg.png'),
      link: '/(tabs)/news',
    },
    {
      id: 3,
      title: 'Events',
      subtitle: 'Explore the latest events.',
      button: 'Join Now',
      image: require('../../assets/images/bg2.png'),
      featuredImage: require('../../assets/images/companies_bg.png'),
      link: '/(tabs)/events',
    },
    {
      id: 4,
      title: 'Companies',
      subtitle: 'Company search at your fingertips.',
      button: 'Join Now',
      image: require('../../assets/images/bg2.png'),
      featuredImage: require('../../assets/images/event_bg.png'),
      link: '/(tabs)/search',
    },
  ];

  useEffect(() => {
    const scrollInterval = setInterval(() => {
      if (currentIndex < tabs.length - 1) {
        flatListRef.current?.scrollToIndex({
          index: currentIndex + 1,
          animated: true,
        });
        setCurrentIndex(currentIndex + 1);
      } else {
        flatListRef.current?.scrollToIndex({
          index: 0,
          animated: true,
        });
        setCurrentIndex(0);
      }
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(scrollInterval);
  }, [currentIndex]);

  const renderItem = ({ item }: any) => (
    <Pressable onPress={() => router.push(`${item.link}`)}>
      <View style={styles.container}>
        {/* <Image source={item.image} style={styles.bgImage} /> */}
        <Image source={item.featuredImage} style={styles.featuredImage} />
        <View style={styles.content}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subtitle}>{item.subtitle}</Text>
        </View>
      </View>
    </Pressable>
  );

  return (
    <View>
      <FlatList
      key={tabs.length}
        ref={flatListRef}
        horizontal
        data={tabs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingHorizontal: 10 ,paddingBottom: 10}}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        snapToInterval={ITEM_WIDTH + 20} // Item width + horizontal margin
        decelerationRate="fast"
        onMomentumScrollEnd={(event) => {
          const newIndex = Math.round(event.nativeEvent.contentOffset.x / (ITEM_WIDTH + 20));
          setCurrentIndex(newIndex);
        }}
      />
      <View style={styles.pagination}>
        {tabs.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              index === currentIndex ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    overflow: 'hidden',
    minHeight: 140,
    borderWidth: 1,
    borderColor: theme.bordercolor,
    width: ITEM_WIDTH,
    // marginHorizontal: 10,
    height: 160,
    backgroundColor: theme.cardbg,
  },
  bgImage: {
    width: '100%',
    height: 150,
  },
  featuredImage: {
    position: 'absolute',
    width: 140,
    height: 140,
    left: 180,
    top: 12,
  },
  content: {
    position: 'absolute',
    padding: 20,
  },
  title: {
    fontSize: 22,
    maxWidth: 140,
    color: '#dc2626',
    fontFamily: 'Geist-SemiBold',
  },
  subtitle: {
    fontSize: 14,
    maxWidth: 170,
    marginVertical: 8,
    fontFamily: 'Geist-Medium',
    color: theme.darktext,
  },
  pagination: {
    position: 'absolute',
    flexDirection: 'row',
    // justifyContent: 'center
    // alignItems: 'center',
    
    top: 135,
    left: 140,
    // marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 5,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#E41E31',
  },
  inactiveDot: {
    backgroundColor: '#ccc',
  },
});

export default HomeBannerCarousel;
