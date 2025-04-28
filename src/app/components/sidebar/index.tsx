import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Drawer,
  IconButton,
  Tooltip,
  Box,
} from "@mui/material";
import { styled } from "@mui/system";
import { useRouter } from "next/router";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { makeStyles } from "@mui/styles";
import { globalColors } from "@/app/styles/colors";

const StyledDrawer = styled(Drawer)(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ({ open }: { theme?: any; open: boolean }) => ({
    width: open ? 248 : 60,
    flexShrink: 0,
    "& .MuiDrawer-paper": {
      width: open ? 248 : 60,
      boxSizing: "border-box",
      backgroundColor: globalColors.darkCharcoalBlue,
      color: globalColors.white,
      zIndex: 10,
      overflowX: "unset",
      overflowY: "unset",
      transition: "width 0.3s ease",
    },
  })
);

const StyledList = styled(List)({
  marginTop: "0px",
});

const StyledListItem = styled(ListItem)({
  "&:hover": {
    backgroundColor: "#2e2e4f",
    cursor: "pointer",
  },
});

const SidebarHeader = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  height: "60px",
  backgroundColor: "#151521",
  color: "#ffffff",
  fontWeight: "bold",
  fontSize: "1.2rem",
  padding: "0 16px",
});

const useStyles = makeStyles({
  toggleIcon: {
    position: "absolute",
    right: "-18px",
    bottom: "-850px",
    zIndex: 100,
    backgroundColor: globalColors.charcoalIndigo,
  },
  innerWrapper: {
    position: "relative",
  },
});

const Sidebar: React.FC<{
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}> = (props) => {
  const { isOpen, setIsOpen } = props;
  const route = useRouter();
  const classes = useStyles();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const routeToPage = (url: string) => {
    route.push(url);
  };

  return (
    <StyledDrawer variant="permanent" anchor="left" open={isOpen}>
      <SidebarHeader />
      <Box className={classes.innerWrapper}>
        <IconButton
          onClick={toggleSidebar}
          sx={{ color: "#ffffff" }}
          className={classes.toggleIcon}
        >
          {isOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
        <StyledList>
          <Tooltip
            title="Dashboard"
            placement="right"
            disableHoverListener={isOpen}
          >
            <StyledListItem onClick={() => routeToPage("/dashboard")}>
              <ListItemIcon>
                <DashboardIcon style={{ color: "#ffffff" }} />
              </ListItemIcon>
              {isOpen && <ListItemText primary="Dashboard" />}
            </StyledListItem>
          </Tooltip>
          <Tooltip
            title="Create Todo"
            placement="right"
            disableHoverListener={isOpen}
          >
            <StyledListItem onClick={() => routeToPage("/todo/create")}>
              <ListItemIcon>
                <AddCircleIcon style={{ color: "#ffffff" }} />
              </ListItemIcon>
              {isOpen && <ListItemText primary="Create Todo" />}
            </StyledListItem>
          </Tooltip>
          <Tooltip
            title="View Todos"
            placement="right"
            disableHoverListener={isOpen}
          >
            <StyledListItem onClick={() => routeToPage("/todo/list")}>
              <ListItemIcon>
                <ListAltIcon style={{ color: "#ffffff" }} />
              </ListItemIcon>
              {isOpen && <ListItemText primary="View Todos" />}
            </StyledListItem>
          </Tooltip>
        </StyledList>
      </Box>
    </StyledDrawer>
  );
};

export default Sidebar;
