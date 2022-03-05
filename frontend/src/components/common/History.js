import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import { createMessage } from "../../actions/messages";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
// import { getBlockSets } from "../../actions/sets.js";
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { getPracticeIdentifySessions, updatePracticeIdentifySession } from "../../actions/practiceIdentifySessions.js";
import { getImages } from "../../actions/sets.js";;

import Loader from "../layout/Loader.js";

export class History extends Component {

  state = {
    isUpdating: true,
    isCreating: false,
    isReady: false,
    isPending: true,
    isViewing: false,
    sets: [],
    results: [],
    isAnswering: true,
    practiceIdentifySession: null,
    setsArray: [],
    selectedSetId: null,
    selectedSet: null,
    solvedQuestions: [],
    blockLink: null,
    currentSlide: 0,
    currentIndex: 0,
    orderedImages: [],
    complaint: this.props.complaint
  };



  //-------------------------------------------------------------------------
  //                                 SLIDER & IMAGES
  next = () => {
    this.setState((state) => ({
      currentIndex: state.currentIndex + 1,
    }));
  };
  prev = () => {
    this.setState((state) => ({
      currentIndex: state.currentIndex - 1,
    }));
  };
  updateCurrentSlide = (index) => {
    const { currentIndex } = this.state;

    if (currentIndex !== index) {
      this.setState({
        currentIndex: index,
      });
    }
  };
  //--------------------------------------------------------------------------------
  rendering() {
    if (this.state.isUpdating == true) {
      if (this.props.block == "Hematology/Oncology") {
        this.setState({
          blockLink: "hemOnc",
        });
      }
      this.setState({
        isUpdating: false,
      });
    }


  }

  static propTypes = {
    complaint: PropTypes.object.isRequired,
  };

  //For the radio buttons
  handleCheckElement = (e) => {
    this.setState({ selectedOption: e.target.value })
  }

  //To go back to the previous question
  // onBack = (e) => {
  //   let currentSetIndex = this.props.practiceIdentifySession.questions.findIndex((question) => this.state.selectedQuestion.index == question.index)
  //   let newIndex = currentSetIndex -= 1
  //   let selectedQuestion = this.props.practiceIdentifySession.questions[newIndex]
  //   let selectedQuestionOptions = this.randomArrayShuffle(selectedQuestion.options)
  //   //To change the chosen option if going to a solved question
  //   let solvedQuestion = this.state.results.find((question) => question.question.index == selectedQuestion.index);
  //   if (typeof solvedQuestion !== 'undefined') {
  //     var selectedOption = solvedQuestion.chosenOption.id
  //   }
  //   if (typeof solvedQuestion === 'undefined') {
  //     var selectedOption = null
  //   }
  //   setTimeout(() => this.setState({ selectedQuestion: selectedQuestion, selectedQuestionOptions: selectedQuestionOptions, currentIndex: newIndex, isAnswering: true, selectedOption: selectedOption, selectedOptionObj: null }), 100);
  // }
  // //To go to the next question
  // onNext = (e) => {
  //   let currentSetIndex = this.props.practiceIdentifySession.questions.findIndex((question) => this.state.selectedQuestion.index == question.index)
  //   let newIndex = currentSetIndex += 1
  //   let changeText = false

