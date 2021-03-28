import React, { Component } from "react";
import axios from "axios";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import Loader from "./Loader";
import "./app.css";
import ReactDOM from "react-dom";
import Home from "./Home";

class App extends Component {
  state = {
    userName: this.props.userInfo,
    tasks: [],
    loader: false,
    task: {},
    url: "http://127.0.0.1:8000/api/users-task-list/2"
  };

  getTask = async () => {
    this.setState({ loader: true });
    const tasks = await axios.get(this.state.url);
    this.setState({ tasks: tasks.data, loader: false });
  };

  deleteTask = async id => {
    this.setState({ loader: true });
    await axios.delete(`http://127.0.0.1:8000/api/delete-task/${id}`).catch(e => {
      alert(e.response.status === 404 ? "Task not found" : "");
    });
    this.getTask();
  };

  createTask = async data => {
    this.setState({ loader: true });
    await axios
      .post(`http://127.0.0.1:8000/api/add-new-task/`, {
        title: data.title,
        detail: data.detail,
        schedule: data.schedule,
        user_id: data.user_id
      })
      .catch(e => {
        alert(e.response.status === 500 ? "This task already exists" : "");
        // console.log(data);
      });
    this.getTask();
  };

  editTask = async data => {
    this.setState({ task: {} });
    this.setState({ loader: true });
    await axios
      .post(`http://127.0.0.1:8000/api/edit-task/${data.id}`, {
        title: data.title,
        detail: data.detail,
        schedule: data.schedule
      })
      .catch(e => {
        console.log(e.message);
      });
    this.getTask();
  };

  componentDidMount() {
    this.getTask();
  }

  onDelete = id => {
    this.deleteTask(id);
  };

  onEdit = data => {
    this.setState({ task: data });
  };

  onFormSubmit = data => {
    if (data.isEdit) {
      this.editTask(data);
    } 
    else {
      this.createTask(data);
    }
  };
  userLogout = () => {
    ReactDOM.render(<Home />,  document.querySelector("#root"));
  }
  render() {
    return (
      <div>
        <div className="ui fixed inverted menu">
          <div className="ui container">
            <a href="/#" className="header item">
              TodoApp
            </a>
          </div>
        </div>

        <div className="ui main container">
        <button className="ui red button submit-button" onClick={this.userLogout}>Logout</button>
        <h2 style={{textAlign: "left"}}>Hello, {this.state.userName} </h2><hr></hr>
          <TaskForm
            onFormSubmit={this.onFormSubmit}
            task={this.state.task}
          />
          {this.state.loader ? <Loader /> : ""}
         <hr></hr><h2 style={{textAlign: "center"}}>Todo List:</h2><hr></hr>
          <TaskList
            tasks={this.state.tasks}
            onDelete={this.onDelete}
            onEdit={this.onEdit}
          />
        </div>
      </div>
    );
  }
}

export default App;
