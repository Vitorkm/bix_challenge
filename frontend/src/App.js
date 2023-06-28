import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import EmployeeInfo from "./pages/EmployeeInfo";
import StandardPage from "./StandardPage";
import Register from "./pages/Register";
import Edit from "./pages/Edit";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import PrivateRoute from "./PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import PrivateAdminRoute from "./PrivateAdminRoute";

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme} >
      <div>
        <Router>
          <AuthProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/employee/:id"
              element={<StandardPage children={<PrivateRoute Component={EmployeeInfo} />} />}
            />
            <Route
              path="/dashboard"
              element={<StandardPage children={<PrivateRoute Component={Dashboard} />} />}
            />
            <Route
              path="/register/:nome?"
              element={<StandardPage children={<PrivateAdminRoute Component={Register} />} />}
            />
            <Route
              path="/edit/:type/:id"
              element={<StandardPage children={<PrivateAdminRoute Component={Edit} />} />}
            />
          </Routes>
          </AuthProvider>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
