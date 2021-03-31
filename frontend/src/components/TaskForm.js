import React, { Component } from "react";

class TaskForm extends Component {
  state = {
    form: { title: "", detail: "", schedule: "", user_id: this.props.userId , isEdit: false },
    userId: this.props.userId,
    btnName: "Add Task",
    btnClass: "ui dark button submit-button"
  };

  isEmptyObj(obj) {
    return Object.entries(obj).length === 0 && obj.constructor === Object;
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props && !this.isEmptyObj(this.props.task)) {
      this.setState({
        form: { ...this.props.task, isEdit: true },
        btnName: "Update Task",
        btnClass: "ui orange button submit-button"
      });
    }
  }

  onFormSubmit = event => {
    event.preventDefault();
    if (this.formValidation()) {
      this.props.onFormSubmit(this.state.form);
      this.setState({
        btnName: "Add Task",
        btnClass: "ui dark button submit-button"
      });
      this.clearFormFields();
    }
  };

  handleChange = event => {
    const { name, value } = event.target;
    let form = this.state.form;
    form[name] = value;
    this.setState({ form });
  };

  formValidation = () => {
    if (document.getElementsByName("title")[0].value === "") {
      alert("Enter Task Title");
      return false;
    }
    if (document.getElementsByName("detail")[0].value === "") {
      alert("Enter Task Detail");
      return false;
    }
    return true;
  };

  clearFormFields = () => {
    this.setState({
      form: { title: "", detail: "", schedule: "", user_id: this.state.userId, isEdit: false }
    });
    document.querySelector(".form").reset();
  };

  render() {
    return (
      <form className="ui form">
        <div className="fields">
          <div className="four wide field">
            <label>Title</label>
            <input
              type="text"
              name="title"
              placeholder="Task Title"
              onChange={this.handleChange}
              value={this.state.form.title}
            />
          </div>

          <div className="six wide field">
            <label>Detail</label>
            <input
              type="text"
              name="detail"
              placeholder="Task Detail"
              onChange={this.handleChange}
              value={this.state.form.detail}
            />
          </div>

          <div className="four wide field">
            <label>Schedule</label>
            <input
              type="date"
              name="schedule"
              onChange={this.handleChange}
              value={this.state.form.schedule}
            />
            <input
            type="hidden"
            name="user_id"
            onChange={this.handleChange}
            value={this.state.userId}
            />
          </div>

          <div className="two wide field">
            <button className={this.state.btnClass} onClick={this.onFormSubmit}>
              {this.state.btnName}
            </button>
          </div>
        </div>
      </form>
    );
  }
}
export default TaskForm;
