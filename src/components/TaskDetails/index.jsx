import React from 'react'
import { useHistory } from "react-router-dom";
import { Panel, Button } from '@material-ui/core';

export default function NotFoundPage(props) {
  const history = useHistory()
  return (
    <Panel>
      <h2>Tasks</h2>
       {/* TODO: add logic to show props  */}
      <Button onClick={() => history.push('/tasks')}>Go to tasks page</Button>
    </Panel>
  )
}