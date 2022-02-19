import React, {Component} from "react";
import axios from "axios";
import './css/App.css';
import './css/Style.css';
import UserList from "./components/User.js";
import ProjectList from "./components/Projects";
import ToDoList from "./components/ToDo";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import NotFound404 from "./components/NotFound404";
import ProjectDetailsList from "./components/ProjectDetails";


const DOMAIN = 'http://127.0.0.1:8000/api/'
const get_url = (url) => `${DOMAIN}${url}`

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'menuItems': [
                {name: 'Users', href: '/users'},
                {name: 'Projects', href: '/projects'},
                {name: 'ToDo', href: '/todo'},
            ],
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
            <BrowserRouter>
                <div className="page">
                    <div className="content">
                        <Menu menuItems={this.state.menuItems}/>
                        <Switch>
                            <Route exact path='/users' component={() => <UserList users={this.state.users}/>}/>
                            <Route exact path='/projects'
                                   component={() => <ProjectList projects={this.state.projects}/>}/>
                            <Route path='/project/:id'> <ProjectDetailsList projects={this.state.projects}/> </Route>
                            <Route exact path='/todo' component={() => <ToDoList todo={this.state.todo}/>}/>
                            <Redirect from={'/'} to={'/users'} />
                            <Route component={NotFound404} />
                        </Switch>
                    </div>
                    <div className="footer">
                        <Footer/>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
