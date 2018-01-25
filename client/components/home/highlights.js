import react, { Component } from 'react'

class Highlights extends Component {
    render() {
        return (
            <div className="uk-section uk-section-default">
                <div className="uk-container uk-container-large">
                    <div className="uk-grid-match uk-child-width-1-2@s" uk-grid=''>
                        {/* Child 1 */}
                        <div>
                            <h3>Comming Soon ...</h3>
                        </div>
                        {/* Child 2 */}
                        <div>
                            <h3>Comming Soon ...</h3>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Highlights