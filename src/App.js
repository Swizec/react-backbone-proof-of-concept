import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import BackboneButton from './BackboneButton';

class ButtonWrapper extends Component {
    button = new BackboneButton();

    componentDidUpdate() {
        this._render();
    }

    componentDidMount() {
        this._render();
    }

    _render() {
        this.button.setElement(this.refs.anchor).render();
    }

    render() {
        return <div className="button-anchor" ref="anchor" />
    }
}

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>Welcome to React</h2>
                </div>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
                <ButtonWrapper />
            </div>
        );
    }
}

export default App;
