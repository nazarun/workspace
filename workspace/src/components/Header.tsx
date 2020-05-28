import React from 'react';
import '../App.css';

interface HeaderProps {
    name?: string;
}

const getDate = () => {
    let dateObj = new Date()
    let year = dateObj.getFullYear()
    let month = dateObj.getMonth()
    let day = dateObj.getDate()
    return `${year} , ${month}, ${day}`
}

const Header: React.FC<HeaderProps> = (props: HeaderProps) => (
    <div className='App-header'>
        <h1>Hello, {props.name} Today is {getDate()}</h1>
    </div>
);

Header.defaultProps = {
    name: 'User',
};

export default Header;
