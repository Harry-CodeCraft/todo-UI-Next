import React from "react";
import TodoContainer from "./todoContainer";
import DashboardContainer from "@/app/components/dashboardContainer";

const CreateTodoPage: React.FC = () => {
  return (
    <DashboardContainer name="Create Todo">
      <TodoContainer />
    </DashboardContainer>
  );
};

export default CreateTodoPage;
