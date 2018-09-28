import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class QuizSlide extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };

  }

  componentDidMount() {

  }

  componentDidUpdate() {

  }

  componentWillUnmount() {

  }

  render() {
    return (
      <div className="quiz-slide">
        <h1 className="question">{this.props.question}</h1>
        <img className="photo" alt="slide" src={this.props.photoSrc}/>
        <h2 className="option1">{this.props.option1}</h2>
        <h2 className="option2">{this.props.option2}</h2>
      </div>
    );
  }
}

QuizSlide.propTypes = {
  question: PropTypes.string,
  photoSrc: PropTypes.string,
  option1: PropTypes.string,
  option2: PropTypes.string,
};

QuizSlide.defaultProps = {

};
