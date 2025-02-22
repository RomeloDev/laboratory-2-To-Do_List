import { useState } from "react";

const ToDoList = () => {
    const [tasks, setTasks] = useState([]); 
    const [newTask, setNewTask] = useState("");


    // Add a new task
    const addTask = () => {
        if (newTask.trim() !== "") {
            setTasks((prevTasks) => [...prevTasks, { name: newTask, status: "Pending" }]);
            setNewTask("");
        } else {
            alert("Please input task");
        }
    };

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
                                <button className="done" onClick={() => completed(index)}>Done</button>
                                <button className="deleteBtn" onClick={() => deleteTask(index)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default ToDoList;
