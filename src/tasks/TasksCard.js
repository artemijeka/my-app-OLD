import React from 'react';
import Card from '../card/Card';
import Button from '../button/Button';
import TasksItem from './TasksItem';
import './tasks-card.scss';

class TasksCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <Card title="Мои задачи">
        {this.props.children}
        <div className="row js-c mt-05">
          <Button
            className="tasks-item__button --green"
            title="Добавить задачу!"
            onClick={this.props.addTask}
          >
            +
          </Button>
        </div>
      </Card>
    );
  }
}

export default TasksCard;