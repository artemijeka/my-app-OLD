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
      maxTasksKey: 0,
    }
    this.addTask = this.addTask.bind(this);
    this.tasksItemSave = this.tasksItemSave.bind(this);
    this.tasksItemDelete = this.tasksItemDelete.bind(this);
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
          keyPath: 'key',//вместо этого можно использовать такой подход: const request = tasksCard.add(task, task.id); ниже
          // autoIncrement: true,//вместо этого можно использовать такой подход: const request = tasksCard.add(task, task.id); ниже
        });
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
      console.log('tasksCardTransaction: '); console.log(tasksCardTransaction);

      this.allTasks = tasksCardTransaction.getAll();

      this.transaction.oncomplete = function () {
        console.log("Транзакция idb allTasks result выполнена: "); console.log(this.allTasks.result);
        for (let item of this.allTasks.result) {
          if (item.deleted) {
            this.setState((state, props) => ({
              maxTasksKey: item.key,
            }));
            continue;
          };
          
          let newTaskJSX = (
            <TasksItem
              content={item.content}
              data-key={item.key}
              id={'i-' + item.key}
              className='tasks-list__tasks-item'
              key={item.key}
              tasksItemSave={this.tasksItemSave}
              tasksItemDelete={this.tasksItemDelete}
              data-created={item.created}
            />
          );

          this.setState((state, props) => ({
            tasksList: state.tasksList.concat(newTaskJSX),
            maxTasksKey: item.key,
          }));
          console.log('this.state.tasksList: '); console.log(this.state.tasksList);
        }
      }.bind(this);

      // TODO отрендерить TasksList из 'tasks-card'
    }.bind(this);

    openedIndexedDB.onblocked = function () {
      // есть другое соединение к той же базе
      // и оно не было закрыто после срабатывания на нём idb.onversionchange
    };
  }//componentDidMount()



  addTask() {
    console.log('adding task...');
    this.transaction = this.idb.transaction('tasks-card', 'readwrite');

    let tasksCardTransaction = this.transaction.objectStore("tasks-card");

    let newTask = {
      key: this.state.maxTasksKey + 1,
      content: '',
      created: new Date(),
    };
    console.log(newTask.key);
    console.log(this.state.maxTasksKey);

    let request = tasksCardTransaction.add(newTask);//, task.id

    this.transaction.oncomplete = function () {
      console.log("Транзакция добавления задачи выполнена");
    };

    let newTaskJSX = (
      <TasksItem
        content={newTask.content}
        data-created={newTask.created}
        data-key={newTask.key}
        id={'i-' + newTask.key}
        className='tasks-list__tasks-item'
        key={newTask.key}
        tasksItemSave={this.tasksItemSave}
        tasksItemDelete={this.tasksItemDelete}
      />
    );

    request.onsuccess = function () {
      console.log("Задача добавлена в хранилище объектов (idb): ", request.result);

      this.setState((state, props) => ({
        tasksList: state.tasksList.concat(newTaskJSX),
        maxTasksKey: state.maxTasksKey + 1
      }));
    }.bind(this);

    request.onerror = function (event) {
      console.log("Ошибка: ", request.error);
      // ConstraintError возникает при попытке добавить объект с ключом, который уже существует
      if (request.error.name === "ConstraintError") {
        console.log("Задача с таким id в idb уже существует!");//обрабатываем ошибку
        event.preventDefault(); // предотвращаем отмену транзакции
        event.stopPropagation(); // предотвращаем всплытие ошибки
        // ...можно попробовать использовать другой ключ...
      } else {
        // ничего не делаем // транзакция будет отменена // мы можем обработать ошибку в transaction.onabort
      }
    };

    // Чтобы вручную отменить транзакцию, выполните:
    // this.transaction.onabort = function() {
    //   console.log("Ошибка", transaction.error);
    // };
  }



  tasksItemSave(e) {
    console.log('saving this task!!!');
    let curTasksItem = e.target.parentElement;
    console.log(curTasksItem);
    let updateTask = {
      key: +curTasksItem.dataset.key,
      content: curTasksItem.querySelector('.tasks-item__content').value,
      updated: new Date(),
      created: curTasksItem.dataset.created,
    };
    console.log(updateTask);

    console.log('update task...');

    this.transaction = this.idb.transaction('tasks-card', 'readwrite');
    this.tasksCardTransaction = this.transaction.objectStore("tasks-card");

    let request = this.tasksCardTransaction.put(updateTask);

    // this.transaction.oncomplete = function () {
    //   console.log("Транзакция обновления задачи выполнена");
    // };

    request.onsuccess = function () {
      console.log("Задача обновлена в idb: ", request.result);
    };

    request.onerror = function (event) {
      console.log("Ошибка обновления задачи в idb: ", request.error);
    };
  }



  tasksItemDelete(e) {
    console.log('deleting this task!!!');
    let curTasksItem = e.target.parentElement;
    let curTasksItemKey = +curTasksItem.dataset.key;
    this.transaction = this.idb.transaction('tasks-card', 'readwrite');
    this.tasksCardTransaction = this.transaction.objectStore("tasks-card");

    console.log(curTasksItemKey);

    let updateTask = {
      key: +curTasksItem.dataset.key,
      content: curTasksItem.querySelector('.tasks-item__content').value,
      deleted: new Date(),
      created: curTasksItem.dataset.created,
    };

    let request = this.tasksCardTransaction.put(updateTask);

    // this.transaction.oncomplete = function() {
    //   console.log("Транзакция удаления задачи выполнена");
    // };

    request.onsuccess = function () {
      console.log("Задача удалена в idb: ", request.result);
      curTasksItem.remove();
      // console.log(this.state.tasksList);
      // this.state.tasksList.map((index, task) => {
      //   if (+task.key === +curTasksItemKey) {
      //     // console.log(task);
      //     this.setState((state, props) => ({
      //       tasksList: state.tasksList.splice(index, 1),
      //     }));
      //   }
      // });
    }.bind(this);

    request.onerror = function (event) {
      console.log("Ошибка удаления задачи в idb: ", request.error);
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