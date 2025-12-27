import React from "react";
import DashboardContainer from "@/app/components/dashboardContainer";
import ExcelUpload from "./excelUpload";

const BulkUploadTodos: React.FC = () => {
  return (
    <DashboardContainer name="Bulk Upload Todos">
      <ExcelUpload />
    </DashboardContainer>
  );
};

export default BulkUploadTodos;
