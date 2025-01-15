import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchEmployee, selectUser } from '../../../redux/features/userSlice';
import { useAppDispatch } from '../../../redux/hooks';

interface AttendeeProps {
    eventId?: string;
    attendees?: string[];
}

export const Attendee: React.FC<AttendeeProps> = ({ eventId, attendees = [] }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const { employees, loading, error } = useSelector(selectUser);
    const dispatch = useAppDispatch();

    // Fetch events on component mount
    useEffect(() => {
        dispatch(fetchEmployee());
    }, [dispatch]);

    // Handle Enter key press to add tag
    const handleKeyDown = (e: React.KeyboardEvent) => {
    };

    const handleEmployeeSelect = (id: string) => {
        
    }

    return (
        <div className="attendee">

            <div className="tag-search">
                <input
                    type="text"
                    className="form-control"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search or add Employee"
                    onKeyDown={handleKeyDown}
                />
            </div>

            <ul className="search-results list-group">
                {employees.map((employee) => (
                    <li
                        key={employee.id}
                        className="search-result-item list-group-item"
                        onClick={() => handleEmployeeSelect(employee.id)}
                    >
                        {employee.name}
                    </li>
                ))}
            </ul>


        </div>
    )
}