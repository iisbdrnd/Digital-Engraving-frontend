import React, { Component } from 'react'

export const placeHolderText = "Type Job (min. 4 chars)"

export const fixedNumber = (number) =>{
    const result = number.toFixed(2);
    const getValue = parseFloat(result);
    return getValue;
}
