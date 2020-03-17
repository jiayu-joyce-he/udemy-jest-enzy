/** @format */

import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import { render } from 'enzyme'

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            counter: 0,
            error: false
        }
    }
    render() {
        return (
            <>
                <div style={{ padding: '30px' }}>
                    <p>In this exercise, I will </p>
                    <ul>
                        <li>set up a simple react app with Jest and Enzyme.</li>
                        <li>
                            use enzyme's <i>shallow()</i> function to render a
                            comoonent
                        </li>
                        <li>
                            Test that required DOM elements were rendering using{' '}
                            <i>find()</i>
                        </li>
                        <li>
                            Test state using Enzyme's <i>setState()</i> and{' '}
                            <i>state()</i>
                        </li>
                        <li>
                            use <i>simulate</i>to interact with rendered
                            elements (clicked button)
                        </li>
                        <li>test component for updates after interaction</li>
                        <li>
                            created re-usable <i>setup()</i> and{' '}
                            <i>findByTestAttr()</i> functions
                        </li>
                    </ul>
                    <p>Additional Rules:</p>
                    <ul>
                        <li>count can't go below 0</li>
                    </ul>
                </div>

                <div className='App' data-test='component-app'>
                    <h1 data-test='counter-display'>
                        The counter is currently: {this.state.counter}
                    </h1>
                    <button
                        data-test='increment-button'
                        onClick={() =>
                            this.setState({
                                counter: this.state.counter + 1,
                                error: this.state.counter >= 0 ? false : true
                            })
                        }
                    >
                        +
                    </button>
                    <button
                        data-test='decrement-button'
                        onClick={() => {
                            if (this.state.counter === 0) {
                                return this.setState({ error: true })
                            } else {
                                this.setState({
                                    counter: this.state.counter - 1,
                                    error: false
                                })
                            }
                        }}
                    >
                        -
                    </button>
                    {this.state.error && (
                        <h3 data-test='errorMessage'>
                            The counter can't go below zero
                        </h3>
                    )}
                </div>
            </>
        )
    }
}

export default App
