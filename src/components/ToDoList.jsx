import { useState } from "react";
import { useLocalStorage } from "../custom_hooks/useLocalStorage";
import DuplicateTaskModal from "./DuplicateTaskModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Importing Font-Awesome Library
import { faTrash, faCheck, faPlus } from "@fortawesome/free-solid-svg-icons"; // Icons I used from font-awesome
import DeleteConfirmationModal from "./DeleteConfirmationModal";


export default function ToDoList() {
    const [tasks, setTasks] = useLocalStorage("tasks", []); // custom hook for storing task in local storage
    const [newTask, setNewTask] = useState("");
    const [showDuplicateModal, setShowDuplicateModal] = useState(false);
    const [duplicateTask, setDuplicateTask] = useState("")
    const [selectedTaskIndex, setSelectedTaskIndex] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

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
            setShowDuplicateModal(true);
        } else {
            setTasks((prevTasks) => [...prevTasks, { name: newTask, status: "Pending" }]);
            setNewTask("");
        }
    };

    // Add Duplicate Task
    const confirmDuplicateTask = () => {
        setTasks(prevTasks => [...prevTasks, { name: duplicateTask, status: "Pending"}]);
        setShowDuplicateModal(false);
        setNewTask("");
    }

    // Handle delete button click
    const handleDeleteClick = (index) => {
        if (tasks[index].status === 'Pending'){
            setSelectedTaskIndex(index);
            setShowDeleteModal(true);
        }else {
            setTasks(tasks.filter((_, i) => i !== index));
        }
    }

    // Confirm Delete Task
    const confirmDeleteTask = () => {
        setTasks(tasks.filter((_, i) => i !== selectedTaskIndex));
        setShowDeleteModal(false);
        setSelectedTaskIndex(null);
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
                {/* InputField */}
                <input type="text" placeholder="Enter a task" value={newTask} onChange={(e) => setNewTask(e.target.value)} />
                {/* Button for adding a task */}
                <button id="addTaskBtn" onClick={addTask}>
                    <FontAwesomeIcon icon={faPlus} style={{marginRight: '5px', fontSize: '24px'}} />
                </button>
            </div>

            <table>
                {/* Table Header */}
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Task Name</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                {/* Table Body */}
                <tbody>
                    {tasks.map((task, index) => (
                        <tr key={index} style={{ opacity: task.status === "Complete" ? 0.5 : 1 }}>
                            <td>{index + 1}</td>
                            <td>{task.name}</td>
                            <td>{task.status}</td>
                            <td className="actionColumn">
                                {/* Done Button */}
                                <button className="done" style={{ display: task.status === "Complete" ? "none" : "block"}} onClick={() => completed(index)}>
                                    <FontAwesomeIcon icon={faCheck} style={{marginRight: '5px'}} />
                                    Done
                                </button>

                                {/* Delete Button */}
                                <button className="deleteBtn" onClick={() => handleDeleteClick(index)}>
                                    <FontAwesomeIcon icon={faTrash} style={{marginRight: '5px',}} />
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Duplicate Task Modal Popup */}
            { showDuplicateModal && (
                <DuplicateTaskModal 
                    taskName={duplicateTask} 
                    onCancel={() => setShowDuplicateModal(false)}
                    onConfirm={confirmDuplicateTask}
                />
            )}

            {/* Delete Confirmation Modal Popup */}
            {showDeleteModal && selectedTaskIndex !== null && (
                <DeleteConfirmationModal 
                    isOpen={showDeleteModal}
                    taskName={tasks[selectedTaskIndex].name}
                    onCancel={() => setShowDeleteModal(false)}
                    onConfirm={confirmDeleteTask}
                />
            )}
        </>
    );
};
