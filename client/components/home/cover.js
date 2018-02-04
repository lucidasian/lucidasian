import React, { Component } from 'react'

/*
    This is class for `Cover` on the top of the Homepage.
 */

class Cover extends Component {

    render() {
        return (
            <div className="uk-position-relative uk-light" uk-slideshow='autoplay: true; autoplay-interval: 10000; animation: fade;' >
                {/* Slideshow items */}
                <ul className="uk-slideshow-items" uk-height-viewport="offset-top: 0; offset-bottom: 0">
                    <li>
                        <img src="/static/img/demopic1.jpeg" alt="Slide" uk-cover='' />
                        <div className="uk-container uk-container-large uk-position-center-left uk-position-large uk-text-left uk-light">
                            <h1 className="uk-margin-remove-vertical cover-title-text">Some interesting message</h1>
                            <h4 className="uk-margin-remove-vertical">Find your Lucidasian trip ></h4>
                        </div>
                    </li>
                    <li>
                        <img src="/static/img/demopic2.jpeg" alt="Slide" uk-cover='' />
                        <div className="uk-container uk-container-large uk-position-center-left uk-position-large uk-text-left uk-light">
                            <h1 className="uk-margin-remove-vertical cover-title-text">Some interesting article title</h1>
                            <h4 className="uk-margin-remove-vertical">Read more</h4>
                        </div>
                    </li>
                </ul>
                {/* Arrow nav */}
                <a className="uk-position-center-left uk-position-small uk-hidden-hover uk-visible@m" href="#" uk-slidenav-previous='' uk-slideshow-item="previous"></a>
                <a className="uk-position-center-right uk-position-small uk-hidden-hover uk-visible@m" href="#" uk-slidenav-next='' uk-slideshow-item="next"></a>
                {/* Dots nav */}
                <div className="uk-position-bottom-center uk-position-small">
                    <ul className="uk-dotnav">
                        <li uk-slideshow-item="0"><a href="#"></a></li>
                        <li uk-slideshow-item="1"><a href="#"></a></li>
                    </ul>
                </div>

                <style jsx>{`
                    .cover-title-text {
                        font-size: 3.5em;
                        font-weight: 500;
                        max-width: 100%;
                    }               
                `}</style>
            </div>
        )
    }
}

export default Cover