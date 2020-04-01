import React from 'react'
import { useHistory } from "react-router-dom";
import { Panel, Button } from '@material-ui/core';

export default function NotFoundPage() {
  const history = useHistory()
  return (
    <Panel>
      <h2>Page not found!</h2>
      <Button onClick={() => history.push('/tasks')}>Go to tasks page</Button>
    </Panel>
  )
}