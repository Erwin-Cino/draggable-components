import React, { useState, useEffect } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import Columns from './Columns'

export default function KanbanBoard() {

    const [completed, setCompleted] = useState([])
    const [incomplete, setIncomplete] = useState([])
    const [inProgress, setInProgress] = useState([])

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/todos")
            .then((response) => response.json())
            .then((json) => {
                console.log("TASKS FETCHED", json)
                setCompleted(json.filter((task) => task.completed));
                setIncomplete(json.filter((task) => !task.completed));
            });
    }, []);

    const handleDragEnd = (result) => {
        const { destination, source, draggableId } = result
        if (!destination || source.droppableId === destination.droppableId) return;

        switch (source.droppableId) {
            case "1": 
                //incomple is to do
                setIncomplete(removeByItemById(incomplete, draggableId))
                break;
            case "2":
                //in progress
                setInProgress(removeByItemById(inProgress, draggableId))
                break;
            case "3":
                //done
                setCompleted(removeByItemById(completed, draggableId))
                break;
        }

        const draggedTask = [...completed, ...incomplete, ...inProgress].find(task => task.id === Number(draggableId));
        console.log("DRAGGED TASK", draggedTask)
        let updatedTask;
        console.log("UPDATED TASK", updatedTask)
        switch (destination.droppableId) {
            case "1":
                //going incomplete
                updatedTask = { ...draggedTask, completed: false };
                setIncomplete([updatedTask, ...incomplete]);
                break;
            case "2":
                //going to in progress
                updatedTask = { ...draggedTask, completed: false };
                console.log("UPDATED TASK", updatedTask)
                setInProgress([updatedTask, ...inProgress]);
                break;
            case "3": 
                //going to done column
                updatedTask = { ...draggedTask, completed: true };
                setCompleted([updatedTask, ...completed]);
                break;
        }

    };

    const removeByItemById = (array, id) => array.filter(item => item.id !== Number(id))

    console.log("COMPLETED ARRAY", completed);
    console.log("INCOMPLETE ARRAY", incomplete);
    console.log("IN PROGRESS", inProgress);

    

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
        <h2 style={{textAlign: 'center'}}>PROGRESS BOARD</h2>
        <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
                width: '1300px',
                margin: '0 auto'
            }}
        >
            <Columns title={"To Do"} tasks={incomplete} id={'1'} />
            <Columns title={"In Progress"} tasks={inProgress} id={'2'} />
            <Columns title={"Done"} tasks={completed} id={'3'} />
        </div>
    
    </DragDropContext>
  )
}
