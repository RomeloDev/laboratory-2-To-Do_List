import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Importing font-awesome library
import { faClone } from "@fortawesome/free-solid-svg-icons"; // Icon I used from font-awesome


export default function DuplicateTaskModal({ taskName, onCancel, onConfirm}) {
    return (
        <div className="modal-overlay">
            <div className="modal">
                <FontAwesomeIcon icon={faClone} style={{ color: "#0080ff", fontSize: "60px" }} />
                <h2>Duplicate Task Detected</h2>
                <p>Task <strong><span style={{color: '#0056b3'}}>{taskName}</span></strong> is already added.
                Do you want to add this task again?</p>
                <div className="modal-buttons">
                    <button onClick={onCancel}>Cancel</button>
                    <button onClick={onConfirm}>Add Task</button>
                </div>
            </div>
        </div>
    );
}