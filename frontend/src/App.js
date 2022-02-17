import React, {Component} from "react";
import axios from "axios";
import './css/App.css';
import './css/Style.css';
import UserList from "./components/User.js";
import ProjectList from "./components/Projects";
import ToDoList from "./components/ToDo";

const DOMAIN = 'http://127.0.0.1:8000/api/'
const get_url = (url) => `${DOMAIN}${url}`

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'users': [],
            'projects': [],
            'todo': [],
        };
    }

    componentDidMount() {
        axios.get(get_url('users/')).then(response => {
            this.setState({
                'users': response.data
            })
        }).catch(error => console.log(error));

        axios.get(get_url('projects/')).then(response => {
            this.setState({
                'projects': response.data
            })
        }).catch(error => console.log(error));

        axios.get(get_url('todo/')).then(response => {
            this.setState({
                'todo': response.data
            })
        }).catch(error => console.log(error));
    }

    render() {
        return (
            <div>
                <UserList users={this.state.users}/>
                <ProjectList projects={this.state.projects}/>
                <ToDoList todo={this.state.todo}/>
            </div>
        );
    }
}

export default App;
