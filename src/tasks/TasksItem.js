import React from 'react';
import Button from '../button/Button';
import './tasks-item.scss'

class TasksItem extends React.Component {
  constructor(props) {
    super(props);
    this.tasksItemSaveOrStart = this.tasksItemSaveOrStart.bind(this);
    this.tasksItemChange = this.tasksItemChange.bind(this);
    this.state = {
      tasksItemValue: '',
    }
  }

  tasksItemSaveOrStart(e) {
  }

  tasksItemChange(e) {
    this.setState({
      tasksItemValue: e.target.value,
    });
  }

  render() {
    return (
      <div
        className={`tasks-item ${this.props.className}`}
        key={this.props.key}
        id={this.props.id}
      >
        <textarea
          className='tasks-item__content'
          value={this.state.tasksItemValue}
          onChange={this.tasksItemChange}
        >
        </textarea>
        <Button
          className="tasks-item__button --yellow"
          title="Сохранить!"
          onClick={this.tasksItemSaveOrStart}
        >S</Button>
        <Button className="tasks-item__button --green" title="Задача выполнена!">V</Button>
        <Button className="tasks-item__button" title="Удалить задачу!">X</Button>
      </div>
    );
  }
}

export default TasksItem;