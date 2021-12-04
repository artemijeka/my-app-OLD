import React from 'react';
import TasksCard from './TasksCard';
import './tasks-card.scss';

class Tasks extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TasksCard />
    );
  }
}

export default Tasks;