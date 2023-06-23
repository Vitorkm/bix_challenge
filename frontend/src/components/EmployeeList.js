
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";


  

export default function EmployeeList(props) {

    const { employees } = props;
    const navigate = useNavigate();
  
  return (
    <Stack
          sx={{
            width: "100%",
            bgcolor: "#121212",
            borderRadius: "10px",
            mt: 2,
            filter: "drop-shadow(5px 5px 5px #222)",
          }}
        >
          <List
            disablePadding
            sx={{
              position: "relative",
              overflow: "auto",
              height: {
                xs: "10rem",
                sm: "16.25rem",
                md: "18.75rem",
                xl: "31.25rem",
              },
              overflowY: "scroll",
              scrollbarWidth: "thin",
              "&::-webkit-scrollbar": {
                width: "8px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#888",
                borderRadius: "15px",
              },
              "&::-webkit-scrollbar-thumb:hover": {
                backgroundColor: "#555",
              },
            }}
          >
            {employees ? (
              employees.map((employee) => (
                <>
                  <ListItem
                    disablePadding
                    sx={{ color: "#F3F9D2", "&:hover": { color: "#fff" } }}
                  >
                    <ListItemButton
                      onClick={() =>
                        navigate(`/employee/${employee.employee_id}`)
                      }
                    >
                      <ListItemText primary={employee.employee_name} />
                    </ListItemButton>
                  </ListItem>
                  <Divider />
                </>
              ))
            ) : (
              <Box sx={{ color: "#EEEEF0", textAlign: "center", mt: 2 }}>
                <CircularProgress />
              </Box>
            )}
          </List>
        </Stack>
  );
}
