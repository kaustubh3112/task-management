import { useState } from "react"

export const truncateText = (str, length) => {
    let newStr = str.length > length ? str.slice(0, length) + "..." : str.slice(0, length)
    return newStr
}


export const createInitial = (name) => {
    const colors = [
        "bg-red-500",
        "bg-orange-500",
        "bg-yellow-500",
        "bg-lime-500",
        "bg-green-500",
        "bg-emerald-500",
        "bg-teal-500",
        "bg-cyan-500",
    ];

    const userFullName = name.split(" ");
    const initial =
        userFullName[0][0] + userFullName[userFullName.length - 1][0];

    const colorIndex = name.length % colors.length;

    return {
        initial: initial.toUpperCase(),
        consistentColor: colors[colorIndex],
    };
};
