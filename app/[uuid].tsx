import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, View, Image, StyleSheet, TextInput, Pressable, Switch } from "react-native";
import { BookModel } from "../Models/Book";
import colors from "../constants/colors";
import RNPickerSelect from 'react-native-picker-select';

import { getStatesDropdown } from "../Models/States";

import { getTypesDropdown } from "../Models/Types";
import { getBookByUuid, updateBook } from "../lib/booksManager";
import { AddIcon } from "../components/Icons";
import { CONSTANTS } from "../hooks/Constants";

export default function BookDeatils() {
    const uuid = getUUID();

    const [book, setBooks] = useState<BookModel>();
    useEffect(() => {
        getBookByUuid(uuid).then((book) => {
            setBooks(book as BookModel)
            console.log('ENTERING WITH BOOK', book);

            setData(book);
        });
    }, []);

    const [image, setImage] = useState(CONSTANTS.IMAGE_PLACEHOLDER);

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
    
    const [comments, setComments] = useState("");
    const [title, setTitle] = useState("");

    return (
        <View className="flex-auto flex-col p-6 justify-start items-center gap-4" style={{backgroundColor:colors.mainBackground}}>

            <View className="flex flex-row justify-between items-center w-full" style={styles.formBox}>
                <Pressable >
                    <Image
                        source={{ uri: image }}
                        style={{ width: 120, height: 170, backgroundColor: colors.text.color, borderRadius: 3 }}
                    />
                </Pressable>
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
                    placeholder="Set title"
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
                        placeholder="Set chapters read"
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
                        placeholder="Set volumes read"
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
                    onChangeText={setComments}
                    value={comments}
                />
            </View>

            <Pressable style={styles.button}
                className="flex justify-center items-center"
                onPress={() => {saveBook()}} >
                <AddIcon color={colors.extra.white} />
            </Pressable>

        </View>
    );

    function setData(book: BookModel | null) {
        setState(itemsState.find((item) => item.value === book?.state)?.value || "");
        setImage(book?.image || CONSTANTS.IMAGE_PLACEHOLDER);
        setScore(book?.score.toString() || "");
        setTitle(book?.title || "");
        setChapter(book?.chapter.toString() || "0");
        setVolume(book?.volume.toString() || "0");
        setNsfwEnabled(book?.nsfw || false);
        setType(itemsType.find((item) => item.value === book?.type)?.value || "");
        if (book?.comments && book?.comments.toString() !== "") {
            setComments(book.comments.toString()
            .replace(/,/g, ", ")
            .replace(/"/g, "")
            .replace("[", "")   
            .replace("]", ""));
        }

    }    

    function saveBook(){
        const book = {
            uuid: uuid,
            title: title,
            state: state,
            score: parseInt(score),
            chapter: parseInt(chapter),
            volume: parseInt(volume),
            nsfw: nsfwEnabled,
            type: type,
            comments: comments.split(", "),
            image: image,
            lastRead: Date.now(),
        } as BookModel;
        updateBook(book);
    }

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
        borderRadius: 5,
        padding: 8,
    },
    button: {
        backgroundColor: colors.text.color,
        position: "absolute",
        bottom: "3%",
        right: "6%",
        width: "17%",
        aspectRatio: 1,
        padding: 8,
        borderRadius: 9999,
    },

});

function getUUID() : string {
    const { uuid } = useLocalSearchParams();
    return uuid? uuid as string : "";
}

