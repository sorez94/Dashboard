import * as React from 'react';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {green} from "@mui/material/colors";
import Card from "@mui/material/Card";
import ServiceHistoryTab from "./ServiceHistoryTab";
import TempHistoryTab from "./TempHistoryTab";
import OsHistoryTab from "./OsHistoryTab";
import JobHistoryTab from "./JobHistoryTab";


interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3, color: 'black'}}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

const theme = createTheme({
    palette: {
        text: {
            primary: '#f3f0f0', // Your custom text color
        },
    },
    typography: {
        fontFamily: 'Vazirmatn', // Your custom font
    },
    components: {
        MuiTabs: {
            styleOverrides: {
                indicator: {
                    backgroundColor: 'rgb(46,135,236)', // Your custom indicator color
                },
            },
        },
    },
});

export default function HistoryTable() {

    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };


    return (
        <ThemeProvider theme={theme}>
            <Card sx={{height: 700, backgroundColor: 'white'}}>
                <AppBar position="static">
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="secondary"
                        textColor="primary"
                        variant="fullWidth"
                        aria-label="full width tabs example"
                        style={{backgroundColor: 'white'}}
                    >
                        <Tab style={{color: 'black'}} label="تاریخچه وضعیت دریافت اطلاعات از سرور"/>
                        <Tab style={{color: 'black'}} label="تاریخچه حجم تغیرات دیتا"/>
                        <Tab style={{color: 'black'}} label="تاریخچه اجرا جاب"/>
                    </Tabs>
                </AppBar>
                <TabPanel value={value} index={0} dir={theme.direction}>
                    <ServiceHistoryTab/>
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    <OsHistoryTab />
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                    <JobHistoryTab />
                </TabPanel>
            </Card>
        </ThemeProvider>
    );
}
