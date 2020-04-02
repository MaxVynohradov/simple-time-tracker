import React from 'react'
import PropTypes from 'prop-types';


const TabPanel = ({ children, value, index, ...other }) => (
  <div
    component="div"
    role="tabpanel"
    hidden={value !== index}
    id={`simple-tabpanel-${index}`}
    {...other}
  >
    {children}
  </div>
);

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

export default TabPanel;