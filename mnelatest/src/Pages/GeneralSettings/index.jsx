import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import { green } from '@mui/material/colors';
import { Card, createTheme, Typography } from '@mui/material';
import SystemSettingForm from './SystemSettings';
import MembersTable from './Members';
import RoleSetup from './RoleSetup';
import ProjectSetting from './ProjectSetting/Index';
import ReportSetup from './ReportSetUp';
import ReportSetting from './Report';
import ViewRoles from './Roles/ViewRoles';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography  component={'span'} variant={'body2'}>{children}</Typography>
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
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
export default function GeneralSettings() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Card>
    <Box
      sx={{
        flexGrow: 1,
        maxWidth: { xs: 320, sm: 480 ,md:991,lg:1900},
        // bgcolor: 'background.paper',
      }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons
      
       

        aria-label="visible arrows tabs example"
        sx={{
          [`& .${tabsClasses.scrollButtons}`]: {
            '&.Mui-disabled': { opacity: 0.3 },
            
          },
          '& button.Mui-selected':{color:"#00a15d"},
          '&.MuiTabs-indicator':{color:"red"}



       
        }}
      >
        <Tab label="Company Setup" to="#company-setup" style={{minWidth:`${100/6}%`}} {...a11yProps(0)} />
        <Tab label="Project Settings"  style={{minWidth:`${100/6}%`}} {...a11yProps(1)}/>
        <Tab label="members Setup" style={{minWidth:`${100/6}%`}} {...a11yProps(2)}/>
        <Tab label="Report Setup"  style={{minWidth:`${100/6}%`}} {...a11yProps(3)}/>
        <Tab label="My Roles"  style={{minWidth:`${100/6}%`}} {...a11yProps(4)}/>
     
      </Tabs>

    </Box>
    <TabPanel value={value} path="#company-setup" index={0}>
  <SystemSettingForm/>
</TabPanel>
<TabPanel value={value} path="#project-settings"  index={1}>
  <ProjectSetting/>
</TabPanel>
<TabPanel value={value} index={2}>
<MembersTable/>
</TabPanel>
<TabPanel value={value} path="#roles" index={3}>
<ReportSetting/>
</TabPanel>
{/* <TabPanel value={value} index={4}>
<RoleSetup/>
</TabPanel> */}
<TabPanel value={value} index={4}>
<ViewRoles/>
</TabPanel>
    </Card>
  );
}
