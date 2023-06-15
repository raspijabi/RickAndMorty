import React from 'react'
import { View, Text, Image } from 'react-native'
import { Character } from '../interfaces/Character';

interface Props {
    character: Character;
}

export const CharacterComponent = ({character}: Props ) => {

    return (
        <View style={{
            alignItems: 'center',
        }}>
            <Image
                source={{uri: character.image}}
                style={{
                    width: 60,
                    height: 60,
                    borderRadius: 100,
                }}
            />
            <Text style={{
                textAlign: 'center',
                fontSize: 13,
                color: 'black',
            }}>{character.name}</Text>
        </View>
    )
}