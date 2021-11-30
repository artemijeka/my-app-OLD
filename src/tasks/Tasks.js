import React from 'react';
import TasksCard from './TasksCard';
import './tasks-card.scss';

class Tasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // tasksItems: <br/>,
      // idb: null,
    }
  }

  render() {
    return (
      <TasksCard
        // children={this.state.tasksItems}
      />
    );
  }
}

export default Tasks;