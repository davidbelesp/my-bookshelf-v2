import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, View, Image, StyleSheet, TextInput } from "react-native";
import { getBook, getBooks } from "../lib/books";
import { BookModel } from "../Models/Book";
import { Dropdown } from "react-native-element-dropdown";
import colors from "../constants/colors";
import DropDownPicker from 'react-native-dropdown-picker';

import DropdownComponent from "../components/DropdownComponent";
import { getStates, getStatesDropdown } from "../Models/States";
import { styled } from "nativewind";

const DropDownPickerStyled = styled(DropDownPicker);

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
                }
            }
        );
    }, []);

    const [openState, setOpenState] = useState(false);
    const [state, setState] = useState(null);
    const [itemsState, setItemsState] = useState(
        getStatesDropdown()
    );

    const [openScore, setOpenScore] = useState(false);
    const [score, setScore] = useState(null);
    const [itemsScore, setItemsScore] = useState(
        Array.from({ length: 11 }, (_, index) => (index).toString()).map((item) => ({label: item, value: item,}))
    );

    const [title, setTitle] = useState("");



    return (
        <View className="flex-auto flex-col p-6 justify-center items-center" style={{backgroundColor:colors.mainBackground}}>

            <View className="flex-shrink flex-row justify-center items-center" style={{backgroundColor:colors.text.color}}>
                <Image
                source={{ uri: book?.image }}
                style={{ width: 110, height: 150, backgroundColor: colors.text.color }}
                />
                <View className="flex-shrink flex-col p-4">
                    <View className="flex-shrink justify-center items-center">
                        <Text className="mb-2 font-bold" style={{color:colors.extra.white}}>State</Text>
                    </View>
                    <DropDownPickerStyled
                        className="mb-2"
                        style={styles.stateDropdown}
                        containerStyle={{zIndex: 9}}
                        open={openState}
                        value={state}
                        items={itemsState}
                        setOpen={setOpenState}
                        setValue={setState}
                        setItems={setItemsState}
                        placeholder="Select the state"
                    />
                    <View className="flex-shrink justify-center items-center">
                        <Text className="mb-2 font-bold" style={{color:colors.extra.white}}>Score</Text>
                    </View>
                    <DropDownPickerStyled
                        className="mb-2"
                        style={styles.scoreDropdown}
                        containerStyle={{zIndex: 8}}
                        open={openScore}
                        value={score}
                        items={itemsScore}
                        setOpen={setOpenScore}
                        setValue={setScore}
                        setItems={setItemsScore}
                        placeholder="Select your score"
                    />
                </View>

            </View>

            <View style={styles.formBox} className="flex justify-center flex-col mt-4 w-full">
                <View>
                    <View className="flex-shrink justify-center items-center">
                        <Text className="mb-2 font-bold" style={{color:colors.extra.white}}>TITLE</Text>
                    </View>
                    <TextInput
                        style={styles.input}
                        onChangeText={setTitle}
                        value={title}
                    />
                </View>
            </View>

            <View style={styles.formBox} className="flex justify-center flex-col mt-4 w-full" >
                <View>
                    <View className="flex-shrink justify-center items-center">
                        <Text className="mb-2 font-bold" style={{color:colors.extra.white}}>TITLE</Text>
                    </View>
                    <TextInput

                    />
                </View>
            </View>


        </View>
    );
}

const styles = StyleSheet.create({

    scoreDropdown: {
      zIndex: 9,
      height: 50,
      borderRadius: 8,
      paddingHorizontal: 8,
      backgroundColor: colors.extra.white,
    },
    stateDropdown: {
        zIndex: 8,
        height: 50,
        borderRadius: 8,
        paddingHorizontal: 8,
        backgroundColor: colors.extra.white,
    },
    input: {
        backgroundColor: colors.extra.transparent,
        borderColor: colors.extra.white,
        color: colors.extra.white,
        padding: 8,
        borderRadius: 8,
    },
    formBox: {
        zIndex: -1,
        backgroundColor: colors.text.color,
        borderRadius: 8,
        padding: 8,
    }

});

function getUUID() : string {
    const { uuid } = useLocalSearchParams();
    return uuid? uuid as string : "";
}
