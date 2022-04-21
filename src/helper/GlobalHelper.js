import React from "react";

export function Loader(){
    return (
        <h1>Loading---</h1>
    )
}

export function DataNotFound(props){
    return (
        <h1>Data Not Found</h1>
    )
}

export function isLogin() {

    if (typeof window !== 'undefined' && window.$token) {
        return true;
    }else{
        return false;
    }

}
export function UcFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function setLocal(key, value) {
    if(key && value) {
        localStorage.setItem(key, value);
        return true;
    }

    return false;
}

export function getLocal(key) {
    if(key) {
        return localStorage.getItem(key);
    }

    return false;
}

export function removeLocal(key) {
    if(key) {
        localStorage.removeItem(key);
        return true;
    }

    return false;
}




