import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import Pagination from "../../components/Pagination.component";
import { fetchEmployee, selectUser } from "../../redux/features/userSlice";
import { EmployeeRow } from "./employee/EmployeeRow";
import { CreateEmployee } from "./employee/CreateEmployee";

const EmployeePage: React.FC = () => {
    const dispatch = useAppDispatch();
    const employeeList = useAppSelector(selectUser);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10); // Default limit

    // Fetch events on component mount
    useEffect(() => {
        dispatch(fetchEmployee());
    }, [dispatch]);

    // Toggle the visibility of the modal
    const toggleModal = () => {
        setIsPopupVisible((prev) => !prev);
    };

    // Calculate paginated events
    const totalEvents = employeeList.employees.length;
    const totalPages = Math.ceil(totalEvents / itemsPerPage);
    const paginatedEvents = employeeList.employees.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="employee">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                    <label htmlFor="itemsPerPage" className="me-2">
                        Items per page:
                    </label>
                    <select
                        id="itemsPerPage"
                        className="form-select d-inline-block w-auto"
                        value={itemsPerPage}
                        onChange={(e) => {
                            setItemsPerPage(Number(e.target.value));
                            setCurrentPage(1); // Reset to page 1
                        }}
                    >
                        {[5, 10, 20, 50, 100].map((limit) => (
                            <option key={limit} value={limit}>
                                {limit}
                            </option>
                        ))}
                    </select>
                </div>
                <button className="btn btn-outline-primary" onClick={toggleModal}>
                    Add
                    <i className="fa fa-plus ms-2" aria-hidden="true"></i>
                </button>
            </div>

            <div className="table-responsive">
                <table className="table table-striped table-hover text-center">
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Role</th>
                            <th scope="col">Created</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedEvents.map((item, index) => (
                            <EmployeeRow
                                key={index}
                                slNo={(currentPage - 1) * itemsPerPage + index + 1}
                                employee={item}
                            />
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)}
            />

            {/* Show CreateEvent modal when isPopupVisible is true */}
            {isPopupVisible && <CreateEmployee onClose={toggleModal} />}
        </div>
    );
};

export default EmployeePage;
