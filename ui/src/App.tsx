import React from 'react';
import './App.css';
import Table from "./components/Table";
import {useTaskManagerContext} from "./contexts/TaskManagerContext";
import ModalController from "./components/ModalController";
import TaskStatusDropdown from "./components/dropdowns/TaskStatusDropdown";

export default function App() {
    const { setIsAddingTask, setIsModalOpen } = useTaskManagerContext();

    const handleAddTaskOnClick = () => {
        setIsAddingTask(true);
        setIsModalOpen(true);
    };

    return (
        <div className="App">
            <header style={{ textAlign: 'left', padding: '1rem', fontSize: '2rem', background: 'cornflowerblue', marginBottom: '1rem'}}>
                Task Manager
            </header>
            <div style={{ textAlign: 'left', paddingLeft: '1rem' }}>
                <button
                    className="add-task-button"
                    onClick={() => handleAddTaskOnClick()}>
                    Add Task
                </button>
            </div>
            <div style={{ overflowY: 'auto' }}>
                <Table />
            </div>
            <ModalController/>
        </div>
    );
}
