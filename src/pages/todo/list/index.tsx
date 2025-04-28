import React from "react";
import DashboardContainer from "@/app/components/dashboardContainer";
import TodoList from "./todoList";

const CreateTodoPage: React.FC = () => {
  return (
    <DashboardContainer name="View Todos">
      <TodoList />
    </DashboardContainer>
  );
};

export default CreateTodoPage;