  //   let selectedQuestion = this.props.practiceIdentifySession.questions[newIndex]
  //   let selectedQuestionOptions = this.randomArrayShuffle(selectedQuestion.options)
  //   //To change the chosen option if going to a solved question
  //   let solvedQuestion = this.state.results.find((question) => question.question.index == selectedQuestion.index);
  //   if (typeof solvedQuestion !== 'undefined') {
  //     var selectedOption = solvedQuestion.chosenOption.id
  //   }
  //   if (typeof solvedQuestion === 'undefined') {
  //     var selectedOption = null
  //   }
  //   setTimeout(() => this.setState({ selectedQuestion: selectedQuestion, selectedQuestionOptions: selectedQuestionOptions, currentIndex: newIndex, isAnswering: true, selectedOption: selectedOption, selectedOptionObj: null }), 100);
  // }
  //After the user click 'answer', change the state of answering so the button changes to 'Go next'.
  //Put the answer in an object and push it to the results array in the state.
  // onAnswer = (e) => {
  //   if (this.state.selectedOptionObj == null) {
  //     this.props.createMessage({ titleEmpty: "Please choose an option" });
  //   }
  //   else {
  //     this.setState({ isAnswering: false, [`questionResult${this.state.selectedQuestion.id}`]: this.state.selectedOptionObj.isCorrect })
  //     let results = this.state.results
  //     let solvedQuestions = this.state.solvedQuestions
  //     let questionResult = { question: this.state.selectedQuestion, isCorrect: this.state.selectedOptionObj.isCorrect, chosenOption: this.state.selectedOptionObj, }
  //     // setTimeout(() => results.push(questionResult), 35);
  //      results.push(questionResult)
  //     solvedQuestions.push(this.state.selectedQuestion.index)
  //     // setTimeout(() => this.setState({ results: results, solvedQuestions: solvedQuestions }), 50);
  //     this.setState({ results: results, solvedQuestions: solvedQuestions })
  //     let tempResults = JSON.stringify(this.state.results)
  //     const session = new FormData();
  //     session.append("date", this.props.practiceIdentifySession.date);
  //     session.append("owner", this.props.practiceIdentifySession.owner);
  //     session.append("results", tempResults)
  //     setTimeout(() => this.props.updatePracticeIdentifySession(session, this.props.practiceIdentifySession.id, tempResults), 300);
  //   }
  // }

