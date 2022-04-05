import {
  Container,
  Box,
  AppBar,
  Toolbar,
  Typography,
  Paper,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

const DashboardLayout = (props: Props): JSX.Element => {
  const { children } = props;
  const navigate = useNavigate();

  const handleClickOnLogout = () => {
    localStorage.removeItem("myoncare-token");
    navigate("/login");
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          <Button onClick={handleClickOnLogout} color="inherit">
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ paddingTop: 4 }}>
        <Paper sx={{ padding: 4 }}>{children}</Paper>
      </Container>
    </Box>
  );
};

export default DashboardLayout;
