import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import styled from 'styled-components'
import Card from './Card'

const Container = styled.div`
    background-color: #f4f5f7;
    border-radius: 2.5px;
    width: 300px;
    height: 475px; 
    overflow-y: scroll;
    scrollbar-width: none;
    border: 1px solid gray;
    -ms-overflow-style: none;
`;

const Title = styled.h3`
    padding: 8px;
    background-color: pink;
    text-align: center;
`;

const TaskList = styled.div`
    padding: 3px;
    transition: background-color 0.2s ease;
    background-color: #f4f5f7;
    flex-grow: 1;
    min-height: 100px;
`;



export default function Columns({ title, tasks, id }) {
    console.log('COLUMN TASKS', tasks)
    return (
        <Container>
            <Title
                style={{
                    backgroundColor: "lightblue",
                    position: "sticky",
                    top: "0"
                }}
            >
                {title}
            </Title>

            <Droppable droppableId={id} key={id}>
                {(provided, snapshot) => (
                    <TaskList
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        // isDraggingOver={snapshot.isDraggingOver}
                        isDragging={snapshot.isDragging}
                    >
                        {tasks.map((task, index) => (
                            <Card key={index} index={index} task={task} />
                        ))}
                        {provided.placeholder}
                    </TaskList>
                )}
            </Droppable>
        </Container>
    )
}
