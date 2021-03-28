import React, { Component } from "react";
import Task from "./Task";

class TaskList extends Component {
  onDelete = id => {
    this.props.onDelete(id);
  };

  onEdit = id => {
    this.props.onEdit(id);
  };

  render() {
    const tasks = this.props.tasks;
    return (
      <div className="data">
        <table className="ui celled table">
          <thead>
            <tr>
              <th style={{ width: "50px", textAlign: "center" }}>#</th>
              <th>Title</th>
              <th>Detail</th>
              <th>Schedule</th>
              <th style={{ width: "148px" }}>Action</th>
            </tr>
          </thead>

          <tbody>
            {tasks.map(task => {
              return (
                <Task
                  key={task.id}
                  task={task}
                  onDelete={this.onDelete}
                  onEdit={this.onEdit}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default TaskList;
