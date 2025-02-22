import { useState } from "react";
import { useLocalStorage } from "../custom_hooks/useLocalStorage";
import DuplicateTaskModal from "./DuplicateTaskModal";

export default function ToDoList() {
    const [tasks, setTasks] = useLocalStorage("tasks", []);
    const [newTask, setNewTask] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [duplicateTask, setDuplicateTask] = useState("")

    // Add a new task
    const addTask = () => {
        //Check if task is empty
        if (newTask.trim() === "") {
            alert("Please input task");
            return;
        }
        
        //check if task already exists
        if (tasks.some(task => task.name === newTask)){
            setDuplicateTask(newTask);
            setShowModal(true);
        } else {
            setTasks((prevTasks) => [...prevTasks, { name: newTask, status: "Pending" }]);
            setNewTask("");
        }
    };

    const confirmDuplicateTask = () => {
        setTasks(prevTasks => [...prevTasks, { name: duplicateTask, status: "Pending"}]);
        setShowModal(false);
        setNewTask("");
    }

    // Delete a task
    const deleteTask = (index) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    };

    // Mark task as complete
    const completed = (index) => {
        setTasks((prevTasks) => 
            prevTasks.map((task, i) =>
                i === index ? { ...task, status: "Complete" } : task
            )
        );
    };

    return (
        <>
            <h1>To-Do List</h1>
            <div>
                <input type="text" placeholder="Enter a task" value={newTask} onChange={(e) => setNewTask(e.target.value)} />
                <button id="addTaskBtn" onClick={addTask}>Add Task</button>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Task Name</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task, index) => (
                        <tr key={index} style={{ opacity: task.status === "Complete" ? 0.5 : 1 }}>
                            <td>{index + 1}</td>
                            <td>{task.name}</td>
                            <td>{task.status}</td>
                            <td className="actionColumn">
                                <button className="done" style={{ display: task.status === "Complete" ? "none" : "block"}} onClick={() => completed(index)}>Done</button>
                                <button className="deleteBtn" onClick={() => deleteTask(index)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            { showModal && (
                <DuplicateTaskModal 
                    taskName={duplicateTask} 
                    onCancel={() => setShowModal(false)}
                    onConfirm={confirmDuplicateTask}
                />
            )}
        </>
    );
};
