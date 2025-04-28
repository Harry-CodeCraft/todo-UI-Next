import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";
import { AccountCircle, ArrowDropDown } from "@mui/icons-material";
import { globalColors } from "@/app/styles/colors";

interface HeaderProps {
  name: string;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = (props) => {
  const { name, onLogout } = props;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: 999,
        backgroundColor: globalColors.deepSteelBlue,
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0 24px",
        }}
      >
        {/* App Name */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            color: "#ffffff",
          }}
        >
          My App
        </Typography>

        {/* User Section */}
        <Box display="flex" alignItems="center">
          <Button
            color="inherit"
            startIcon={<AccountCircle />}
            endIcon={<ArrowDropDown />}
            onClick={handleMenuOpen}
            sx={{
              textTransform: "none",
              color: "#ffffff",
              fontWeight: "500",
              fontSize: "1rem",
            }}
          >
            {name}
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            PaperProps={{
              sx: {
                mt: 1,
                backgroundColor: "#2e2e4f",
                color: "#ffffff",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
              },
            }}
          >
            <MenuItem
              onClick={() => {
                handleMenuClose();
                onLogout();
              }}
              sx={{
                "&:hover": {
                  backgroundColor: "#3e3e5f",
                },
              }}
            >
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;