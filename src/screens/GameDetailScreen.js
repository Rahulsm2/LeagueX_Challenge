import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, StatusBar, TouchableOpacity, Easing } from 'react-native';
import { HEIGHT, WIDTH, app_Bg } from '../components/common/Constants';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import { gstyles } from '../components/common/GlobalStyles';

const GameDetailScreen = ({ route }) => {
  const { item } = route.params;
  const [showHeader, setShowHeader] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHeader(true);
      setTimeout(() => setShowButton(true), 0);
    }, 50);

    return () => clearTimeout(timer);
  }, []);


  return (
    <View style={[gstyles.container(app_Bg)]}>
      <StatusBar
        backgroundColor='#000000'
        animated={true}
        barStyle="light-content"
      />
      {showHeader && (
        <View style={styles.header}>
          <TouchableOpacity style={{ left: 10 }}>
            <FontAwesome5 name='grip-lines' size={35} color='#FFFFFF' />
          </TouchableOpacity>

          <Image source={require('../assets/images/ps5.png')}
            style={{ width: 45, height: 45, left: WIDTH * 0.45, position: 'absolute', tintColor: '#FFFFFF' }}
          />
          <TouchableOpacity activeOpacity={0.6} style={{ left: WIDTH * 0.75, position: 'absolute' }}>
            <Ionicons name='cart-outline' size={25} color='#FFFFFF' />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.6} style={{ right: 10 }}>
            <Ionicons name='search' size={25} color='#FFFFFF' />
          </TouchableOpacity>
        </View>
      )}
      <Image source={item.imageUrl} style={styles.fullImage} />
      {showButton && (
        <Animatable.View
          animation={{
            from: { scale: 0 },
            to: { scale: 1 },
            easing: Easing.ease,
            useNativeDriver: false,
          }}
          duration={1000}
          style={styles.gameIconPopup}
        >
          <Ionicons name="game-controller" size={30} color="white" />
          <Text style={[gstyles.OpenSans_SemiBold(10, '#FFFFFF')]}>GAMES</Text>
        </Animatable.View>
      )}
      <View style={styles.detailContainer}>

        <Text style={[gstyles.OpenSans_Bold(20, '#FFFFFF'), styles.highlightText, { margin: 5 }]}>{item.name}</Text>
        <Text style={[gstyles.OpenSans_SemiBold(16, '#FFFFFF'), styles.highlightText, { margin: 5 }]}>Exclusive PlayStation</Text>
        <Image source={require('../assets/images/ps4.png')} style={styles.ps4Image} />

        <Animatable.View
          animation={{
            from: { top: showButton ? 150 : 150 },
            to: { top: showButton ? 60 : 150 },
            easing: Easing.ease,
            useNativeDriver: false,
          }}
          duration={800}
        >
          <TouchableOpacity style={styles.button}>
            <Text style={[gstyles.OpenSans_SemiBold(16, '#FFFFFF'), styles.highlightText, { margin: 13 }]}>PRE - ORDER NOW</Text>
          </TouchableOpacity>
        </Animatable.View>
        <Animatable.View
          animation={{
            from: { top: showButton ? 250 : 250 },
            to: { top: showButton ? 60 : 250 },
            easing: Easing.ease,
            useNativeDriver: false,
          }}
          duration={800}
        >
          <Image source={require('../assets/images/pegi.png')} style={styles.logo} />
        </Animatable.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: WIDTH,
    justifyContent: 'center',
    backgroundColor: '#000000',
    paddingVertical: 15,
    ...gstyles.inRowJSB,
    paddingHorizontal: 20,
    height: HEIGHT * 0.09,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  highlightText: {
    textShadowColor: 'rgba(0, 0, 0, 0.95)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  button: {
    flex: 1,
    backgroundColor: '#1a7ad9',
    width: WIDTH * 0.9,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    elevation: 10,
  },
  fullImage: {
    flex: 1,
    width: '100%',
    resizeMode: 'cover',
  },
  detailContainer: {
    position: 'absolute',
    bottom: 110,
    left: 20,
  },
  logo: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 60,
    position: 'absolute',
    bottom: HEIGHT * 0.14,
    right: 10
  },
  ps4Image: {
    width: 100,
    height: 30,
    tintColor: '#FFFFFF',
    margin: 5
  },
  gameIconPopup: {
    position: 'absolute',
    right: 20,
    top: HEIGHT * 0.13, // Adjust the position as needed
    width: 60,
    height: 60,
    backgroundColor: '#1a7ad9',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
  },
});

export default GameDetailScreen;
