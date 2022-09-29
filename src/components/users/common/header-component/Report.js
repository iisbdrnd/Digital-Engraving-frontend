/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import "./reportDropdown.css";

const Report = () => {
    return (
        <>
            <div class="dropdown">
                <button class="dropbtn">Report</button>
                <div class="dropdown-content">
                    <a href="#">Link 1</a>
                    <a href="#">Link 2</a>
                    <a href="#">Link 3</a>
                </div>
            </div>
        </>
    );
};

export default Report;