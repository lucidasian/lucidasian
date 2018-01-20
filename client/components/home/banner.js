import React, { Component } from 'react'

/*
    This is class for `Banner` on the top of the Homepage.
 */

class Banner extends Component {
    render() {
        return (
            <div id="homeBanner" className="carousel slide" data-ride="carousel">
                {/* Indicators */}
                <ol className="carousel-indicators">
                    <li data-target="#homeBanner" data-slide-to="0" className="active"></li>
                    {/* <li data-target="#homeBanner" data-slide-to="1"></li> */}
                </ol>
                {/* Data */}
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <div
                            style={{
                                backgroundImage: `url('/static/img/demopic1.jpeg')`,
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                                backgroundAttachment: 'fixed',
                                backgroundPosition: 'center',
                                height: '100vh',
                                width: 'auto'
                            }}>
                        </div>
                    </div>
                    {/* <div className="carousel-item">
                        <img className="d-block w-100" src="/static/img/demopic2.jpeg" alt="Second slide" />
                    </div> */}
                </div>
                {/* Slide button */}
                <a className="carousel-control-prev" href="#homeBanner" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#homeBanner" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
        )
    }
}

export default Banner