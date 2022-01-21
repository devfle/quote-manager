import React from "react";

interface DashboardProps {
  title: string;
}

const Dashboard: React.FC<DashboardProps> = ({ title }) => {
  return (
    <div className="dashboard">
      <span className="dashboard__date">22:15</span>
    </div>
  );
};

export default Dashboard;
