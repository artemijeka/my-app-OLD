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
    this.tasksItemSave = this.tasksItemSave.bind(this);
  }

  componentDidMount() {

    const openedIndexedDB = indexedDB.open('tasks', 1);

    openedIndexedDB.onupgradeneeded = function () {
      console.log('upgradeneeded');
      // срабатывает, если на клиенте нет базы данных
      // ...выполнить инициализацию...
      this.idb = openedIndexedDB.result;

      if (!this.idb.objectStoreNames.contains('tasks-card')) { // если хранилище "tasks-card" не существует
        this.idb.createObjectStore('tasks-card', {// создаем хранилище
          keyPath: 'id',//вместо этого можно использовать такой подход: const request = tasksCard.add(task, task.id); ниже
          // autoIncrement: true,//вместо этого можно использовать такой подход: const request = tasksCard.add(task, task.id); ниже
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

    openedIndexedDB.onerror = function () {
      console.error("error", openedIndexedDB.error);
    };

    openedIndexedDB.onsuccess = function () {
      console.log('openedIndexedDB success');
      this.idb = openedIndexedDB.result;
      console.log('version idb: ' + this.idb.version);

      this.idb.onversionchange = function () {
        this.idb.close();
        alert("База данных устарела, пожалуста, перезагрузите страницу.")
      };

      this.transaction = this.idb.transaction('tasks-card', 'readonly');

      let tasksCardTransaction = this.transaction.objectStore("tasks-card");
      console.log('tasksCardTransaction: ');
      console.log('tasksCardTransaction: ' + tasksCardTransaction);

      // // получить одну книгу
      // books.get('js')
      // // получить все книги с 'css' < id < 'html'
      // books.getAll(IDBKeyRange.bound('css', 'html'))
      // // получить книги с 'html' <= id
      // books.getAll(IDBKeyRange.lowerBound('html', true))
      // // получить все ключи: id >= 'js'
      // books.getAllKeys(IDBKeyRange.lowerBound('js', true))

      // получить все книги
      let allTasks = tasksCardTransaction.getAll();
      this.transaction.oncomplete = function () {
        console.log("Транзакция idb выполнена");
        console.log(allTasks.result);
        for (let item of allTasks.result) {
          let newTaskJSX = (
            <TasksItem
              content={item.content}
              created={item.created}
              dataId={item.id}
              id={'id-' + item.id}
              className='tasks-list__tasks-item'
              key={item.id}
              tasksItemSave={this.tasksItemSave}
            />
          );

          this.setState((state, props) => ({
            tasksList: state.tasksList.concat(newTaskJSX),
          }));
        }
      }.bind(this);

      // TODO отрендерить TasksList из 'tasks-card'
    }.bind(this);

    openedIndexedDB.onblocked = function () {
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

    let tasksCardTransaction = this.transaction.objectStore("tasks-card");

    // console.log(tasksCardTransaction);

    let newTask = {
      id: this.state.maxTasksId + 1,
      content: '',
      created: new Date(),
    };

    let request = tasksCardTransaction.add(newTask);//, task.id

    this.transaction.oncomplete = function () {
      console.log("Транзакция idb выполнена");
    };

    this.setState((state, props) => ({
      maxTasksId: state.maxTasksId + 1
    }));

    let newTaskJSX = (
      <TasksItem
        content={newTask.content}
        created={newTask.created}
        dataId={newTask.id}
        id={'id-' + newTask.id}
        className='tasks-list__tasks-item'
        key={newTask.id}
        tasksItemSave={this.tasksItemSave}
      />
    );

    // console.log(this.state.tasksList);
    // this.tasksList.append( newTaskJSX );
    this.setState((state, props) => ({
      tasksList: state.tasksList.concat(newTaskJSX),
    }));

    request.onsuccess = function () {
      console.log("Задача добавлена в хранилище объектов (idb): ", request.result);
    };

    request.onerror = function (event) {
      console.log("Ошибка: ", request.error);
      // ConstraintError возникает при попытке добавить объект с ключом, который уже существует
      if (request.error.name === "ConstraintError") {
        console.log("Задача с таким id в idb уже существует!");//обрабатываем ошибку
        event.preventDefault(); // предотвращаем отмену транзакции
        event.stopPropagation(); // предотвращаем всплытие ошибки
        // ...можно попробовать использовать другой ключ...
      } else {
        // ничего не делаем
        // транзакция будет отменена
        // мы можем обработать ошибку в transaction.onabort
      }
    };

    // Чтобы вручную отменить транзакцию, выполните:
    // this.transaction.onabort = function() {
    //   console.log("Ошибка", transaction.error);
    // };
  }

  tasksItemSave(e) {
    console.log('saving this task!!!');
    
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