  onSubmit = (e) => {
    e.preventDefault();

    let tempResults = JSON.stringify(this.state.results)
    const session = new FormData();
    // session.append("date", this.props.practiceIdentifySession.date);
    // session.append("owner", this.props.practiceIdentifySession.owner);
    // session.append("results", tempResults)
    // setTimeout(() => this.props.updatePracticeIdentifySession(session, this.props.practiceIdentifySession.id, tempResults), 300);


    //  Go to results page
    // setTimeout(() => this.props.history.push(`/${this.state.blockLink}/practice/identification/results/${this.props.practiceIdentifySession.id}`), 1000);

  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });
  // componentDidMount() {
  //   this.props.getPracticeIdentifySessions(this.props.block);
  // }
  render() {
    const { description } = this.state;
    // The loading handler
    if (this.state.isReady == false) {
      // setTimeout(() => this.props.getPracticeIdentifySessions(this.props.block), 1000);
      // setTimeout(() => this.props.getImages(this.props.block), 1000);
      setTimeout(() => this.rendering(), 1300);
      setTimeout(() => this.setState({ isReady: true }), 1600);
    }

    // The loading component
    if (this.state.isReady == false) {
      return (
        <Loader />
      );
    }
    //The List component
    if (this.state.isReady == true) {
      
      return (
        <div className="container my-5">
          <h1 className="text-center py-2" style={{color: "#00D0C5"}}>
           {this.state.complaint.title}
          </h1>
          {this.state.currentIndex != 0 && (
          <button className="btn btn-secondary mt-1" onClick={this.prev}>
          <i class="fas fa-arrow-left"></i> Previous Question
        </button>
            )}

          <hr />
          <p></p>

          <div className="row"><p></p></div>
          <div className="row d-flex justify-content-center">

             {this.state.currentIndex == 0 && (
              <div className="">
                <h1 className="text-center mb-2 tawassamYellow">{this.state.complaint.site}</h1>
                
              <div class="d-grid col-3 mx-auto">
              <button type="button" onClick={this.next} class="btn tawassamBlueBG m-3">{this.state.complaint.siteOptions[0]}</button>
              <button type="button" onClick={this.next} class="btn tawassamBlueBG m-3">{this.state.complaint.siteOptions[1]}</button>
            </div>
            <div class="d-grid col-3 mx-auto">
              <button type="button" onClick={this.next} class="btn tawassamBlueBG m-3">{this.state.complaint.siteOptions[2]}</button>
              <button type="button" onClick={this.next} class="btn tawassamBlueBG m-3">{this.state.complaint.siteOptions[3]}</button>
            </div>

            </div>

            )}
                 {this.state.currentIndex == 1 && (
              <div className="">
                <h1 className="text-center mb-2 tawassamYellow">{this.state.complaint.characteristics}</h1>
                
                <div class="d-grid col-3 mx-auto">
                <button type="button" onClick={this.next} class="btn tawassamBlueBG m-3">{this.state.complaint.characteristicsOptions[0]}</button>
                <button type="button" onClick={this.next} class="btn tawassamBlueBG m-3">{this.state.complaint.characteristicsOptions[1]}</button>
              </div>
              <div class="d-grid col-3 mx-auto">
                <button type="button" onClick={this.next} class="btn tawassamBlueBG m-3">{this.state.complaint.characteristicsOptions[2]}</button>
                <button type="button" onClick={this.next} class="btn tawassamBlueBG m-3">{this.state.complaint.characteristicsOptions[3]}</button>
              </div>
              </div>

            )}
             {this.state.currentIndex == 2 && (
              <div className="">
                <h1 className="text-center mb-2 tawassamYellow">{this.state.complaint.radation}</h1>
                
                <div class="d-grid col-3 mx-auto">
                <button type="button" onClick={this.next} class="btn tawassamBlueBG m-3">{this.state.complaint.radationOptions[0]}</button>
                <button type="button" onClick={this.next} class="btn tawassamBlueBG m-3">{this.state.complaint.radationOptions[1]}</button>
              </div>
              <div class="d-grid col-3 mx-auto">
                <button type="button" onClick={this.next} class="btn tawassamBlueBG m-3">{this.state.complaint.radationOptions[2]}</button>
                <button type="button" onClick={this.next} class="btn tawassamBlueBG m-3">{this.state.complaint.radationOptions[3]}</button>
              </div>
              </div>
            )}
             {this.state.currentIndex == 3 && (
              <div className="">
                <h1 className="text-center mb-2 tawassamYellow">{this.state.complaint.factorsWorse}</h1>
                
                <div class="d-grid col-3 mx-auto">
                <button type="button" onClick={this.next} class="btn tawassamBlueBG m-3">{this.state.complaint.factorsWorseOptions[0]}</button>
                <button type="button" onClick={this.next} class="btn tawassamBlueBG m-3">{this.state.complaint.factorsWorseOptions[1]}</button>
              </div>
              <div class="d-grid col-3 mx-auto">
                <button type="button" onClick={this.next} class="btn tawassamBlueBG m-3">{this.state.complaint.factorsWorseOptions[2]}</button>
                <button type="button" onClick={this.next} class="btn tawassamBlueBG m-3">{this.state.complaint.factorsWorseOptions[3]}</button>
              </div>
              </div>
            )}
               {this.state.currentIndex == 4 && (
              <div className="">
                <h1 className="text-center mb-2 tawassamYellow">Extra Notes</h1>
                
                <div class="d-grid col-6 mx-auto mb-3">
                <textarea
                  className="form-control"
                  type="text"
                  name="description"
                  onChange={this.onChange}
                  value={description}
                  placeholder="Extra notes of the session"
                  rows="3"
                />

              </div>
              </div>
            )}
            {( this.state.currentIndex <= 3) && (
              <div className="row">
              <div className="px-4 d-grid">
                <button type="submit" onClick={this.next} className="btn btn-lg btn-secondary tawassamYellowBG mt-4">
                  <i className="far fa-arrow-alt-circle-right" style={{ fontSize: "1.4rem" }}></i> Go Next
                </button>
              </div>
              </div>
            )}
              {( this.state.currentIndex > 3) && (
              <div className="row">
              <div className="px-4 d-grid">
                <a type="submit" href="#/" className="btn btn-lg btn-secondary tawassamYellowBG mt-4">
                  <i className="fas fa-flag-checkered" style={{ fontSize: "1.4rem", color: "white" }}></i> Submit and Analyze
                </a>
              </div>
              </div>
            )}
          </div>


        </div>
      );
    }

  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { createMessage })(History);

