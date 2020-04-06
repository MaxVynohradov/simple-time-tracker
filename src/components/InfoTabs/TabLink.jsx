/* eslint-disable react/forbid-prop-types, react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import { Tab } from '@material-ui/core';

import RouterLink from './RouterLink';

const TabLink = ({
  to,
  value,
  ...props
// eslint-disable-next-line react/jsx-props-no-spreading
}) => (<Tab component={RouterLink} to={to ?? value} value={value} {...props} />);

TabLink.propTypes = {
  to: PropTypes.any,
  value: PropTypes.any,
};

export default TabLink;
