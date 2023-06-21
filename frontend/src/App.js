import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import EmployeeInfo from "./pages/EmployeeInfo";
import StandardPage from "./StandardPage";
import { ThemeProvider, createTheme } from "@mui/material/styles";

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/employee/:id"
              element={<StandardPage children={<EmployeeInfo/>} />}
            />
            <Route
              path="/dashboard"
              element={<StandardPage children={<Dashboard/>} />}
            />
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
