import React, { Component } from 'react'

export default class SignInModal extends Component {
    render() {
        return (
            <div id="signin-modal" uk-modal="">
                <div className="uk-modal-dialog uk-modal-body">
                    <h2 className="uk-modal-title">Sign In</h2>
                    <a href="/auth/facebook">FB</a><br />
                    <a href="/auth/google">G</a><br />
                    <a href="/auth/twitter">TW</a>
                </div>
            </div>
        )
    }
}