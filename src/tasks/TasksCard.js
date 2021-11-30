import React from 'react';
import Card from '../card/Card';
import Button from '../button/Button';
import TasksItem from './TasksItem';
import './tasks-card.scss';

class TasksCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasksList: [],
      maxTasksId: 0,
    }
    this.addTask = this.addTask.bind(this);
  }

  componentDidMount() {
    const openIndexedDB = indexedDB.open('tasks', 1);
    // console.log(openIndexedDB);

    openIndexedDB.onupgradeneeded = function () {
      console.log('upgradeneeded');
      // срабатывает, если на клиенте нет базы данных
      // ...выполнить инициализацию...
      this.idb = openIndexedDB.result;

      if (!this.idb.objectStoreNames.contains('tasks-card')) { // если хранилище "tasks-card" не существует
        this.idb.createObjectStore('tasks-card', {// создаем хранилище
          keyPath: 'id',//вместо этого я использовал такой подход: const request = tasksCard.add(task, task.id);
          autoIncrement: true,//вместо этого я использовал такой подход: const request = tasksCard.add(task, task.id);
        });
      }

      // Чтобы удалить хранилище объектов:
      // this.idb.deleteObjectStore('tasks-card');

      switch (this.idb.version) { // существующая (старая) версия базы данных
        case 0:
          // версия 0 означает, что на клиенте нет базы данных
          // выполнить инициализацию
          break;
        case 1:
          // на клиенте версия базы данных 1
          // обновить
          break;
        default:
          console.log('some default switch');
      }
    }


    openIndexedDB.onerror = function () {
      console.error("error", openIndexedDB.error);
    };


    openIndexedDB.onsuccess = function () {
      console.log('success');
      // продолжить работу с базой данных, используя объект idb
      // this.setState({
      //   idb: openIndexedDB.result,
      // });
      this.idb = openIndexedDB.result;
      console.log('version: ' + this.idb.version);
      // console.log(this.idb);

      this.idb.onversionchange = function () {
        this.idb.close();
        alert("База данных устарела, пожалуста, перезагрузите страницу.")
      };

      // console.log(this.idb);
      this.transaction = this.idb.transaction('tasks-card', 'readonly');

      let tasksCard = this.transaction.objectStore("tasks-card");

      console.log(tasksCard);
      // TODO отрендерить TasksList из 'tasks-card'
    }.bind(this);


    openIndexedDB.onblocked = function () {
      // есть другое соединение к той же базе
      // и оно не было закрыто после срабатывания на нём idb.onversionchange
    };

    // Удалить базу данных:
    // const deleteIndexedDB = indexedDB.deleteDatabase('tasks-card');
    // deleteRequest.onsuccess/onerror отслеживает результат
  }



  addTask() {
    console.log('adding task...');
    // console.log(this.idb);
    this.transaction = this.idb.transaction('tasks-card', 'readwrite');

    let tasksCard = this.transaction.objectStore("tasks-card");

    // console.log(tasksCard);

    let newTask = {
      id: this.state.maxTasksId + 1,
      content: '',
      created: new Date(),
    };

    this.setState((state, props) => ({
      maxTasksId: state.maxTasksId + 1
    }));

    const newTaskJSX = (
      <TasksItem
        key={'id-' + newTask.id}
        id={'id-' + newTask.id}
        className='tasks-list__tasks-item'
      />
    );

    let request = tasksCard.add(newTask, newTask.id);//, task.id

    // console.log(this.state.tasksList);
    // this.tasksList.append( newTaskJSX );
    this.setState((state, props) => ({
      tasksList: state.tasksList.concat(newTaskJSX),
    }));

    request.onsuccess = function () {
      console.log("Задача добавлена в хранилище: ", request.result);
    };

    request.onerror = function () {
      console.log("Ошибка: ", request.error);
    };
  }

  render() {
    return (
      <Card title="Мои задачи">
        <div className="tasks-card__list">
          {this.state.tasksList}
        </div>
        <div className="row js-c mt-05">
          <Button
            className="tasks-item__button --green"
            title="Добавить задачу!"
            onClick={this.addTask}
          >
            +
          </Button>
        </div>
      </Card>
    );
  }
}

export default TasksCard;