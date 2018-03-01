import React, { Component } from 'react'
import apiURL from '../../config/apiConfig'
import SignInModal from './signInModal';

import fetch from 'isomorphic-unfetch'

class SignInButton extends Component {
    static async getInitialProps() {
        // const res = await fetch(apiURL('/user/me/basic'))
        // const json = await res.json()
        // return { currentUser: json.data }
    }

    a = async() => {
        const res = await fetch('http://localhost:10101/api/user/me/basic', {
            method: 'GET',
            credentials: 'same-origin',
            mode: 'no-cors'
        })
        // const json = await res.json()
        console.log(res)
    }

    componentDidMount() {
        this.a()
    }

    render() {
        return (
            <div>
                <button className="uk-button uk-button-default uk-margin-small-right" type="button" uk-toggle="target: #signin-modal">Sign In</button>
            </div>
        )
    }
}

export default SignInButton