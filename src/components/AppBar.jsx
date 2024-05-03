import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useMediaQuery, useTheme } from "@mui/material";
import ButtonStyled from "./ButtonWrapper ";

const navItems = ["Contribute Salary", "View salaries"];

function DrawerAppBar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [openDrawer, setOpenDrawer] = React.useState(false);

  const handleDrawerToggle = () => {
    setOpenDrawer(!openDrawer);
  };

  return (
    <React.Fragment>
      <AppBar position="static" sx={{ bgcolor: "black" }}>
        <Toolbar>
          <Typography
            variant="p"
            component="div"
            sx={{
              flexGrow: 1,
              color: "white",
              fontWeight: "900",
              fontFamily: "serif",
              fontSize: isMobile ? "25px" : "30px",
            }}
          >
            CLEAR{" "}
            <span
              style={{
                color: "green",
              }}
            >
              WAGE
            </span>
          </Typography>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerToggle}
            sx={{ display: { md: "none" } }}
          >
            <MenuIcon
              sx={{
                fontSize: "40px",
              }}
            />
          </IconButton>
          <List sx={{ display: { xs: "none", md: "flex" } }}>
            <ButtonStyled openModal={true} bgColor="white" nav={true}>
              Contribute Salary
            </ButtonStyled>
            <ButtonStyled scrollToSection={true} bgColor="white" nav={true}>
              View Data
            </ButtonStyled>
          </List>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={handleDrawerToggle}
        sx={{
          "& .MuiDrawer-paper": { width: "240px" },
        }}
      >
        <List
          sx={{
            marginTop: "100px",
            width: "100%",
            textAlign: "center",
          }}
        >
          <ButtonStyled openModal={true} bgColor="black" nav={true}>
            Contribute Salary
          </ButtonStyled>
          <ButtonStyled scrollToSection={true} bgColor="black" nav={true}>
            View Data
          </ButtonStyled>
        </List>
      </Drawer>
    </React.Fragment>
  );
}

export default DrawerAppBar;
