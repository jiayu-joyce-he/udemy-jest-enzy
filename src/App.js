/** @format */

import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import { render } from 'enzyme'

class App extends Component {
    render() {
        return (
            <div className='App' data-test='component-app'>
                <h1 data-test='counter-display'>The counter is currently: </h1>
                <button data-test='increment-button'>+</button>
            </div>
        )
    }
}

export default App
