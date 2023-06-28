import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
import FlightTakeoffOutlinedIcon from "@mui/icons-material/FlightTakeoffOutlined";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";

export default function JobInfo(props) {
  const { data, company, name, vacation, position, unemployed } = props;

  const lastItem = data.length > 0 ? data[data.length - 1] : null;
  return (
    <div
      style={{
        width: "100%",
        marginBottom: 10,
        backgroundColor: "#1e1e1e",
        borderColor: "#1e1e1e",
        border: "10px solid #1e1e1e",
        borderRadius: "10px",
      }}
      onClick={() => console.log(data)}
    >
      <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
        {name ? (
          <Typography
            variant="h5"
            sx={{
              color: "#fff",
              backgroundColor: "#060d27",
              width: "fit-content",
              p: 1.5,
              borderRadius: "10px",
            }}
            component="div"
          >
            {name}
          </Typography>
        ) : (
          <Typography
            variant="h5"
            sx={{
              color: "#fff",
              backgroundColor: "#060d27",
              width: "fit-content",
              p: 1.5,
              borderRadius: "10px",
            }}
            component="div"
          >
            {lastItem.employee_name
              ? lastItem.employee_name
              : lastItem.name
              ? lastItem.name
              : "Employee Name"}
          </Typography>
        )}
      </Grid>
      <Grid item xs={12}>
        <Typography
          variant="h5"
          sx={{
            color: "#fff",
            mt: 2,
            mb: 2,
            display: "flex",
            justifyContent: { xs: "center", sm: "flex-start" },
          }}
          component="div"
        >
          Employee Information:
        </Typography>
      </Grid>
      {unemployed ? (
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          <Typography
            variant="h5"
            sx={{
              color: "#fff",
              backgroundColor: "#060d27",
              width: "fit-content",
              p: 1.5,
              borderRadius: "10px",
              fontSize: {xs:"1.2rem", sm: "1.5rem"},
            }}
            component="div"
          >
            Unemployed since{" "}
            {new Date(lastItem.date_left).toLocaleDateString("en-US", {
              month: "2-digit",
              day: "2-digit",
              year: "numeric",
            })}
          </Typography>
        </Grid>
      ) : (
        <>
          <Grid
            container
            justifyContent={"space-evenly"}
            spacing={{ xs: 2, md: 3 }}
          >
            <Grid item xs={12} sm={6} md={4} xl={4}>
              <Stack
                sx={{
                  backgroundColor: "#060d27",
                  padding: 1,
                  color: "#EEEEF0",
                  flexGrow: 1,
                  borderRadius: "10px",
                }}
                direction="row"
                justifyContent={"center"}
                alignItems={"center"}
              >
                <AssignmentIndOutlinedIcon sx={{ pr: 0.6 }} />
                {position ? (
                  <Typography variant="h6" component="div">
                    {position}
                  </Typography>
                ) : (
                  <Typography variant="h6" component="div">
                    {lastItem.position
                      ? lastItem.position
                      : lastItem.position
                      ? lastItem.position
                      : "Position Role"}
                  </Typography>
                )}
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6} md={4} xl={4}>
              <Stack
                sx={{
                  backgroundColor: "#060d27",
                  padding: 1,
                  color: "#EEEEF0",
                  flexGrow: 1,
                  borderRadius: "10px",
                }}
                direction="row"
                justifyContent={"center"}
                alignItems={"center"}
              >
                <BusinessRoundedIcon sx={{ pr: 0.6 }} />
                {company ? (
                  <Typography variant="h6" component="div">
                    {company}
                  </Typography>
                ) : (
                  <Typography variant="h6" component="div">
                    {lastItem.company_name
                      ? lastItem.company_name
                      : lastItem.companyname
                      ? lastItem.companyname
                      : "Company Here"}
                  </Typography>
                )}
              </Stack>
            </Grid>
            <Grid item xs={12} sm={8} md={4} xl={4}>
              <Stack
                sx={{
                  backgroundColor: "#060d27",
                  padding: 1,
                  color: "#EEEEF0",
                  flexGrow: 1,
                  borderRadius: "10px",
                }}
                direction="row"
                justifyContent={"center"}
                alignItems={"center"}
              >
                <FlightTakeoffOutlinedIcon sx={{ pr: 0.6 }} />
                {vacation !== undefined ? (
                  <Typography variant="h6" component="div">
                    Is on Vacation? {vacation ? "Yes" : "No"}
                  </Typography>
                ) : (
                  <Typography variant="h6" component="div">
                    Is on Vacation? {lastItem.on_vacation ? "Yes" : "No"}
                  </Typography>
                )}
              </Stack>
            </Grid>
          </Grid>
          </>
      )}
    </div>
  );
}
