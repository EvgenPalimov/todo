import React from "react";

class ToDoFormCreate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {project: 0, text: '', user: 0}
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        this.props.createToDo(this.state.project, this.state.text, this.state.user)
    }

    render() {
        return (
            <div className="page-create-form padding-site">
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <fieldset className="create-form">

                        <legend className="create-form-legend">Create ToDo</legend>
                      <div className="create-form-div">
                            <label className="create-form-label" htmlFor="project">Project name:</label>
                            <select className="create-form-select" name="project" id="project"
                                    onChange={(event) => this.handleChange(event)}>
                                {this.props.projects.map((item) => <option value={item.id}> {item.name} </option>)}
                            </select>
                        </div>
                        <div className="create-form-div">
                            <label className="create-form-label" htmlFor="description">Text:</label>
                            <input className="create-form-input" type="text" id="text" name="text"
                                   placeholder="Description"
                                   value={this.state.text} onChange={(event) => this.handleChange(event)}/>
                        </div>
                        <div className="create-form-div">
                            <label className="create-form-label" htmlFor="user">User:</label>
                            <select className="create-form-select" name="user" id="user"
                                    onChange={(event) => this.handleChange(event)}>
                                {this.props.users.map((item) => <option value={item.id}> {item.username} </option>)}
                            </select>
                        </div>
                        <input type="submit" className="app-button" value="Save"/>
                    </fieldset>
                </form>
            </div>
        );
    }
}

export default ToDoFormCreate
