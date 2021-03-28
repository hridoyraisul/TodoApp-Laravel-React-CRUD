import React, { Component } from "react";

class Register extends Component{
      
    state = {
        form: { name: "", email: "", password: "" }
      };
    isEmptyObj(obj) {
        return Object.entries(obj).length === 0 && obj.constructor === Object;
      }
    componentDidUpdate(prevProps) {
        if (prevProps !== this.props && !this.isEmptyObj(this.props.user)) {
          this.setState({
            form: { ...this.props.user },
          });
        }
      }
      onRegFormSubmit = event => {
        event.preventDefault();
        if (this.formValidation()) {
          this.props.onRegFormSubmit(this.state.form);
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
        if (document.getElementsByName("name")[0].value === "") {
          alert("Enter User's Name");
          return false;
        }
        if (document.getElementsByName("email")[0].value === "") {
          alert("Enter User's Email");
          return false;
        }
        if (document.getElementsByName("password")[0].value === "") {
            alert("Enter User's Password");
            return false;
          }
        return true;
      };

    clearFormFields = () => {
        this.setState({
            form: { name: "", email: "", password: "" }
        });
        document.querySelector(".form").reset();
      };

    render(){
        return (
            <form className="ui form">
                <div className="fields">
                <div className="four wide field">
                <label>Name</label>
                <input
                    type="text"
                    name="name"
                    placeholder="User's Name"
                    onChange={this.handleChange}
                />
                </div>
                <div className="six wide field">
                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    placeholder="User's Email Address"
                    onChange={this.handleChange}
                />
                </div>
                <div className="six wide field">
                <label>Password</label>
                <input
                    type="password"
                    name="password"
                    placeholder="User's Password"
                    onChange={this.handleChange}
                />
                </div>
                <div className="two wide field">
                    <button className="ui dark button submit-button" onClick={this.onRegFormSubmit}>
                        Register
                    </button>
                </div>
                </div>
            </form>
        );
    }
}
export default Register;