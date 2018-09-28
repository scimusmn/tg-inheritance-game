import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _filter from 'lodash/filter';
import QuizSlide from './QuizSlide';
import data from '../data.json';

export default class Game extends Component {
  constructor(props) {

    super(props);

    this.state = {
      question:'',
      option1:'',
      option2:'',
      photoSrc:''
    };

    this.quizData = [];
    this.quizIndex = 0;

  }

  componentDidMount() {

    // Grab game data from json file
    this.quizData = data.quiz;
    this.quizIndex = 0;

    this.refreshQuiz();

    setInterval( () => {
      this.nextQuestion();
    }, 3000);

  }

  componentDidUpdate() {

  }

  componentWillUnmount() {

  }

  nextQuestion() {

    console.log('nextQuestion');

    this.quizIndex ++;

    if (this.quizIndex < this.quizData.length) {
      this.refreshQuiz();
    } else {
      console.log('QUIZ FINISHED');
    }



  }

  refreshQuiz() {

    console.log('refreshQuiz', this.quizIndex);


    const current = this.quizData[this.quizIndex];
    console.log(current);

    this.setState({ question: current.question, option1: current.option1, option2: current.option2, photoSrc:'https://picsum.photos/200/300/?random'});

  }

  render() {
    return (
      <div className="game">

        <QuizSlide question={this.state.question} option1={this.state.option1} option2={this.state.option2} photoSrc={this.state.photoSrc} />

      </div>
    );
  }
}

Game.propTypes = {

};

Game.defaultProps = {

};
