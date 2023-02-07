import React from "react";
import {
    validateForm,
    validateProjects
} from "./Validators";

class ProjectFormCreate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            repository: '',
            user: [],
            formErrors: {name: '', description: '', repository: ''}
        }
    }

    handleUserChange(event) {
        if (!event.target.selectedOptions) {
            this.setState({
                'user': []
            })
            return;
        }
        let users = []
        for (let i = 0; i < event.target.selectedOptions.length; i++) {
            users.push(event.target.selectedOptions.item(i).value);
        }
        this.setState({
            'user': users
        })
    }

    handleChange(event) {
        const {name, value} = event.target;
        let fieldsFormsErrors = validateProjects(this.state.formErrors,
            this.props.projects, name, value, 'new');
        this.setState({fieldsFormsErrors, [name]: value});
        this.setState({[name]: value});
    }

    handleSubmit(event) {
        event.preventDefault()
        if (validateForm(this.state)) {
            this.props.createProject(this.state.name, this.state.description,
                this.state.repository, this.state.user);
        }
    }

    render() {
        const { formErrors } = this.state;

        return (
            <div className="page-create-form padding-site">
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <fieldset className="create-form">

                        <legend className="create-form-legend">Create Project</legend>
                        <div className="create-form-div">
                            <label className="create-form-label" htmlFor="name">Name Project:</label>
                            <input className="create-form-input" type="text" id="name" name="name" placeholder="Name"
                                   value={this.state.name} onChange={(event) => this.handleChange(event)}/>
                            {formErrors.name.length > 0 && (
                                <p className="errorMessage">{formErrors.name}</p>
                            )}
                        </div>
                        <div className="create-form-div">
                            <label className="create-form-label" htmlFor="description">Description:</label>
                            <textarea className="create-form-input" type="text" id="description" name="description"
                                   placeholder="Description"
                                   value={this.state.description} onChange={(event) => this.handleChange(event)}/>
                            {formErrors.description.length > 0 && (
                                <p className="errorMessage">{formErrors.description}</p>
                            )}
                        </div>
                        <div className="create-form-div">
                            <label className="create-form-label" htmlFor="repository">Repository:</label>
                            <input className="create-form-input" type="text" id="repository" name="repository"
                                   placeholder="Repository"
                                   value={this.state.repository} onChange={(event) => this.handleChange(event)}/>
                            {formErrors.repository.length > 0 && (
                                <p className="errorMessage">{formErrors.repository}</p>
                            )}
                        </div>
                        <div className="create-form-div">
                            <label className="create-form-label" htmlFor="user">Users:</label>
                            <select className="create-form-select" name="user" multiple id="user"
                                    onChange={(event) => this.handleUserChange(event)}>
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

export default ProjectFormCreate;
