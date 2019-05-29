import React from 'react';
import PropTypes from 'prop-types';
import {Draggable, Droppable} from 'react-beautiful-dnd';

export default function CardColumn(props) {
    const {cards,status} = props;

    return (
        <Droppable
            droppableId={status}
            key={status}
        >
            {provided => (
                <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="column"
                >
                    <h1>{status}</h1>
                    {cards.map((item, index) => (
                        <Draggable
                            index={index}
                            draggableId={item.cid}
                        >
                            {(provided)=>(
                                <div
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    ref={provided.innerRef}
                                    className="card"
                                    key={item.cid}
                                >
                                    <p>{item.summary}</p>
                                </div>
                            )}
                        </Draggable>
                    ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );

}

CardColumn.propTypes = {
    cards: PropTypes.array.isRequired,
    status: PropTypes.string.isRequired,
};

