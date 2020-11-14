import React, { useState } from 'react';
import './App.css';

import NavBar from "./components/navbar/navbar.component";
import Header from "./components/header/header.component";
import Acquainted from "./components/acquainted/acquainted.component";
import UsersList from "./components/usersList/usersList.component";
import Register from "./components/register/register.component";

function App() {
    const [needUpdateUsers, updateUsers] = useState(false);
    return (
        <div className="App">
            <NavBar/>
            <Header/>
            <Acquainted/>
            <UsersList needUpdateUsers={needUpdateUsers}/>
            <Register updateUsers={updateUsers} updateValue={needUpdateUsers}/>
        </div>
    );
}

export default App;
