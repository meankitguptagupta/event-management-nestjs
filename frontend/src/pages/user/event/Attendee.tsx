import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchEmployee, selectUser } from '../../../redux/features/userSlice';
import { useAppDispatch } from '../../../redux/hooks';
import { IEmployee } from '../../../types/user.interface';

interface AttendeeProps {
    eventId?: string;
    attendees?: string[];
    onUpdateAttendees: (updatedAttendees: string[]) => void; // Callback to update attendees
}

export const Attendee: React.FC<AttendeeProps> = ({ eventId, attendees = [], onUpdateAttendees }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredEmployees, setFilteredEmployees] = useState<IEmployee[]>([]); // Explicitly define type

    const { employees, loading, error } = useSelector(selectUser); // Redux selector for employees
    const dispatch = useAppDispatch();

    // Fetch employees on component mount
    useEffect(() => {
        dispatch(fetchEmployee());
    }, [dispatch]);

    // Filter employees based on search query
    useEffect(() => {
        if (searchQuery.trim()) {
            const filtered = employees.filter(
                (employee: IEmployee) =>
                    employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    employee.email.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredEmployees(filtered);
        } else {
            setFilteredEmployees(employees); // Show all employees if no search query
        }
    }, [searchQuery, employees]);

    // Handle selecting an employee
    const handleEmployeeSelect = (id: string) => {
        if (!attendees.includes(id)) {
            const updatedAttendees = [...attendees, id];
            onUpdateAttendees(updatedAttendees); // Update attendees list
        }
        setSearchQuery(''); // Clear the search query
    };

    return (
        <div className="attendee">
            <div className="tag-search">
                <input
                    type="text"
                    className="form-control"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search or add Employee"
                />
            </div>

            {/* Display filtered employees */}
            {
                searchQuery && (<ul className="search-results list-group overflow-y-auto" style={{ maxHeight: '200px' }}>
                    {filteredEmployees.map((employee: IEmployee) => (
                        <li
                            key={employee.id}
                            className="search-result-item list-group-item list-group-item-action"
                            onClick={() => handleEmployeeSelect(employee.id)}
                        >
                            {employee.name} ({employee.email})
                        </li>
                    ))}
                    {!filteredEmployees.length && searchQuery && (
                        <li className="list-group-item">No employees found.</li>
                    )}
                </ul>)
            }


            {/* Display current attendees */}
            <div className="attendee-list mt-3">
                {attendees.map((attendeeId, index) => {
                    const employee = employees.find((emp: IEmployee) => emp.id === attendeeId);
                    return (
                        <span key={index} className="badge rounded-pill text-bg-primary me-2">
                            {employee?.name || attendeeId} ({employee?.email})
                        </span>
                    );
                })}
            </div>
        </div>
    );
};
