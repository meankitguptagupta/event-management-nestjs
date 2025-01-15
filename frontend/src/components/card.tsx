import React from "react";

interface CardProps {
  title: string;
  value: string | number;
  type: string;
}

export const Card: React.FC<CardProps> = ({ title, value, type }) => {
  return (
    <div className={`card bg-${type}`}>
      <div className="card-body">
        <div className="d-flex justify-content-center">
          <div className="flex-shrink-0">
            <i className="fa fa-handshake-o fs-1" aria-hidden="true"></i>
          </div>
          <div className="flex-grow-1 ms-3 text-white text-center">
            <h5 className="card-text">{title}</h5>
            <p className="card-title">{value}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
