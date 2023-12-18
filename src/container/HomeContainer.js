import React from 'react';
import { View, Text } from 'react-native';
import HomeComponent from '../screens/HomeComponent';

const HomeContainer = () => {
    const data = [
        { id: '1', imageUrl: require('../assets/images/cyberpunk.jpg'), name: "Cyberpunk 2077" },
        { id: '2', imageUrl: require('../assets/images/Ghost_of_Tsushima.jpg'), name: "Ghost of Tsushima" },
        { id: '3', imageUrl: require('../assets/images/lastofus.jpg'), name: "The Last of us Part II" },
        { id: '4', imageUrl: require('../assets/images/predator.jpg'), name: "Predator Hunting Grounds" },
        { id: '5', imageUrl: require('../assets/images/doom_eternal.jpg'), name: "Doom Eternal" },
        { id: '6', imageUrl: require('../assets/images/avenger.jpg'), name: "Marvel Avengers" },
    ];


    return (
        <HomeComponent
            data={data} />
    )
}

export default HomeContainer;