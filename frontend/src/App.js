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
            'token': '',
        };
    }

    logout() {
        this.setToken('')
    }

    loadData() {
        const headers = this.getHeaders()
        axios.get(get_url('users/', {headers})).then(response => {
            this.setState({
                'users': response.data
            })
        }).catch(error => {
            console.log(error)
            this.setState({'users': []})
        });

        axios.get(get_url('projects/', {headers})).then(response => {
            this.setState({
                'projects': response.data
            })
        }).catch(error => {
            console.log(error)
            this.setState({'projects': []})
        });

        axios.get(get_url('todo/', {headers})).then(response => {
            this.setState({
                'todo': response.data
            })
            }).catch(error => {
            console.log(error)
            this.setState({'todo': []})
        });
    }

    isAuth() {
        return !!this.state.token
    }

    setToken(token) {
        const cookies = new Cookies()
        cookies.set('token', token)
        this.setState({'token': token}, () => this.loadData())
    }

    getTokenFromCookies() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        this.setState({'token': token}, () => this.loadData())
    }

    getToken(username, password) {
        axios.post(get_url('api-token-auth/', {username: username, password: password})).then(response => {
            this.setToken(response.data['token'])
        }).catch(error => console.log(error));
    }

    getHeaders() {
        let headers = {
            'Content-Type': 'application/json'
        }
        if(this.isAuth()) {
            headers['Authorization'] = `Token ${this.state.token}`
        }
        return headers
    }

    componentDidMount() {
        this.getTokenFromCookies()
    }

    render() {
        return (
            <BrowserRouter>
                <div className="page">
                    <div className="content">
                        <Menu menuItems={this.state.menuItems} auth={this.isAuth} logout={this.logout}/>
                        <Switch>
                            <Route exact path='/users' component={() => <UserList users={this.state.users}/>}/>
                            <Route exact path='/projects'
                                   component={() => <ProjectList projects={this.state.projects}/>}/>
                            <Route path='/project/:id'> <ProjectDetailsList projects={this.state.projects}/> </Route>
                            <Route exact path='/todo' component={() => <ToDoList todo={this.state.todo}/>}/>
                            <Route exact path='/login' component={() => <LoginForm
                                getToken={(username, password) => this.getToken(username, password)}/>}/>
                            <Route exact path='/logout' component={() => this.logout} />
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
