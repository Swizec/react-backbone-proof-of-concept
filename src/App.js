import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import mobx, { observable, action, autorun } from 'mobx';
import { observer, Provider, inject } from 'mobx-react';
import DevTools from 'mobx-react-devtools';

import BackboneButton from './BackboneButton';

mobx.useStrict(true);

class CounterStore {
    @observable N = 0

    @action('set') set(N) {
        this.N = N;
    }

    @action('inc') inc(delta) {
        this.N += delta;
    }
}


@inject('counterStore') @observer
class ButtonWrapper extends Component {
    constructor(props) {
        super(props);

        autorun(this._render.bind(this));
    }

    _init() {
        this.button = new BackboneButton({
            N: this.props.counterStore.N
        });
        this.button.model.on('change:N', (_, N) => {
            this.props.counterStore.set(N);
        });
    }

    componentDidUpdate() { this._render(); }
    componentDidMount() { this._render(); }

    _render() {
        this._cleanup();
        this._init();
        this.button.setElement(this.refs.anchor).render();
    }

    componentWillUnmount() { this._cleanup(); }

    _cleanup() {
        if (this.button) {
            this.button.undelegateEvents();
        }
    }

    render() {
        return (
            <div>
                <p>Backbone Button:</p>
                <div className="button-anchor" ref="anchor" />
            </div>
        );
    }
}

@inject('counterStore')
class ReactButton extends Component {
    buttonClicked() {
        this.props.counterStore.inc(10);
    }

    render() {
        return (
            <div>
                <p>React Button:</p>
                <button onClick={this.buttonClicked.bind(this)}>Jump click count +10</button>
            </div>
        );
    }
};

@inject('counterStore') @observer
class CurrentCount extends Component {
    render() {
        const { N } = this.props.counterStore;
        return (<p>Current count in counterStore: {N}</p>)
    }
}
7
class App extends Component {
    counterStore = new CounterStore()

    render() {

        return (
            <Provider counterStore={this.counterStore}>
                <div className="App">
                    <DevTools />
                    <div className="App-header">
                        <img src={logo} className="App-logo" alt="logo" />
                        <h2>Welcome to React</h2>
                    </div>
                    <p className="App-intro">
                        To get started, edit <code>src/App.js</code> and save to reload.
                    </p>

                    <CurrentCount />
                    <ButtonWrapper />
                    <br/><br/>
                    <ReactButton />
                </div>
            </Provider>
        );
    }
}

export default App;
