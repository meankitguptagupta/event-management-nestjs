import React, { useEffect } from "react";
import Moment from 'react-moment';
import { IEmployee } from "../../../types/user.interface";

interface EmployeeProps {
    employee: IEmployee,
    slNo: number
}

export const EmployeeRow: React.FC<EmployeeProps> = ({ employee, slNo }) => {
    return <tr>
        <th scope="row">{slNo}</th>
        <td>
            {employee.name}
        </td>
        <td>
            {employee.email}
        </td>
        <td>{employee.role}</td>
        <td>
            <Moment date={employee.createdAt} format="MMM DD, YYYY" />
        </td>
        <td>
            <span className="btn btn-sm btn-outline-warning">
                <i className="fa fa-pencil" aria-hidden="true"></i>
            </span>

            <span className="btn btn-sm btn-outline-danger ms-2">
                <i className="fa fa-trash" aria-hidden="true"></i>
            </span>
        </td>
    </tr>
}