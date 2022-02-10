import React, {Component} from "react";
import axios from "axios";
import './css/App.css';
import './css/Style.css';
import UserList from "./components/User.js";
import Header from "./components/Menu.js";
import Footer from './components/Footer.js';

const DOMAIN = 'http://127.0.0.1:8000/api/'
const get_url = (url) => `${DOMAIN}${url}`

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'users': []
        };
    }

    componentDidMount() {
        axios.get(get_url('users/')).then(response => {
            const users = response.data
            this.setState({
                'users': users
            })
        }).catch(error => console.log(error))
    }

    render() {
        return (
            <div className="page">
                <div className="content">
                    <Header/>
                    <UserList users={this.state.users}/>
                </div>
                <div className="footer">
                    <Footer/>
                </div>
            </div>
        );
    }
}

export default App;
