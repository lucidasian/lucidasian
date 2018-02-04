import react, { Component } from 'react'

class SignInModal extends Component {
    render() {
        return (
            <div id="signin" uk-modal="">
                <div className="uk-modal-dialog uk-modal-body">
                    <button className="uk-modal-close-default" type="button" uk-close=''></button>
                    <h2 className="uk-modal-title uk-text-center">Sign In</h2>
                    <a href="#" className="" uk-icon="icon: twitter"></a>
                    <a href="#" className="" uk-icon="icon: facebook"></a>
                    <a href="#" className="" uk-icon="icon: google"></a>
                </div>
            </div>
        )
    }
}

export default SignInModal