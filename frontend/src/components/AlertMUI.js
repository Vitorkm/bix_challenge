import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
import Box from '@mui/material/Box';
import { forwardRef } from 'react';



const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
const vertical = 'top'
const horizontal = 'center'
  

export default function AlertMUI(props) {

    const { open, handleClose, message, severity } = props;
    

    return (
    <Box >
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        TransitionComponent={Slide}
        open={open}
        onClose={handleClose}
        key={vertical + horizontal}
        autoHideDuration={severity === "error" ? 3000 : 600}
      >
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </Box>
    );

}