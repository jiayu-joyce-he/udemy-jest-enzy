/** @format */

import React from 'react'
import Enzyme, { shallow, ShallowWrapper } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import { render } from '@testing-library/react'

import App from './App'

Enzyme.configure({ adapter: new EnzymeAdapter() }) //let enzyme know to use react-16 to create its virtual DOM

/**
 * Factory function to create a ShallowWrapper for the App component
 * @function setup
 * @param {object} props - Component props specific to this setup
 * @param {any} state - Initial state for setup
 * @returns {ShallowWrapper}
 */
const setup = (props = {}, state = null) => {
    const wrapper = shallow(<App {...props} />)
    if (state) {
        wrapper.setState(state)
    }
    return wrapper
}

/**
 * Return ShallowWrapper containing nodes(s) with the given data-test value.
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper to search within
 * @param {string} val - value of data-set attribute for search
 * @return {ShallowWrapper}
 */
const findByTestAttr = (wrapper, val) => {
    return wrapper.find(`[data-test="${val}"]`)
}

test('renders without crashing', () => {
    const wrapper = setup() // shallow rendering: render parent. but use placeholders
    const appComponent = findByTestAttr(wrapper, 'component-app')
    expect(appComponent.length).toBe(1)
})

test('renders increment button', () => {
    const wrapper = setup()
    const button = findByTestAttr(wrapper, 'increment-button')
    expect(button.length).toBe(1)
})

test('renders counter display', () => {
    const wrapper = setup()
    const counterDisplay = findByTestAttr(wrapper, 'counter-display')
    expect(counterDisplay.length).toBe(1)
})

test('counter starts at 0', () => {
    const wrapper = setup()
    const initialCounterState = wrapper.state('counter')
    expect(initialCounterState).toBe(0)
})

test('clicking button increments counter display', () => {
    const counter = 7
    const wrapper = setup(null, { counter })
    const button = findByTestAttr(wrapper, 'increment-button')
    button.simulate('click')
    const counterDisplay = findByTestAttr(wrapper, 'counter-display')
    expect(counterDisplay.text()).toContain(counter + 1) //don't forget to evoke text i.e. text()
})

test('render decrement button', () => {
    const wrapper = setup()
    const decrementButton = findByTestAttr(wrapper, 'decrement-button')
    expect(decrementButton.length).toBe(1)
})

test('click decrementButton decrements counter display', () => {
    const counter = 7
    const wrapper = setup(null, { counter })
    const button = findByTestAttr(wrapper, 'decrement-button')
    button.simulate('click')
    const counterDisplay = findByTestAttr(wrapper, 'counter-display')
    expect(counterDisplay.text()).toContain(counter - 1)
})

test('click decrementButton will no go below 0', () => {
    const counter = 0
    const wrapper = setup(null, { counter })
    const button = findByTestAttr(wrapper, 'decrement-button')
    button.simulate('click')
    const counterDisplay = findByTestAttr(wrapper, 'counter-display')
    expect(counterDisplay.text()).toContain(0)
})

test('display an error message when counter is trying to go below zero', () => {
    const counter = 0
    const wrapper = setup(null, { counter })
    const button = findByTestAttr(wrapper, 'decrement-button')
    button.simulate('click')
    const errorMessage = findByTestAttr(wrapper, 'errorMessage')
    expect(errorMessage.text()).toBe("The counter can't go below zero")
})

test('not render error message when counter is not going below zero', () => {
    const counter = 2
    const wrapper = setup(null, { counter })
    const button = findByTestAttr(wrapper, 'decrement-button')
    button.simulate('click')
    const errorMessage = findByTestAttr(wrapper, 'errorMessage')
    expect(errorMessage.length).toBe(0)
})

test('the error is not rendered after increment button is clicked', () => {
    const counter = 0
    const wrapper = setup(null, { counter })
    const decrementButton = findByTestAttr(wrapper, 'decrement-button')
    decrementButton.simulate('click')
    let errorMessage = findByTestAttr(wrapper, 'errorMessage')
    expect(errorMessage.length).toBe(1)
    const incrementButton = findByTestAttr(wrapper, 'increment-button')
    incrementButton.simulate('click')
    errorMessage = findByTestAttr(wrapper, 'errorMessage')
    expect(errorMessage.length).toBe(0)
})
