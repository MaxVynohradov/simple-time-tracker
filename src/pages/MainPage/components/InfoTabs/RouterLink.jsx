import React, { forwardRef } from 'react';
import { Link } from 'react-router-dom';

// eslint-disable-next-line react/jsx-props-no-spreading
const RouterLink = forwardRef((props, ref) => (<Link innerRef={ref} {...props} />));

export default RouterLink;
