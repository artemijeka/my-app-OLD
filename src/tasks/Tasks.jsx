import React from 'react';
import './tasks-card.scss';
import TasksCard from './TasksCard.jsx';

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