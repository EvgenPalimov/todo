import React, {Component} from "react";
import axios from "axios";
import './css/App.css';
import './css/Style.css';
import UserList from "./components/User";
import ProjectList from "./components/Projects";
import ToDoList from "./components/ToDo";
import ProjectFormCreate from "./components/ProjectFormCreate";
import {
    BrowserRouter,
    Redirect,
    Route,
    Switch
} from "react-router-dom";
import Menu from "./components/Menu";
import LoginForm from "./components/Auth"
import Footer from "./components/Footer";
import NotFound404 from "./components/NotFound404";
import ProjectDetailsList from "./components/ProjectDetails";
import ToDoFormCreate from "./components/ToDoFormCreate";
import ProjectFormUpdate from "./components/ProjectFormUpdate";
import ToDoFormUpdate from "./components/ToDoFormUpdate";
import UserFormUpdate from "./components/UserFormUpdate";
import UserFormCreate from "./components/UserFormCreate";
import UserDetailsList from "./components/UserDetails";
import ToDoDetailsList from "./components/ToDoDetails";


const DOMAIN = 'http://46.19.64.201:8000/api/'
const FRONT = 'http://46.19.64.201:8000/'
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
            'project': {},
            'auth': {username: '', isLogin: false},
            'staff': false
        };
    }

    createProject(name, description, repository, user) {
        const headers = this.get_headers();
        const data = {name: name, description: description, repository: repository, users: user};
        axios.post(get_url(`projects/`), data, {headers}).then(
            response => {
                window.location.href = '/projects/';
            }
        ).catch(error => {
            console.log(error)
        })
    }

    updateProject(id, name, description, repository, user) {
        const headers = this.get_headers();
        const data = {id: id, name: name, description: description, repository: repository, users: user};
        axios.put(get_url(`projects/${id}/`), data, {headers}).then(
            response => {
                window.location.href = '/projects/';
            }
        ).catch(error => {
            console.log(error)
        })
    }

    deleteProject(id) {
        const headers = this.get_headers();
        axios.delete(get_url(`projects/${id}`), {headers}).then(response => {
            this.loadDataProjects(headers);
        }).catch(error => {
            console.log(error)
            this.setState({projects: []})
        })
    }

    createToDo(project, text, user) {
        const headers = this.get_headers();
        const data = {project: project, text: text, user: user};
        axios.post(get_url(`todo/`), data, {headers}).then(
            response => {
                window.location.href = '/todo/';
            }
        ).catch(error => {
            console.log(error);
        })
    }

    updateToDo(id, project, text, user) {
        const headers = this.get_headers();
        const data = {project: project, text: text, user: user};
        axios.put(get_url(`todo/${id}/`), data, {headers}).then(
            response => {
                window.location.href = '/todo/';
            }
        ).catch(error => {
            console.log(error);
        })
    }

    deleteToDo(id) {
        const headers = this.get_headers();
        axios.delete(get_url(`todo/${id}`), {headers}).then(
            response => {
                this.loadDataToDo(headers);
        }).catch(error => {
            console.log(error);
        })
    }

    createUser(username, firstName, lastName, email, password, isStaff) {
        const headers = this.get_headers();
        const data = {username: username, first_name: firstName,
            last_name: lastName, email: email, password: password,
            is_staff: isStaff};
        axios.post(get_url(`users/`), data, {headers}).then(
            response => {
                window.location.href = '/users/';
            }
        ).catch(error => {
            console.log(error);
        })
    }

    updateUser(id, username, firstName, lastName, email, isStaff) {
        const headers = this.get_headers();
        const data = {id: id, username: username, first_name: firstName,
            last_name: lastName, email: email, is_staff: isStaff};
        axios.put(get_url(`users/${id}/`), data,{headers}).then(
            response => {
                window.location.href = '/users/';
            }
        ).catch(error => {
            console.log(error);
        })
    }

    deleteUser(id) {
        const headers = this.get_headers();
        axios.delete(get_url(`users/${id}`), {headers})
            .then(response => {
                this.loadDataUsers(headers)
        }).catch(error => {
            console.log(error);
        })
    }

    login(username, password) {
        axios.post(get_url('token/'), {username: username, password: password})
            .then(response => {
                localStorage.setItem('login', username);
                localStorage.setItem('access', response.data.access);
                localStorage.setItem('refresh', response.data.refresh);
                this.setState({'auth': {username: username, isLogin: true}});
                this.loadData();
            }).catch(error => {
            if (error.response.status === 401) {
                alert('Неверный логин или пароль');
            } else {
                console.log(error);
            }
        })
    }

    logout() {
        localStorage.setItem('login', '');
        localStorage.setItem('access', '');
        localStorage.setItem('refresh', '');
        this.setState({'auth': {username: '', isLogin: false}});
        this.setState({'staff': false});
        window.location.href = '/login/';
    }

    get_headers() {
        let headers = {
            'Content-Type': 'application/json'
        };
        if (this.state.auth.isLogin === true) {
            const token = localStorage.getItem('access');
            headers['Authorization'] = 'Bearer ' + token
        }
        return headers
    }

    loadDataUsers(headers) {
        axios.get(get_url('users/'), {headers}).then(response => {
            this.setState({
                'users': response.data
            })
            this.CheckUserIsStaff();
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
    CheckUserIsStaff() {
        if (this.state.users !== []) {
            const isStaff = !!(this.state.users.find(user => user.username === this.state.auth.username).isStaff);
            this.setState({'staff': isStaff});
        }
    }
    loadData() {
        const headers = this.get_headers();
        this.loadDataUsers(headers);
        this.loadDataProjects(headers);
        this.loadDataToDo(headers);
    }

    componentDidMount() {
        const username = localStorage.getItem('login');
        if ((username !== '') && (username != null)) {
            this.setState({'auth': {username: username, isLogin: true}}, () => this.loadData());
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
                                                                                  deleteUser={(id) => this.deleteUser(id)}
                                                                                  staff={this.state.staff}/>}/>
                            <Route exact path='/user/:id/'> <UserDetailsList users={this.state.users}/> </Route>
                            <Route exact path='/user/update/:id/'
                                   component={() => <UserFormUpdate users={this.state.users} updateUser={(id, username, firstName, lastName, email, isStaff) =>
                                                                        this.updateUser(id, username, firstName, lastName, email, isStaff)}/>}/>
                            <Route exact path='/users/create'
                                   component={() => <UserFormCreate users={this.state.users} createUser={(username, firstName, lastName, email, password, isStaff) =>
                                                                           this.createUser(username, firstName, lastName, email, password, isStaff)}/>}/>
                            <Route exact path='/project/create'
                                   component={() => <ProjectFormCreate users={this.state.users} projects={this.state.projects}
                                                                       createProject={(name, description, repository, user) =>
                                                                           this.createProject(name, description, repository, user)}/>}/>
                            <Route exact path='/projects'
                                   component={() => <ProjectList projects={this.state.projects} auth={this.state.auth}
                                                                 deleteProject={(id) => this.deleteProject(id)}/>}/>
                            <Route exact path='/projects/update/:id/'
                                   component={() => <ProjectFormUpdate projects={this.state.projects}
                                                                       users={this.state.users}
                                                                       updateProject={(id, name, description, repository, user) =>
                                                                           this.updateProject(id, name, description, repository, user)}/>}/>
                            <Route exact path='/project/:id/'> <ProjectDetailsList projects={this.state.projects}/> </Route>
                            <Route exact path='/todo/update/:id/'
                                   component={() => <ToDoFormUpdate users={this.state.users}
                                                                    projects={this.state.projects}
                                                                    todo={this.state.todo}
                                                                    updateToDo={(id, project, text, user) =>
                                                                        this.updateToDo(id, project, text, user)}/>}/>
                            <Route exact path='/todo/:id/'> <ToDoDetailsList listTodo={this.state.todo}/> </Route>
                            <Route exact path='/todo/create' component={() => <ToDoFormCreate username={this.state.auth.username}
                                                                                                users={this.state.users}
                                                                                                projects={this.state.projects}
                                                                                                createToDo={(project, text, user) =>
                                                                                                    this.createToDo(project, text, user)}/>}/>
                            <Route exact path='/todo' component={() => <ToDoList todo={this.state.todo} auth={this.state.auth}
                                                                                 deleteToDo={(id) => this.deleteToDo(id)}/>}/>
                            <Route exact path='/login' component={() => <LoginForm
                                login={(username, password) => this.login(username, password)} auth={this.state.auth}/>}/>
                            <Redirect from="/" to="/projects" />
                            <Route component={NotFound404}/>

                        </Switch>
                    </div>
                    <div className="footer">
                        <Footer/>
                    </div>
                </div>
            </BrowserRouter>
        );
    };
}

export default App;
