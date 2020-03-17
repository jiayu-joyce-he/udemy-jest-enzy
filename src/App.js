/** @format */

import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import { render } from 'enzyme'

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            counter: 0
        }
    }
    render() {
        return (
            <div className='App' data-test='component-app'>
                <h1 data-test='counter-display'>
                    The counter is currently: {this.state.counter}
                </h1>
                <button
                    data-test='increment-button'
                    onClick={() =>
                        this.setState({ counter: this.state.counter + 1 })
                    }
                >
                    +
                </button>
            </div>
        )
    }
}

export default App
