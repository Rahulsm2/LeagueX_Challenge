import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, StatusBar, FlatList, Animated } from 'react-native';
import { gstyles } from '../components/common/GlobalStyles';
import { HEIGHT, OpenSans_Medium, WIDTH, app_Bg } from '../components/common/Constants';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';



const HomeComponent = (props) => {
    const navigation = useNavigation();
    const scrollY = useRef(new Animated.Value(0)).current;

    const renderItem = ({ item, index }) => {
        const imageTranslateY = scrollY.interpolate({
            inputRange: [(index - 1) * HEIGHT * 0.55, index * HEIGHT * 0.55, (index + 1) * HEIGHT * 0.55],
            outputRange: [-30, 0, 40],
            extrapolate: 'clamp',
        });

        let firstImage, secondImage;
        if (index % 2 === 0) {

            firstImage = <Image source={require('../assets/images/triangle.png')} style={[styles.float, { width: 50, height: 50, top: HEIGHT * 0.07, left: 20 }]} />
            secondImage = <Image source={require('../assets/images/circle.png')} style={[styles.float, { width: 130, height: 130, top: HEIGHT * 0.15, left: -15 }]} />
        } else {

            firstImage = <Image source={require('../assets/images/square.png')} style={[styles.float, { width: 50, height: 50, top: HEIGHT * 0.0, right: 20 }]} />
            secondImage = <Image source={require('../assets/images/x.png')} style={[styles.float, { width: 130, height: 130, top: HEIGHT * 0.1, right: -20 }]} />
        }


        return (
            <>
                {item.id == 1 ? (
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={[gstyles.OpenSans_Bold(15, '#197bd9'), { top: 20 }]}>{"GREAT GAMES"}</Text>
                        <Text style={[gstyles.OpenSans_SemiBold(24, '#777777'), { top: 20, marginBottom: 10 }]}>{"Coming Soon"}</Text>
                    </View>
                ) : null}
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.ImageContainer}
                    onPress={() => navigation.navigate('GameDetailScreen', { item })}
                >
                    <View>

                        <Animated.Image
                            source={item.imageUrl}
                            style={[
                                styles.Image,
                                { transform: [{ translateY: imageTranslateY }] },
                            ]}
                        />

                        <View>
                            <Text
                                style={[
                                    gstyles.OpenSans_Bold(20, '#FFFFFF'),
                                    { position: 'absolute', bottom: 80, left: 30 },
                                ]}
                            >
                                {item.name}
                            </Text>
                            <Text
                                style={[
                                    gstyles.OpenSans_SemiBold(16, '#FFFFFF'),
                                    { position: 'absolute', bottom: 60, left: 30 },
                                ]}
                            >
                                Exclusive PlayStation
                            </Text>
                            <Image
                                source={require('../assets/images/ps4.png')}
                                style={{
                                    width: 100,
                                    height: 30,
                                    tintColor: '#FFFFFF',
                                    position: 'absolute',
                                    bottom: 30,
                                    left: 30,
                                }}
                            />
                            <TouchableOpacity style={styles.AddIcon}>
                                <Entypo name="plus" size={25} color="#FFFFFF" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>
                {firstImage}
                {secondImage}


            </>
        );
    };

    return (
        <>
            <StatusBar
                backgroundColor={app_Bg}
                animated={true}
                barStyle="dark-content"
            />
            <View style={[gstyles.container(app_Bg)]}>
                <View style={[styles.header]}>
                    <TouchableOpacity style={{ left: 10 }}>
                        <FontAwesome5 name='grip-lines' size={35} color='#197bd9' />
                    </TouchableOpacity>

                    <Image source={require('../assets/images/ps5.png')}
                        style={{ width: 45, height: 45, left: WIDTH * 0.45, position: 'absolute' }}
                    />
                    <TouchableOpacity activeOpacity={0.6} style={{ left: WIDTH * 0.75, position: 'absolute' }}>
                        <Ionicons name='cart-outline' size={25} color='#197bd9' />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.6} style={{ right: 10 }}>
                        <Ionicons name='search' size={25} color='#197bd9' />
                    </TouchableOpacity>
                </View>



                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

                    <FlatList
                        data={props.data}
                        keyExtractor={(item) => item.id}
                        renderItem={renderItem}
                        showsVerticalScrollIndicator={false}
                        onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                            { useNativeDriver: false }
                        )}
                    />
                </View>
                {/* <Image source={require('../assets/images/triangle.png')} style={[styles.float, { width: 50, height: 50, top: HEIGHT * 0.2, left: 20 }]} />
                <Image source={require('../assets/images/circle.png')} style={[styles.float, { width: 130, height: 130, top: HEIGHT * 0.30, left: -20 }]} />
                <Image source={require('../assets/images/square.png')} style={[styles.float, { width: 50, height: 50, top: HEIGHT * 0.75, right: 20 }]} />
                <Image source={require('../assets/images/x.png')} style={[styles.float, { width: 130, height: 130, top: HEIGHT * 0.85, right: -20 }]} /> */}


            </View>


        </>
    );
}

export default HomeComponent;

const styles = StyleSheet.create({

    header: {
        width: WIDTH,
        justifyContent: 'center',
        backgroundColor: app_Bg,
        ...gstyles.inRowJSB,
        paddingHorizontal: 20,
        height: HEIGHT * 0.09,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    AddIcon: {
        position: 'absolute',
        right: 15,
        bottom: 30,
        backgroundColor: '#197bd9',
        borderRadius: 50,
        width: 35,
        alignItems: 'center',
        justifyContent: 'center',
        height: 35,
        elevation: 30
    },
    feature: {
        marginLeft: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10
    },
    float: {
        position: 'absolute',
        tintColor: '#197bd9'
    },
    ImageContainer: {
        flex: 1,
        margin: 20,
        width: WIDTH - 70,
        height: HEIGHT * 0.55,
        overflow: 'hidden',
        borderRadius: 25,
        elevation: 10,
        backgroundColor: 'F2F2F1'
    },
    Image: {
        width: '100%',
        height: '100%',
        borderRadius: 15,
        resizeMode: 'cover',
        opacity: 1,

    },

    share: {
        width: 22,
        height: 22,
        borderWidth: 0.6,
        borderColor: "#8338EC",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        bottom: 150,
        left: 60,
        backgroundColor: 'rgba(0, 0, 0, 0.4)'
    },
    AnalyticsCard: {
        width: WIDTH * 0.45,
        height: 'auto',
        backgroundColor: app_Bg,
        borderRadius: 10,
        alignSelf: 'center',
        borderWidth: 0.9,
        backgroundColor: 'transparent',

    },
    transCardView: {
        width: WIDTH - 35,
        alignSelf: 'center',
        marginTop: 8,
        backgroundColor: '#FFFFFF',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#0276E51A',
    },

});