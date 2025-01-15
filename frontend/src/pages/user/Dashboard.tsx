import React, { useEffect } from "react";
import { Card } from "../../components/card";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchEventCount, selectEvent } from "../../redux/features/eventSlice";
import { fetchEmployeeCount, selectUser } from "../../redux/features/userSlice";

const Dashboard: React.FC = () => {

  const dispatch = useAppDispatch();
  const eventCount = useAppSelector(selectEvent);
  const userCount = useAppSelector(selectUser);

  // Access the logged-in user from the Redux store
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    if (user?.role === 'manager') {
      dispatch(fetchEmployeeCount());
    }
    dispatch(fetchEventCount());
  }, [dispatch]);

  return (
    <div className="dashboard">
      <div className="row">
        <div className="col-sm-12 col-md-2">
          <Card
            title="Events"
            value={eventCount?.count || 0}
            type="success"
          />
        </div>

        {
          user?.role === 'manager' && (<div className="col-sm-12 col-md-2">
            <Card title="Employees" value={userCount.employeeCount || 0} type="info" />
          </div>)
        }


      </div>

    </div>
  );
};

export default Dashboard;
