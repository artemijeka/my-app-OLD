import React from 'react';
import './tasks-item.scss'

class TasksItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={`tasks-item ${this.props.className}`}>
        <textarea className='tasks-item__content'></textarea>
        <button>1</button>
        <button>2</button>
      </div>
    );
  }
}

export default TasksItem;