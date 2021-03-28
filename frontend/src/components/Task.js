import React, { Component } from "react";

class Task extends Component {
  onDelete = () => {
    this.props.onDelete(this.props.task.id);
  };

  onEdit = () => {
    this.props.onEdit(this.props.task);
  };

  render() {
    const { id, title, detail, schedule } = this.props.task;
    return (
      <tr>
        <td style={{ textAlign: "center" }}>{id}</td>
        <td>{title}</td>
        <td>{detail}</td>
        <td>{schedule ? schedule : 'Not scheduled'}</td>
        <td>
          <button className="mini ui dark button" onClick={this.onEdit}>
            Edit
          </button>
          <button className="mini ui red button" onClick={this.onDelete}>
            Delete
          </button>
        </td>
      </tr>
    );
  }
}

export default Task;
