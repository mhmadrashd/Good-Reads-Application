// import styles from './SideStyle.css'
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
import StickyHeadTable from '../UserTable/UserTable'

const sideBarStyle = makeStyles({
    sideBar: {
        background: "linear-gradient(45deg, #FE6B8B 60%, #FF8E53 90%)",
        minWidth:200,
        color: 'white',
        fontSize: 100,
    },
    
});


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
        >
        {value === index && (
            <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
            </Box>
        )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export default function VerticalTabs() {
    const [value, setValue] = React.useState(0);
    
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    
    const sideStyle = sideBarStyle({});
    
    return (
        <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', minHeight: 800, width:"100%" , overflow: 'hidden' }} >
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                className={`${sideStyle.sideBar}`}
                textColor= 'red !important'
                
                
            >
                <Tab label="All" {...a11yProps(0)} />
                <Tab label="Read" {...a11yProps(1)} />
                <Tab label="Current Reading" {...a11yProps(2)} />
                <Tab label="Want to Read" {...a11yProps(3)} />
            </Tabs>
            <TabPanel value={value} index={0}>
                <StickyHeadTable />
            </TabPanel>
            <TabPanel value={value} index={1}>
                Read
            </TabPanel>
            <TabPanel value={value} index={2}>
                Current Reading
            </TabPanel>
            <TabPanel value={value} index={3}>
                Want to Read    
            </TabPanel>
        </Box>
    );
}
