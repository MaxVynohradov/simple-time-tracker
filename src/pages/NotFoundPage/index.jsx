import React from 'react';
import { useHistory } from 'react-router-dom';
import { Paper, Button } from '@material-ui/core';

export default function NotFoundPage() {
  const history = useHistory();
  return (
    <Paper>
      <h2>Page not found!</h2>
      <Button onClick={() => history.push('/tasks')}>Go to tasks page</Button>
    </Paper>
  );
}
