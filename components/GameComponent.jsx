//this is a Game Component for react native
import { Link } from 'expo-router';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { getLatestGames } from '../lib/metacritic';

export default function GameComponent() {

    const [games, setGames] = useState([]);
    useEffect(() => {
        getLatestGames().then((data) => setGames(data));
    });

    return(
        <View style={styles.container}>
        <Link href="/about" className="text-4xl text-white">About</Link>
  
        <FlatList data={games}
          keyExtractor={(item) => item.slug}
          renderItem={({ item }) => ( 
            <View>
              <Image
                source={{ uri: item.image }}
                style={{ width: 100, height: 100 }}
              />
              <Text style={{color:'#fff'}}>{item.title}</Text>
              <Text style={{color:'#fff'}}>{item.description.slice(0, 100) + "..."}</Text>
              <Text style={{color:'#fff'}}>{item.score}</Text>
            </View>
          )}>
        </FlatList>
        <StatusBar style="dark" />
      </View>
    )

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#333',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
    },
  });

