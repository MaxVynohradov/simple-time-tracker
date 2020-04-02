import React from 'react';
import { Tab } from '@material-ui/core';

import RouterLink from './RouterLink';

const TabLink = ({
  to,
  value,
  ...props
}) => (<Tab component={RouterLink} to={to ?? value} value={value} {...props} />);

export default TabLink;