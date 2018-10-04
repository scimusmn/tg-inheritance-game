import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _filter from 'lodash/filter';
import QuizSlide from './QuizSlide';
import Mousetrap from 'mousetrap';
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
    this.answeredCorrectly = -1;
    this.questionsAnswered = 0;
    this.totalPoints = 0;
    this.feedbackText = '';

  }

  componentDidMount() {

    // Grab game data from json file
    this.quizData = data.quiz;
    this.quizIndex = 0;

    // Bind keyboard
    Mousetrap.bind(['1', 'a'], () => {
      console.log('Left (1) button press');
      this.answerInput(1);
    });
    Mousetrap.bind(['2', 'c'], () => {
      console.log('Right (2) button press');
      this.answerInput(2);
    });
    Mousetrap.bind(['r', 'b'], () => {
      console.log('Reset (r) button press');
      this.resetGame();
    });

    this.refreshQuiz();

  }

  componentDidUpdate() {

  }

  componentWillUnmount() {

  }

  resetGame() {

    this.quizIndex = -1;
    this.totalPoints = this.questionsAnswered = 0;
    this.nextQuestion();
    this.feedbackText = '';

  }

  answerInput(answer) {

    // Don't count first and last quiz slide (for now)
    if (this.quizIndex > 0 && this.quizIndex < this.quizData.length - 1) {

      const correctAnswer = this.quizData[this.quizIndex].correctAnswer;

      if (answer == correctAnswer) {
        console.log('That is correct');
        this.answeredCorrectly = 1;
        this.feedbackText = 'Correct';
        this.totalPoints ++;

      } else {
        console.log('That is incorrect');
        this.answeredCorrectly = 2;
        this.feedbackText = 'Incorrect';

      }

      this.questionsAnswered ++;

      console.log(this.totalPoints, ' / ', this.questionsAnswered)

    }


    this.nextQuestion();

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

    this.setState({ question: current.question, option1: current.option1, option2: current.option2, photoSrc:current.photoSrc});

  }

  getFeedbackClass() {

    let classStr = 'feedback';

    if (this.answeredCorrectly == 2) {
      classStr += ' incorrect';
    } else if (this.answeredCorrectly == 1) {
      classStr += ' correct';
    }

    return classStr;

  }

  render() {
    return (
      <div className="game">

        <QuizSlide question={this.state.question} option1={this.state.option1} option2={this.state.option2} photoSrc={this.state.photoSrc} />

        {this.feedbackText != '' &&
          <div className="prev-feedback">
            <h3>Previous: <span className={this.getFeedbackClass()}>&nbsp;{this.feedbackText}</span> </h3>
            <h3>Progress: <span className="correct">&nbsp;{this.totalPoints}</span> / {this.questionsAnswered} </h3>
          </div>
        }

      </div>
    );
  }
}

Game.propTypes = {

};

Game.defaultProps = {

};
