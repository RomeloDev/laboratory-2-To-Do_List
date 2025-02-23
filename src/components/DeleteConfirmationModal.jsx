import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Importing font-awesome library
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export default function DeleteConfirmationModal ({isOpen, taskName, onCancel, onConfirm}) {
    if (!isOpen) return null; // Don't render if modal is closed

    return (
        <div className='modal-overlay'>
            <div className='modal'>
                <FontAwesomeIcon icon={faTrash} style={{fontSize: '60px', color: '#ff0000'}} />
                <h2>Confirm Deletion</h2>
                <p>Are you sure you want to delete this Pending Task: <strong><span style={{color: '#ff0000'}}>{taskName}</span></strong>?</p>
                <div className='modal-delete-buttons'>
                    <button className='cancel-btn' onClick={onCancel}>Cancel</button>
                    <button className='delete-btn' onClick={onConfirm}>Delete</button>
                </div>
            </div>
        </div>
    );
}