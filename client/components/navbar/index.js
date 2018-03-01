import React, { Component } from 'react'
import SignInButton from './signInButton'
import SignInModal from './signInModal';

class NavBar extends Component {
    render() {
        return (
            <div>
                <SignInButton />
                <SignInModal />
            </div>
        )
    }
}

export default NavBar