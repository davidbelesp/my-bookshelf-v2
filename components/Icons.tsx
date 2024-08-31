import { Feather } from "@expo/vector-icons";
import React from "react";

const size = 32;

interface Props {
    color: string;

}

export const HomeIcon = (props : Props) => {
    return <Feather name="home" size={size} {...props} />;
}

export const BooksIcon = (props : Props) => {
    return <Feather name="book" size={size} {...props} />;
}

export const InfoIcon = (props : Props) => {
    return <Feather name="info" size={size} {...props} />;
}

export const AddIcon = (props : Props) => {
    return <Feather name="plus" size={size} {...props} />;
}

export const ConfigIcon = (props : Props) => {
    return <Feather name="settings" size={size} {...props} />;
}

export const StatsIcon = (props : Props) => {
    return <Feather name="bar-chart-2" size={size} {...props} />;
}