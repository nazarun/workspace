import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import Header from './components/Header'
import LeftPanel from "./components/LeftPanel";
import Workspace from "./components/Workspace";
import './App.css';
import { client } from './ApolloClient';
import {gql} from "@apollo/client";

function App() {
    
    const [shapes, setShapes] = useState();
    
    useEffect(() => {
        client
          .query({
            query: gql`
                query GetShapes {
                    shapes {
                        id
                        title
                        x
                        y
                        width
                        height
                        background
                    }
                }
            `
        }).then(result => {
            console.log(result);
            setShapes(result.data.shapes);
        }).catch(err => console.log(err)); 
    }, [])
    
    
  return (
    <div className="App">
      <Header
        name='John'
      />
        <div className='mainContent'>
            <LeftPanel shapes={shapes} />
            <Workspace />

        </div>
    </div>
  );
}

export default App;
