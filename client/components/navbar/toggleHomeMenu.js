import react, { Component } from 'react'

class ToggleHomeMenu extends Component {
    render() {
        return (
            <div id={this.props.id} uk-offcanvas="flip: true; overlay: true">
                <div className="uk-offcanvas-bar uk-flex uk-flex-column"  >
                    <button className="uk-offcanvas-close" type="button" uk-close=''></button>

                    <ul className="uk-nav uk-nav-primary uk-nav-right uk-margin-auto-vertical">
                        <li><a href="#"><span className="uk-margin-small-right" uk-icon="icon: user"></span>Sign In</a></li>
                        <li><a href="#"><span className="uk-margin-small-right" uk-icon="icon: star"></span>Highlights</a></li>
                        <li><a href="#"><span className="uk-margin-small-right" uk-icon="icon: search"></span>Find Trip</a></li>
                        <li><a href="#"><span className="uk-margin-small-right" uk-icon="icon: calendar"></span>Booking</a></li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default ToggleHomeMenu