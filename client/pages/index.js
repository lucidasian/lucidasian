import React, { Component } from 'react'
import Cover from '../components/home/cover'
import Highlights from '../components/home/highlights'
import Trips from '../components/home/trips'
import Booking from '../components/home/booking'
import Navbar from '../components/navbar/navbar'

class App extends Component {
    render() {
        return (
            <div>
                <Cover />
                <Navbar />
                <Highlights />
                <Trips />
                <Booking />
            </div>
        )
    }
}

export default App