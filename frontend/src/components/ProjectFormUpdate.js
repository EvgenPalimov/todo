import React from "react";

class ProjectFormUpdate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {id: 0, name: '', description: '', repository: '', user: []}
        this.getProjectData(this.props.id)
    }

    getProjectData(id) {
        let projectData = this.props.projects.filter(item => item.id === id)
        this.setState({
            'name': projectData.name,
            'description': projectData.description,
            'repository': projectData.repository,
            'user': projectData.users
        })
    }

    handleProjectChange(event) {
        if (!event.target.selectedOptions) {
            this.setState({
                'user': []
            })
            return;
        }
        let users = []
        for (let i = 0; i < event.target.selectedOptions.length; i++) {
            users.push(event.target.selectedOptions.item(i).value)
        }
        this.setState({
            'user': users
        })

    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        this.props.updateProject(this.state.name, this.state.description, this.state.repository, this.state.user)
    }

    render() {
        return (
            <div className="page-create-form padding-site">
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <fieldset className="create-form">

                        <legend className="create-form-legend">Create Project</legend>
                        <div className="create-form-div">
                            <label className="create-form-label" htmlFor="name">Name Project:</label>
                            <input className="create-form-input" type="text" id="name" name="name" placeholder="Name"
                                   value={this.state.name} onChange={(event) => this.handleChange(event)}/>
                        </div>
                        <div className="create-form-div">
                            <label className="create-form-label" htmlFor="description">Description:</label>
                            <textarea className="create-form-input" id="description" name="description"
                                   placeholder="Description"
                                   value={this.state.description} onChange={(event) => this.handleChange(event)}/>
                        </div>
                        <div className="create-form-div">
                            <label className="create-form-label" htmlFor="repository">Repository:</label>
                            <input className="create-form-input" type="text" id="repository" name="repository"
                                   placeholder="Repository"
                                   value={this.state.repository} onChange={(event) => this.handleChange(event)}/>
                        </div>
                        <div className="create-form-div">
                            <label className="create-form-label" htmlFor="project">Users:</label>
                            <select className="create-form-select" name="project" multiple id="project"
                                    onChange={(event) => this.handleProjectChange(event)}>
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

export default ProjectFormUpdate
