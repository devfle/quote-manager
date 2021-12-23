import React from "react";

interface DashboardProps {
  title: string;
}

const Dashboard: React.FC<DashboardProps> = ({ title }) => {
  return <h1>{title}</h1>;
};

export default Dashboard;
