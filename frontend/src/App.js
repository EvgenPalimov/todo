import React, {Component} from "react";
import axios from "axios";
import './css/App.css';
import './css/Style.css';
import UserList from "./components/User";
import ProjectList from "./components/Projects";
import ToDoList from "./components/ToDo";
import ProjectFormCreate from "./components/ProjectFormCreate";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import Menu from "./components/Menu";
import LoginForm from "./components/Auth"
import Footer from "./components/Footer";
import NotFound404 from "./components/NotFound404";
import ProjectDetailsList from "./components/ProjectDetails";
import Cookies from "universal-cookie";
import ToDoFormCreate from "./components/ToDoFormCreate";
import ProjectFormUpdate from "./components/ProjectFormUpdate";


const DOMAIN = 'http://127.0.0.1:8000/api/'
const get_url = (url) => `${DOMAIN}${url}`
const cookies = new Cookies()

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
            'project': {},
            'auth': {username: '', isLogin: false}
        };
    }

    createProject(name, description, repository, user) {
        const headers = this.get_headers()
        const data = {name: name, description: description, repository: repository, users: user}
        axios.post(get_url(`projects/`), data, {headers}).then(
            response => {
                window.location.href = 'http://localhost:3000/projects/';
            }
        ).catch(error => {
            console.log(error)
            this.setState({projects: []})
        })
    }

    getProjectData(id) {
        console.log(`asdnia ${id}`)
    }
    updateProject(id, name, description, repository, user) {
        const headers = this.get_headers()
        const data = {id:id, name: name, description: description, repository: repository, users: user}
        axios.put(get_url(`projects/${id}`), data, {headers}).then(
            response => {
                window.location.href = `http://localhost:3000/projects/`;
            }
        ).catch(error => {
            console.log(error)
            this.setState({projects: []})
        })
    }

    deleteProject(id) {
        const headers = this.get_headers();
        axios.delete(get_url(`projects/${id}`), {headers}).then(response => {
            this.loadDataProjects(headers)
        }).catch(error => {
            console.log(error)
            this.setState({projects: []})
        })
    }

    createToDo(project, text, user) {
        const headers = this.get_headers()
        const data = {project: project, text: text, user: user}
        axios.post(get_url(`todo/`), data, {headers}).then(
            response => {
                window.location.href = 'http://localhost:3000/todo/';
            }
        ).catch(error => {
            console.log(error)
            this.setState({todo: []})
        })
    }

    updateToDo(id) {

    }

    deleteToDo(id) {
        const headers = this.get_headers();
        axios.delete(get_url(`todo/${id}`), {headers}).then(response => {
            this.loadDataToDo(headers)
        }).catch(error => {
            console.log(error)
            this.setState({todo: []})
        })
    }

    deleteUser(id) {
        const headers = this.get_headers();
        axios.delete(get_url(`users/${id}`), {headers}).then(response => {
            this.loadDataUsers(headers)
        }).catch(error => {
            console.log(error)
            this.setState({users: []})
        })
    }

    login(username, password) {
        console.log("test")
        axios.post(get_url('token/'), {username: username, password: password})
            .then(response => {
                console.log(response.data.access);
                cookies.set('login', username);
                cookies.set('access', response.data.access);
                cookies.set('refresh', response.data.refresh);
                this.setState({'auth': {username: username, isLogin: true}});
                this.loadData();
                window.location.href = '/';
            }).catch(error => {
            if (error.response.status === 401) {
                alert('Неверный логин или пароль');
            } else {
                console.log(error);
            }
        })
    }

    logout() {
        cookies.set('login', '')
        cookies.set('access', '')
        cookies.set('refresh', '')
        this.setState({'auth': {username: '', isLogin: false}})
        window.location.href = '/login'
    }

    get_headers() {
        let headers = {
            'Content-Type': 'application/json'
        }
        if (this.state.auth.isLogin === true) {
            const token = cookies.get('access')
            headers['Authorization'] = 'Bearer ' + token
        }
        return headers
    }

    loadDataUsers(headers) {
        axios.get(get_url('users/'), {headers}).then(response => {
            this.setState({
                'users': response.data
            })
        }).catch(error =>
            console.log(error)
        )
    }

    loadDataProjects(headers) {
        axios.get(get_url('projects/'), {headers}).then(response => {
            this.setState({
                'projects': response.data
            })
        }).catch(error =>
            console.log(error)
        )
    }

    loadDataToDo(headers) {
        axios.get(get_url('todo/'), {headers}).then(response => {
            this.setState({
                'todo': response.data
            })
        }).catch(error =>
            console.log(error)
        )
    }

    loadData() {
        const headers = this.get_headers()
        this.loadDataUsers(headers)
        this.loadDataProjects(headers)
        this.loadDataToDo(headers)
    }

    componentDidMount() {
        const username = cookies.get('login')
        if ((username !== '') && (username != null)) {
            this.setState({'auth': {username: username, isLogin: true}}, () => this.loadData())
        }
    }

    render() {
        return (
            <BrowserRouter>
                <div className="page">
                    <div className="content">
                        <Menu menuItems={this.state.menuItems} auth={this.state.auth} logout={() => this.logout()}/>
                        <Switch>
                            <Route exact path='/users' component={() => <UserList users={this.state.users}
                                                                                  deleteUser={(id) => this.deleteUser(id)}/>}/>
                            <Route exact path='/project/create'
                                   component={() => <ProjectFormCreate users={this.state.users}
                                                                       createProject={(name, description, repository, user) =>
                                                                           this.createProject(name, description, repository, user)}/>}/>
                            <Route exact path='/projects'
                                   component={() => <ProjectList projects={this.state.projects}
                                                                 deleteProject={(id) => this.deleteProject(id)}/>}/>
                             <Route exact path='/project/update/:id'
                                   component={() => <ProjectFormUpdate projects={this.state.projects}
                                                                       users={this.state.users}
                                                                       updateProject={(id, name, description, repository, user) =>
                                                                           this.updateProject(id, name, description, repository, user)}/>}/>
                            <Route path='/project/:id'> <ProjectDetailsList projects={this.state.projects}/> </Route>
                            <Route exact path='/todo/create' component={() => <ToDoFormCreate users={this.state.users}
                                                                                              projects={this.state.projects}
                                                                                              createToDo={(project, text, user) =>
                                                                                                  this.createToDo(project, text, user)}/>}/>
                            <Route exact path='/todo' component={() => <ToDoList todo={this.state.todo}
                                                                                 deleteToDo={(id) => this.deleteToDo(id)}/>}/>
                            <Route exact path='/login' component={() => <LoginForm
                                login={(username, password) => this.login(username, password)}/>}/>
                            <Redirect from={'/'} to={'/users'}/>
                            <Route component={NotFound404}/>
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
