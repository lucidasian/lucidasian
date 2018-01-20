import React, { Component } from 'react'
import Home from "./home"
import Banner from '../components/home/banner'

class App extends Component {
    render() {
        return (
            <div>
                <Banner />
                <Home />
            </div>
        )
    }
}

export default App