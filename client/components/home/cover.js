import React, { Component } from 'react'

/*
    This is class for `Cover` on the top of the Homepage.
 */

class Cover extends Component {

    render() {
        return (
            <div className="uk-position-relative uk-light" uk-slideshow='autoplay: true; autoplay-interval: 10000; animation: fade;' >
                <ul className="uk-slideshow-items" uk-height-viewport="offset-top: 0; offset-bottom: 0">
                    <li>
                        <img src="/static/img/demopic1.jpeg" alt="First Slide" uk-cover='' />
                    </li>
                    <li>
                        <img src="/static/img/demopic2.jpeg" alt="First Slide" uk-cover='' />
                    </li>
                </ul>
                <div className="uk-position-bottom-center uk-position-medium">
                    <ul className="uk-dotnav">
                        <li uk-slideshow-item="0"><a href="#">1</a></li>
                        <li uk-slideshow-item="1"><a href="#">2</a></li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default Cover