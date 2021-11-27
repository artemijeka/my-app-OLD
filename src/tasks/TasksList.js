import React from 'react';
import Card from '../card/Card';
import TasksItem from './TasksItem';
import './tasks-list.scss';

class TasksList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Card title="Мои задачи">
        <TasksItem
          key={this.props.key}
          className='tasks-list__tasks-item'
        />
      </Card>
    );
  }
}

export default TasksList;