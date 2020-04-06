import React from 'react';
import { Link } from 'react-router-dom';

// eslint-disable-next-line react/jsx-props-no-spreading
const RouterLink = React.forwardRef((props, ref) => (<Link innerRef={ref} {...props} />));

export default RouterLink;
