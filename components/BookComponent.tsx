import React, { useEffect, useState } from 'react';
import { Text, View, Image, Pressable } from 'react-native';
import { BookModel } from '../Models/Book';
import colors from '../constants/colors';
import { Link } from 'expo-router';
import { styled } from 'nativewind';
import { CONSTANTS } from '../hooks/Constants';

const StyledPressable = styled(Pressable);

export default function Book({ book }: { book: BookModel }) {

    return(
        //<Link href={`/UUID`} asChild className='mb-2'>
        <Link href={`/${book.uuid}`} asChild className='mb-2'>
            <StyledPressable>
                <View className="flex-1 flex-row " style={{backgroundColor:colors.mainCard}}>
                    <Image
                    source={{ uri: book.image ? book.image : CONSTANTS.IMAGE_PLACEHOLDER }}
                    style={{ width: 100, height: 130, backgroundColor: colors.text.color }}
                    />

                    <View className="flex-1 flex-col pt-2 pb-2">
                        <View className="flex-1 flex-col justify-center items-center">
                            <View className="flex-1 flex-row justify-center items-center mb-2">
                                <Text className="text-base" style={{color:colors.extra.white, fontWeight:'900'}}>{book.title}</Text>
                            </View>
                            
                            <View className="flex-1 flex-row justify-center gap-24 mb-1">
                                <Text className="text-xs align-" style={{color:colors.extra.unfocused}}>{book.type}</Text>
                                <Text className="text-xs" style={{color:colors.extra.unfocused}}>{book.state}</Text>
                            </View>
                        </View>

                        <View className='flex-1 items-center'>
                            <View className='bg-gray-300 w-10/12 ' style={{height:1}}></View>
                        </View>

                        <View className="flex-1 flex-col justify-center items-center">
                            <View className="flex-1 flex-row justify-center gap-16">
                                <Text className="text-xl" style={{color:colors.text.color, fontWeight:'900'}}>{book.chapter}</Text>
                                <Text className="text-xl" style={{color:colors.text.color, fontWeight:'900'}}>{book.volume}</Text>
                            </View>

                            <View className="flex-1 flex-row justify-center gap-6">
                                <Text className="" style={{color:colors.text.color}}>CHAPTERS</Text>
                                <Text className="" style={{color:colors.text.color}}>VOLUMES</Text>     
                            </View>
                        </View>

                        
                    
                    </View>

                    <View className='absolute bottom-0 p-2 rounded-r-lg' style={{backgroundColor:colors.text.color}}>
                            <Text style={{color:colors.extra.white}}>{book.score}</Text>
                    </View>

                </View>
            </StyledPressable>
        </Link>
    )
}