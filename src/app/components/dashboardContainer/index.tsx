import React, { useState } from "react";
import { Container } from "@mui/material";
import Header from "../header";
import Sidebar from "../sidebar";
import { handleLogout } from "./utils";

const DashboardContainer: React.FC<{
  children: React.ReactNode;
  name: string;
}> = ({ children, name }) => {
  const [collapseSideBar, setCollapseSideBar] = useState(true);
  return (
    <>
      <Header name={name} onLogout={() => handleLogout()} />
      <Sidebar setIsOpen={setCollapseSideBar} isOpen={collapseSideBar}/>
      <Container
        maxWidth="lg"
        style={{ marginTop: "80px", marginLeft: collapseSideBar ? "240px" : "80px" }}
      >
        {children}
      </Container>
    </>
  );
};

export default DashboardContainer;
