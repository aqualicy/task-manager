import React from 'react';
import './App.css';
import Table from "./components/Table";
import {TaskManagerProvider} from "./contexts/TaskManagerContext";

export default function App() {
    return (
        <div className="App">
            <header>
                Task Manager
            </header>
            <TaskManagerProvider>
                <Table />
            </TaskManagerProvider>
        </div>
    );
}
