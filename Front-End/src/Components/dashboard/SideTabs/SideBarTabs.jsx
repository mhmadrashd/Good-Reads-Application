// import styles from './SideStyle.css'
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import StickyHeadTable from '../UserTable/UserTable'
import { useSelector } from 'react-redux';


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
                <Box sx={{ p: 3, marginTop: 2 }}>
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
    const { mode } = useSelector((state) => state.DataReducer);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{
            flexGrow: 1,
            bgcolor: 'background.paper',
            display: 'flex',
            minHeight: 500,
            width: "100%",
            overflow: 'hidden'
        }} >
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{
                    background: mode === 'light' ?
                        "linear-gradient(45deg, #FE6B8B 60%, #FF8E53 90%)" :
                        "rgba(38, 40, 51, .5)",
                    minWidth: 200,
                    color: 'white',
                    fontSize: 100,
                }}


            >
                <Tab sx={{ color: 'white', fontSize: 20, fontWeight: 500, fontFamily: 'Oswald' }} label="All" {...a11yProps(0)} />
                <Tab sx={{ color: 'white', fontSize: 20, fontWeight: 500, fontFamily: 'Oswald' }} label="Read" {...a11yProps(1)} />
                <Tab sx={{ color: 'white', fontSize: 20, fontWeight: 500, fontFamily: 'Oswald' }} label="Current Reading" {...a11yProps(2)} />
                <Tab sx={{ color: 'white', fontSize: 20, fontWeight: 500, fontFamily: 'Oswald' }} label="Want to Read" {...a11yProps(3)} />
            </Tabs>
            <TabPanel value={value} index={0}>
                <StickyHeadTable value={value} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <StickyHeadTable value={value} />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <StickyHeadTable value={value} />
            </TabPanel>
            <TabPanel value={value} index={3}>
                <StickyHeadTable value={value} />
            </TabPanel>
        </Box>
    );
}
