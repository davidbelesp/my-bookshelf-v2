import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, View, Image, StyleSheet, TextInput, Pressable, Switch } from "react-native";
import { getBook, getBooks } from "../lib/books";
import { BookModel } from "../Models/Book";
import colors from "../constants/colors";
import RNPickerSelect from 'react-native-picker-select';

import { getStates, getStatesDropdown } from "../Models/States";
import { styled } from "nativewind";
import { getTypesDropdown } from "../Models/Types";



export default function BookDeatils() {
    // const uuid = getUUID();
    const uuid = "1";
    
    const [book, setBooks] = useState<BookModel>();
    useEffect(() => {
        getBook(uuid).then(
            (data) => {
                setBooks(data);
                if(data){
                    setTitle(data.title);
                    setState(data.state);
                    setScore(data.score.toString());
                    setVolume(data.volume.toString());
                    setChapter(data.chapter.toString());
                    setType(data.type);
                }
            }
        );
    }, []);

    const [chapter, setChapter] = useState("");
    const [volume, setVolume] = useState("");
    
    const [nsfwEnabled, setNsfwEnabled] = useState(false);

    const [state, setState] = useState("");
    const [itemsState] = useState(
        getStatesDropdown()
    );

    const [type, setType] = useState("");
    const [itemsType] = useState(
        getTypesDropdown()
    );

    const [score, setScore] = useState("");
    const [itemsScore] = useState(
        Array.from({ length: 11 }, (_, index) => (index).toString()).map((item) => ({label: item, value: item,}))
    );

    const [title, setTitle] = useState("");

    return (
        <View className="flex-auto flex-col p-6 justify-start items-center gap-4" style={{backgroundColor:colors.mainBackground}}>

            <View className="flex flex-row justify-between items-center w-full" style={{backgroundColor:colors.text.color}}>
                <Image
                    source={{ uri: book?.image }}
                    style={{ width: 120, height: 170, backgroundColor: colors.text.color }}
                />
                <View className="flex-shrink flex-col pl-4 w-4/5">
                    <View className="flex-shrink justify-center items-center">
                        <Text className="mb-2 font-bold" style={{color:colors.extra.white}}>State</Text>
                    </View>
                    <RNPickerSelect
                        style={styles.dropdownStyle}
                        items={itemsState}
                        onValueChange={(value) => setState(value)}
                        value={state}
                    />
                    <View className="flex-shrink justify-center items-center">
                        <Text className="mb-2 font-bold" style={{color:colors.extra.white}}>Score</Text>
                    </View>
                    <RNPickerSelect
                        style={styles.dropdownStyle}
                        items={itemsScore}
                        onValueChange={(value) => setScore(value)}
                        value={score}
                    />
                </View>

            </View>

            <View style={styles.formBox} className="flex justify-center flex-col w-full">
                <View className="flex-shrink justify-center items-start ml-2">
                    <Text className="mb-2 font-bold" style={{color:colors.extra.white}}>TITLE</Text>
                </View>
                <TextInput
                    style={styles.input}
                    onChangeText={setTitle}
                    value={title}
                />
            </View>

            <View style={styles.formBox} className="flex justify-center flex-row w-full" >

                <View className="flex flex-col w-1/2">
                    <View className="flex-shrink justify-center items-start">
                        <Text className="mb-2 font-bold" style={styles.title}>CHAPTERS</Text>
                    </View>
                    <TextInput
                        style={styles.input}
                        onChangeText={ setChapter }
                        value={chapter}
                        placeholder="tetas"
                        keyboardType="numeric"
                    />
                </View>

                <View className="flex flex-col w-1/2">
                    <View className="flex-shrink justify-center items-start">
                        <Text className="mb-2 font-bold" style={styles.title}>VOLUMES</Text>
                    </View>
                    <TextInput
                        style={styles.input}
                        onChangeText={ setVolume }
                        value={volume}
                        placeholder="tetas"
                        keyboardType="numeric"
                    />

                </View>
            </View>

            <View style={styles.formBox} className="flex justify-center flex-row w-full" >

                <View className="flex flex-row items-center w-1/2">
                    <View className="flex justify-center items-center">
                        <Text className="font-bold" style={styles.title}>NSFW</Text>
                    </View>
                    <Switch
                        style={{marginLeft: 8}}
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={nsfwEnabled ? "#f4f3f4" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={() => setNsfwEnabled(!nsfwEnabled)}
                        value={nsfwEnabled}
                    />
                </View>

                <View className="flex flex-col w-1/2">
                    <RNPickerSelect
                        style={styles.dropdownStyle}
                        items={itemsType}
                        onValueChange={(value) => setType(value)}
                        value={type}
                    />
                </View>
            </View>

            <View style={styles.formBox} className="flex justify-center flex-col w-full">
                <View className="flex-shrink justify-center items-start ml-2">
                    <Text className="mb-2 font-bold" style={{color:colors.extra.white}}>COMMENTS</Text>
                </View>
                <TextInput
                    style={styles.input}
                    onChangeText={setTitle}
                    value={title}
                />
            </View>

            <Pressable style={styles.button}>
                <Text style={{color:colors.extra.white}}>Save</Text>
            </Pressable>

        </View>
    );

}

const pickerStyles = StyleSheet.create({
    inputIOS: {
        color: colors.extra.white,
        backgroundColor: colors.extra.transparent,
        borderRadius: 8,
    },
    inputAndroid: {
        color: colors.extra.white,
        backgroundColor: colors.extra.transparent,
        borderRadius: 8,
    },
});

const styles = StyleSheet.create({
    dropdownStyle: {
        ...pickerStyles,
        padding: 8,
        
    },
    dropDownContainerStyle: {
        position: "relative",
        top: 0,
        borderRadius: 2,
    },
    title:{
        color: colors.extra.white,
        paddingHorizontal: 8,
        fontWeight: "bold",
    },
    input: {
        backgroundColor: colors.extra.transparent,
        borderColor: colors.extra.white,
        color: colors.extra.white,
        paddingHorizontal: 8,
        borderBottomColor: colors.extra.white,
        borderBottomWidth: 1,
    },
    formBox: {
        elevation: 0,
        zIndex: 0,
        backgroundColor: colors.text.color,
        borderRadius: 8,
        padding: 8,
    },
    button: {
        backgroundColor: colors.extra.white,
        position: "absolute",
        bottom: 0,
        right: 0,
    }

});

function getUUID() : string {
    const { uuid } = useLocalSearchParams();
    return uuid? uuid as string : "";
}
