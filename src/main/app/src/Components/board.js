import React from 'react';
import CardColumn from './cardColumn.js';
import uuid from 'uuid/v4';
import { getCards,createCard,updateCard } from "../api/card_api";

import {DragDropContext} from 'react-beautiful-dnd';
import Swal from 'sweetalert2'

export default class Board extends React.Component {

  constructor(props) {
    super(props);



    this.state = {
      cards: {
        "TODO":[],
        "IN PROGRESS": [],
        "DONE": []
      }
    };


    this.handleNewCardSubmit = this.handleNewCardSubmit.bind(this);
    this.openPopup = this.openPopup.bind(this);
  }

  componentDidMount() {
    getCards()
        .then((data) => {
          let cards = {
            "TODO": [],
            "IN PROGRESS": [],
            "DONE": []
          };

          for (let card of data) {
            console.log(card);
            if (card.status === "TODO") {
              cards["TODO"].push(card);
            }

            if (card.status === "IN PROGRESS") {
              cards["IN PROGRESS"].push(card);
            }

            if (card.status === "DONE") {
              cards["DONE"].push(card);
            }
          }
          this.setState({
            cards: cards
          })
        });
  }

  openPopup(){
    Swal.fire({
      title: 'Submit summary to your new task!',
      input: 'textarea',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Add',
      showLoaderOnConfirm: true,
      preConfirm: (summary) => {
        return this.handleNewCardSubmit(summary)
      },
      allowOutsideClick: () => !Swal.isLoading()
    })
  }

  handleNewCardSubmit(summary) {

    if (summary === ''){
      return;
    }

    const newCard = {
      "cid": uuid(),
      "summary": summary,
      "status": "TODO"
    };

    createCard(newCard);

    const newTodoCards = [...this.state.cards["TODO"],newCard];

    this.setState(prevState => ({
      cards: {
        ...prevState.cards,
        "TODO": newTodoCards
      }
    }));
  }

  onDragEnd = event => {

    const {destination, source} = event;
    if(!destination){
      return;
    }
    if(
        destination.droppableId === source.droppableId &&
        destination.index === source.index
    ){
      return
    }
    const sourceList = this.state.cards[source.droppableId];
    const destinationList = this.state.cards[destination.droppableId];

    const newCard = sourceList[source.index];
    newCard.status = destination.droppableId;

    updateCard(newCard);

    const newCards = [
        ...destinationList,
        newCard
    ];

    const newSourceList = sourceList.filter(item => item !== sourceList[source.index]);

    this.setState(prevState => ({
      cards: {
        ...prevState.cards,
        [destination.droppableId]: newCards,
        [source.droppableId]: newSourceList
      }
    }))
  };



  render() {

    return (
      <div className="trello-board">
        <button
            className="butn"
            onClick={this.openPopup}
        >NEW</button>
          <section className="columns">
            <DragDropContext onDragEnd={this.onDragEnd}>
              <CardColumn
                  cards={this.state.cards["TODO"]}
                  status="TODO"
              />

              <CardColumn
                  cards={this.state.cards["IN PROGRESS"]}
                  status="IN PROGRESS"
              />

              <CardColumn
                  cards={this.state.cards["DONE"]}
                  status="DONE"
              />
            </DragDropContext>
          </section>

      </div>

    );
  }
}