import React, {Component} from 'react';
import classes from './Quiz.module.css';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'

class Quiz extends Component {
  state = {
    results: {},
    isFinished: false,
    activeQuestion: 0,
    answerState: null,
    quiz: [
      {
        question: 'С какой фразы начинается киносага Джорджа Лукаса "Звездные войны"?',
        rightAnswerId: 2,
        id: 1,
        answers: [
          {text: 'Совсем скоро на соседней планете...', id: 1},
          {text: 'Давным-давно в далекой-далекой галактике...', id: 2},
          {text: 'Однажды за морем...', id: 3},
          {text: 'Тихо стоял дуб на опушке...', id: 4}
        ]
      },
      {
        question: 'Какую фамилию герой оригинальной трилогии «Звездные войны» по имени Хан?',
        rightAnswerId: 3,
        id: 2,
        answers: [
          {text: 'Ламберг', id: 1},
          {text: 'Скайуокер', id: 2},
          {text: 'Соло', id: 3},
          {text: 'Ломоносов', id: 4}
        ]
      },
      {
        question: 'Какой космический корабль пилотирует Хан Соло?',
        rightAnswerId: 1,
        id: 3,
        answers: [
          {text: '«Тысячелетний сокол»', id: 1},
          {text: '«Зов сирены»', id: 2},
          {text: '«Сокол»', id: 3},
          {text: '«Ненастье»', id: 4}
        ]
      }
    ]
  }

  onAnswerClickHandler = (answerId) => {
    if (this.state.answerState) {
      const key = Object.keys(this.state.answerState)[0]
      if (this.state.answerState[key] === 'success') {
        return
      }
    }

    const question = this.state.quiz[this.state.activeQuestion]
    const results = this.state.results

    if (question.rightAnswerId === answerId) {
      if(!results[question.id]) {
        results[question.id] = 'success'
      }
      this.setState({
        answerState: {[answerId]: 'success'},
        results
      })
      const timeout = window.setTimeout(() => {
        if(this.isQuizFinished()) {
          this.setState({
            isFinished: true
          })
        } else {
          this.setState({
            activeQuestion: this.state.activeQuestion + 1,
            answerState: null
          })
        }
        window.clearTimeout(timeout)
      }, 1000)
    } else {
      results[question.id] = 'error'
      this.setState({
        answerState: {[answerId]: 'error'},
        results
      })
    }
  }

  isQuizFinished() {
    return this.state.activeQuestion + 1 === this.state.quiz.length
  }

  retryHandler = () => {
    this.setState({
      activeQuestion: 0,
      answerState: null,
      isFinished: false,
      results: {}
    })
  }

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Answer all questions</h1>

          {
            this.state.isFinished
            ? <FinishedQuiz
                results={this.state.results}
                quiz={this.state.quiz}
                onRetry={this.retryHandler}
            />
            : <ActiveQuiz
              answers={this.state.quiz[this.state.activeQuestion].answers}
              question={this.state.quiz[this.state.activeQuestion].question}
              onAnswerClick={this.onAnswerClickHandler}
              quizLenght={this.state.quiz.length}
              quizProgress={this.state.activeQuestion + 1}
              state={this.state.answerState}
            />
          }
        </div>
      </div>
    )
  }
}

export default Quiz;
