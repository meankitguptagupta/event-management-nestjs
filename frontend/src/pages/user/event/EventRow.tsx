import React from "react";
import { IEvent } from "../../../types/event.interface";
import Moment from 'react-moment';
import { NavLink } from "react-router-dom";

interface EventProps {
    event: IEvent;
    slNo: number;
    onEdit: () => void; // Callback for editing
}

export const EventRow: React.FC<EventProps> = ({ event, slNo, onEdit }) => {
    return (
        <tr>
            <th scope="row">{slNo}</th>
            <td>
                <NavLink to={event.id} className="">
                    {event.name}
                </NavLink>
            </td>
            <td>
                <Moment date={event.eventTimestamp} format="MMM DD YYYY hh:mm a" />
                <i className="fa fa-clock-o ms-2" aria-hidden="true"></i>
            </td>
            <td className={`${event.isRecurring ? 'bg-info' : ''}`}>
                {event.recurrenceCount
                    ? `${event.recurrenceType} (${event.recurrenceCount})`
                    : event.recurrenceType || '-'}
            </td>
            <td>{event.creator.name} ({event.creator.role})</td>
            <td>
                <Moment date={event.createdAt} format="MMM DD, YYYY" />
            </td>
            <td>
                <span className="btn btn-sm btn-outline-warning" onClick={onEdit}>
                    <i className="fa fa-pencil" aria-hidden="true"></i>
                </span>
                <span className="btn btn-sm btn-outline-danger ms-2">
                    <i className="fa fa-trash" aria-hidden="true"></i>
                </span>
            </td>
        </tr>
    );
};
