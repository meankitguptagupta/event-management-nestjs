import React, { useEffect } from "react";
import { Card } from "../../components/card";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchEventCount, selectEvent } from "../../redux/features/eventSlice";
import { fetchEmployeeCount, selectUser } from "../../redux/features/userSlice";

const Dashboard: React.FC = () => {

  const dispatch = useAppDispatch();
  const eventCount = useAppSelector(selectEvent);
  const userCount = useAppSelector(selectUser);

  useEffect(() => {
    dispatch(fetchEventCount());
    dispatch(fetchEmployeeCount());
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

        <div className="col-sm-12 col-md-2">
          <Card title="Employees" value={userCount.employeeCount || 0} type="info" />
        </div>

      </div>

    </div>
  );
};

export default Dashboard;
