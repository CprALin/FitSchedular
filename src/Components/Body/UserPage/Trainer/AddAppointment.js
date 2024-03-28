import UserOptions from "../User/UserOptions";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { useState } from "react";
import { Box } from '@mui/material';


function AddAppointment(){
    const [dateTime , setDateTime] = useState('');
    const [finishHour , setFinishHour] = useState('');

    console.log(dateTime);
    console.log(finishHour)

    const theme = createTheme({
        palette: {
           mode : 'dark',
           primary : {
               main : '#F05941'
           },
           text : {
              primary : '#FFF',
              secondary : '#FFF'
           }
        }
    });

    return(
        <div className="user-page">
            <UserOptions />

            <section className="user-profile-settings">
                 <div className="settings-container">
                      <h1>New Appointment</h1>

                      <Box sx={{margin : '10px'}}>
                        <ThemeProvider theme={theme}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
                                    <DateTimePicker
                                        label="Date and Time"
                                        onChange={(newValue) => setDateTime(newValue)}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </ThemeProvider>
                       </Box>

                      <Box sx={{margin : '10px'}}>
                        <ThemeProvider theme={theme}>
                            <TimePicker
                                    label="Finish Hour"
                                    onChange={(newValue) => setFinishHour(newValue)}
                            />
                        </ThemeProvider>
                      </Box> 
                 </div>
            </section>
        </div>
    );
}

export default AddAppointment;