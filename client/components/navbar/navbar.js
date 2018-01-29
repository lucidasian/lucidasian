import React, { Component } from 'react'
import ToggleHomeMenu from './toggleHomeMenu'

/*
    Navigation Bar
    Tabs
*/

class Navbar extends Component {
    render() {
        return (
            <div className="uk-position-top uk-container uk-container-large" >
                <nav className="uk-navbar-container uk-navbar-transparent" uk-navbar="" >
                    {/* logo on the left */}
                    <div className="uk-navbar-left">
                        <a href="/" className="uk-navbar-item uk-logo nb-link logoText">Lucidasian</a>
                    </div>
                    {/* Toggle button */}
                    <div className="uk-navbar-right uk-hidden@m">
                        <a className="uk-navbar-toggle nb-link" uk-navbar-toggle-icon='' uk-toggle="target: #toggleMenu" ></a>
                    </div>
                    {/* Ordinary Menu */}
                    <div className="uk-navbar-right uk-visible@m">
                        <a href="#" className="uk-navbar-item nb-link">Highlights</a>
                        <a href="#" className="uk-navbar-item nb-link">Find Trip</a>
                        <a href="#" className="uk-navbar-item nb-link">Booking</a>
                        <a href="#" id="signinButton" className="nb-link">Sign In</a>
                    </div>
                </nav>
                {/* Off-canvas Menu */}
                <ToggleHomeMenu id="toggleMenu" />
                <hr />
                <style jsx>{`
                    .nb-link {
                        color: white;
                        font-size: 20px;
                        text-decoration: none;
                        cursor: pointer;
                    }
                    .nb-link:hover {
                        color: #cccccc;
                    }
                    .logoText {
                        font-size: 40px;
                    }
                    #signinButton {
                        margin-left: 15px;
                        border: solid 1px #fff;
                        border-radius: 20px;
                        padding: 5px;
                        padding-left: 20px;
                        padding-right: 20px
                    }
                `}</style>
            </div>
        )
    }
}

export default Navbar