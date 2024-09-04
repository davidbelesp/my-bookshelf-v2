import { Tabs } from "expo-router";
import React from "react";
import { View, Text } from "react-native";   

import { AddIcon, BooksIcon, ConfigIcon, HomeIcon, InfoIcon, StatsIcon } from "../../components/Icons";
import Books from "./books";
import colors from "../../constants/colors";
import { StatusBar } from "expo-status-bar";

export default function TabsLayout() {
    return (
        <View className="flex-1">
            <Tabs screenOptions={
                {
                    headerShown: false,
                }
            }>
                <Tabs.Screen name="books" options={{
                    tabBarIcon: ({color}) => <BooksIcon color={color} />,
                }} />
                <Tabs.Screen name="stats" options={{
                    tabBarIcon: ({color}) => <StatsIcon color={color} />,
                }} />
                <Tabs.Screen name="addbook" options={{
                    tabBarIcon: ({color}) => <AddIcon color={color} />,
                }} />
                <Tabs.Screen name="about" options={{
                    tabBarIcon: ({color}) => <InfoIcon color={color} />,
                }} />
                <Tabs.Screen name="configuration" options={{
                    tabBarIcon: ({color}) => <ConfigIcon color={color} />,
                }} />
                
            </Tabs>
            <StatusBar style="light" />
        </View>
    );
}