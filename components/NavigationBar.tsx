import { Stack, Navigator, Tabs } from "expo-router";
import React from "react";
// REACT NATIVE NAVIGATION BAR

export default function NavigationBar() {
    return (
        <Tabs>
            <Tabs.Screen name="index" options={{
                title: "Index",
            }} />
        </Tabs>
    );
}
