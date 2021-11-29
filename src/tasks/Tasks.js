import React from 'react';
import TasksCard from './TasksCard';
import TasksItem from './TasksItem';
import './tasks-card.scss';

class Tasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasksItems: null,
      // idb: null,
    }
    this.addTask = this.addTask.bind(this);
  }

  componentDidMount() {
    const openIndexedDB = indexedDB.open('tasks', 1);
    console.log(openIndexedDB);

    openIndexedDB.onupgradeneeded = function () {
      console.log('upgradeneeded');
      // срабатывает, если на клиенте нет базы данных
      // ...выполнить инициализацию...
      let idb = openIndexedDB.result;

      if (!idb.objectStoreNames.contains('tasks-card')) { // если хранилище "books" не существует
        idb.createObjectStore('tasks-card', {// создаем хранилище
          // keyPath: 'id',//вместо этого я использовал такой подход: const request = tasksCard.add(task, task.id);
          // autoIncrement: true,//вместо этого я использовал такой подход: const request = tasksCard.add(task, task.id);
        });
      }

      // Чтобы удалить хранилище объектов:
      // this.idb.deleteObjectStore('tasks-card');

      switch (idb.version) { // существующая (старая) версия базы данных
        case 0:
        // версия 0 означает, что на клиенте нет базы данных
        // выполнить инициализацию
        case 1:
        // на клиенте версия базы данных 1
        // обновить
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
      console.log(this.idb);

      this.idb.onversionchange = function () {
        this.idb.close();
        alert("База данных устарела, пожалуста, перезагрузите страницу.")
      };
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
    console.log(this.idb);
    this.transaction = this.idb.transaction('tasks-card', 'readwrite');

    let tasksCard = this.transaction.objectStore("tasks-card");

    let task = {
      id: 1,
      content: 'testtttt',
      created: new Date(),
    };

    const itemJSX = (
      <div className="row js-c">
        <TasksItem
          tasksItemKey={'id-'+task.id}
          className='tasks-list__tasks-item'
        />
      </div>
    );

    this.setState({
      tasksItems: itemJSX
    });

    let request = tasksCard.put(task, task.id);//, task.id

    request.onsuccess = function () {
      console.log("Задача добавлена в хранилище: ", request.result);
    };

    request.onerror = function () {
      console.log("Ошибка: ", request.error);
    };
  }

  render() {
    return (
      <TasksCard
        addTask={this.addTask}
        children={this.state.tasksItems}
      />
    );
  }
}

export default Tasks;