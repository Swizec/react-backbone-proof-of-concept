import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import mobx, { observable, action, autorun } from 'mobx';
import { observer } from 'mobx-react';

import BackboneButton from './BackboneButton';

mobx.useStrict(true);

class Counter {
    @observable N = 0
}


@observer
class ButtonWrapper extends Component {
    constructor(props) {
        super(props);

        this._init();

        autorun(this._render.bind(this));
    }

    _init() {
        this.button = new BackboneButton({
            N: this.props.store.N
        });
        this.button.model.on('change:N', action('inc-counter', (_, N) => {
            this.props.store.N = N;
        }));
    }

    componentDidUpdate() { console.log('did updated'); this._render(); }
    componentDidMount() { this._render(); }

    _render() {
        this._cleanup();
        this._init();
        this.button.setElement(this.refs.anchor).render();
    }

    componentWillUnmount() { this._cleanup(); }

    _cleanup() {
        this.button.undelegateEvents();
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

class ReactButton extends Component {
    buttonClicked() {
        this.props.store.N += 10;
    }

    render() {
        return (
            <div>
                <p>React Button:</p>
                <button onClick={action('inc-counter', this.buttonClicked.bind(this))}>Jump click count +10</button>
            </div>
        );
    }
};

const CurrentCount = observer(({ store }) => (
    <p>Current count in store: {store.N}</p>
));

class App extends Component {
    counterStore = new Counter()

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
                <CurrentCount store={this.counterStore} />
                <ButtonWrapper store={this.counterStore} />
                <br/><br/>
                <ReactButton store={this.counterStore} />
            </div>
        );
    }
}

export default App;
