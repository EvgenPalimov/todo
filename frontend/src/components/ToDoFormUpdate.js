import React from "react";


class ToDoFormUpdate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            project: 1,
            text: '',
            user: 1
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        this.props.updateToDo(this.state.id, this.state.project, this.state.text, this.state.user)
    }

    componentDidMount() {
        let idToDo = parseInt(window.location.pathname.replace(/[^0-9]/g, ""))
        this.setState({id: idToDo})
    }

    render() {
        return (
            <div className="page-create-form padding-site">
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <fieldset className="create-form">

                        <legend className="create-form-legend">Update ToDo</legend>
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

export default ToDoFormUpdate
