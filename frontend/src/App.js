import React, {Component} from "react";
import axios from "axios";
import './css/App.css';
import './css/Style.css';
import UserList from "./components/User";
import ProjectList from "./components/Projects";
import ToDoList from "./components/ToDo";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import Menu from "./components/Menu";
import LoginForm from "./components/Auth"
import Footer from "./components/Footer";
import NotFound404 from "./components/NotFound404";
import ProjectDetailsList from "./components/ProjectDetails";
import Cookies from "universal-cookie";

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


    login(username, password) {
        console.log("test")
        axios.post(get_url('token/'), {username: username, password: password})
            .then(response => {
                console.log(response.data.access)
                cookies.set('login', username)
                cookies.set('access', response.data.access)
                cookies.set('refresh', response.data.refresh)
                this.setState({'auth': {username: username, isLogin: true}})
                this.loadData()
                window.location.href = '/'
            }).catch(error => {
            if (error.response.status === 401) {
                alert('Неверный логин или пароль')
            } else {
                console.log(error)
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

    loadData() {
        let headers = {
            'Content-Type': 'application/json'
        }
        if (this.state.auth.is_login) {
            const token = cookies.get('access')
            headers['Authorization'] = 'Bearer ' + token
        }

        axios.get(get_url('users/'), {headers}).then(response => {
            this.setState({
                'users': response.data
            })
        }).catch(error =>
            console.log(error)
        )

        axios.get(get_url('projects/'), {headers}).then(response => {
            this.setState({
                'projects': response.data
            })
        }).catch(error =>
            console.log(error)
        )

        axios.get(get_url('todo/'), {headers}).then(response => {
            this.setState({
                'todo': response.data
            })
        }).catch(error =>
            console.log(error)
        )
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
                            <Route exact path='/users' component={() => <UserList users={this.state.users}/>}/>
                            <Route exact path='/projects'
                                   component={() => <ProjectList projects={this.state.projects}/>}/>
                            <Route path='/project/:id'> <ProjectDetailsList projects={this.state.projects}/> </Route>
                            <Route exact path='/todo' component={() => <ToDoList todo={this.state.todo}/>}/>
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
