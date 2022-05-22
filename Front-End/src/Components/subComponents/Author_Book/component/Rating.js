import StarRatings from 'react-star-ratings';
import React, { Component, Fragment } from 'react';

export default class StarRating extends Component {

    constructor(props) {
        super(props);

        this.state = { Average: 5 }
        this.state = { Rate: 5 }

        this.changeRating = this.changeRating.bind(this)
        this.changeNormalRating = this.changeNormalRating.bind(this)
    }

    changeRating(newRating, name) {
        // console.log(newRating);
        this.setState({
            Average: newRating
        });

    }

    changeNormalRating(NormalRating, name) {
        this.setState({
            Average: NormalRating
        });
    }

    render() {
        return (
            <Fragment>
                <StarRatings
                    rating={this.props.stars || this.state.Average}
                    starRatedColor="#FFD902"
                    changeRating={this.changeRating}
                    numberOfStars={5}
                    starDimension="30px"
                    starSpacing="3px"
                    name='Average'
                    starHoverColor='#FFD902'
                />
            </Fragment>
        );
    }
}