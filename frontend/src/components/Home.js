import React, { Component } from "react";
import axios from "axios";
import "./app.css";
import Register from "./reg";
import Login from "./login";
import ReactDOM from "react-dom";
import App from "./App";

class Home extends Component{
    state = {
        loader: false,
        user: {},
      };
    loginUser = async data => {
        console.log(data);
        this.setState({ loader: true });
        await axios
          .post(`http://127.0.0.1:8000/api/login-user`, {
            email: data.email,
            password: data.password,
          })
          .then(function (response){
              if(response.data.login_status === true){
                ReactDOM.render(<App userInfo={response.data.user.name}/>,  document.querySelector("#root"));
              }
              else{
                  alert(response.data.error_msg)
              }
          })
          .catch(e => {
            alert(e.response.status === 500 ? "Login Failed" : "");
          });
      };
    regUser = async data => {
        this.setState({ loader: true });
        await axios
          .post(`http://127.0.0.1:8000/api/create-user`, {
            name: data.name,
            email: data.email,
            password: data.password,
          })
          .then(function (response) {
            alert("Registerd Successfully Done!!!")
          })
          .catch(e => {
            alert(e.response.status === 500 ? "Registration Failed" : "");
          });
      };
    onRegFormSubmit = data => {
        if (data) {
            this.regUser(data);
        }
      };
    onLoginFormSubmit = data => {
        if (data) {
            this.loginUser(data);
          } 
      }
    render (){
        return(
            <div>
                <div className="ui fixed inverted menu">
                    <div className="ui container">
                        <a href="/#" className="header item">
                        TodoApp
                        </a>
                    </div>
                </div>
                <div className="ui main container">
                    <h2 style={{textAlign: "center"}}>Register New User:</h2><hr></hr>
                    <Register 
                    onRegFormSubmit={this.onRegFormSubmit}
                    user={this.state.user}
                    />
                    <hr></hr><h2 style={{textAlign: "center"}}>Registered yet?  Login Now:</h2><hr></hr>
                    <Login 
                    onLoginFormSubmit={this.onLoginFormSubmit}
                    user={this.state.user}
                    />
                </div>
            </div>
        );
    }
}
export default Home;