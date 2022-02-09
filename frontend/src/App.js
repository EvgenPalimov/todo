import React, {Component} from "react";
import axios from "axios";
import './css/App.css';
import './css/style.css';
import UserList from "./components/User.js";
import HeaderList from "./components/menu";
import FooterList from "./components/footer";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'users': []
        };
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/users/').then(response => {
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
                    <HeaderList/>
                    <UserList users={this.state.users}/>
                </div>
                <div className="footer">
                    <FooterList/>
                </div>
            </div>
        );
    }
}

export default App;
