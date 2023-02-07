import React from "react";
import {
    validateForm,
    validateToDo
} from "./Validators";

class ToDoFormCreate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            project: 1,
            text: '',
            user: 1,
            formErrors: {text: ''}
        }
    }

    componentDidMount() {
        const user = this.props.users.find(user => user.username === this.props.username);
        this.setState({user: user.id});
    }
    handleChange(event) {
        const {name, value} = event.target;
        let fieldsFormsErrors = validateToDo(this.state.formErrors, name,
            value);
        this.setState({fieldsFormsErrors, [name]: value});
        this.setState({[name]: value});
    }

    handleSubmit(event) {
        event.preventDefault();
        if (validateForm(this.state)) {
            this.props.createToDo(this.state.project, this.state.text,
                this.state.user);
        }
    }

    render() {
        const { formErrors } = this.state;

        return (
            <div className="page-create-form padding-site">
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <fieldset className="create-form">

                        <legend className="create-form-legend">Create ToDo</legend>
                      <div className="create-form-div">
                            <label className="create-form-label" htmlFor="project">Project name:</label>
                            <select className="create-form-select" name="project" id="project" value={this.state.project}
                                    onChange={(event) => this.handleChange(event)}>
                                {this.props.projects.map((item) => <option value={item.id}> {item.name} </option>)}
                            </select>
                        </div>
                        <div className="create-form-div">
                            <label className="create-form-label" htmlFor="description">Text:</label>
                            <input className="create-form-input" type="text" id="text" name="text"
                                   placeholder="Description"
                                   value={this.state.text} onChange={(event) => this.handleChange(event)}/>
                            {formErrors.text.length > 0 && (
                                <p className="errorMessage">{formErrors.text}</p>
                            )}
                        </div>
                        <div className="create-form-div">
                            <label className="create-form-label" htmlFor="user">User:</label>
                            <select className="create-form-select" name="user" id="user" value={this.state.user}
                                    onChange={(event) => this.handleChange(event)}>
                                {this.props.users.map((item) => <option value={item.id}> {item.username} </option>)}
                            </select>
                        </div>
                        <input type="submit" className="app-button" disabled={!validateForm(this.state)} value="Save"/>
                    </fieldset>
                </form>
            </div>
        );
    }
}

export default ToDoFormCreate;
