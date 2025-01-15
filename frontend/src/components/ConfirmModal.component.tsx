import React from 'react';

interface ConfirmModalProps {
    show: boolean;
    message: string;
    onAction: (confirmed: boolean) => void;  // Use a boolean for clear action handling
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ show, message, onAction }) => {
    if (!show) return null;

    return (
        <div className="modal" style={{ display: show ? 'block' : 'none' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">
                            Confirm
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            aria-label="Close"
                            onClick={() => onAction(false)}
                        ></button>
                    </div>
                    <div className="modal-body">
                        <p>{message}</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={() => onAction(false)}>
                            No
                        </button>
                        <button type="button" className="btn btn-danger" onClick={() => onAction(true)}>
                            Yes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
