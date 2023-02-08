import React from "react";
import {Link} from "react-router-dom";
import {useState} from "react"

const ProjectItem = ({project, deleteProject}) => {
    return (
        <tr>
            <td>
                <Link to={`/project/${project.id}`}>{project.name}</Link>
            </td>
            <td>
                {project.description}
            </td>
            <td>
                {project.repository}
            </td>
            <td>
                <ol>
                    {project.users.map((user) => <li>{user}</li>)}
                </ol>
            </td>
            <td>
                <Link className='button-link' to={`/projects/update/${project.id}/`}>Update</Link>
            </td>
            <td>
                <button className='app-button' type='button' onClick={() => deleteProject(project.id)}>Delete</button>
            </td>
        </tr>
    )
}

const ProjectList = ({projects, deleteProject, auth}) => {
    const [value, setValue] = useState('');

    const filteredProjects = projects.filter(project => {
        return project.name.toLowerCase().includes(value.toLowerCase());
    })

    return (
        <div>
            {auth.isLogin &&
                <div className='projects__bar padding-site'>
                    <Link className='button-link ' to='/project/create'>Create</Link>
                    <form action="#" className='search__form'>
                        <input
                            type="text"
                            placeholder="Search in the projects..."
                            className="search__input"
                            onChange={(event) => setValue(event.target.value)}/>
                    </form>
                </div>
            }
            <table className='bordered'>
                <caption>Table with Projects</caption>
                <tr>
                    <th>
                        Project name
                    </th>
                    <th>
                        Description
                    </th>
                    <th>
                        Repository
                    </th>
                    <th>
                        Users
                    </th>
                    <th>
                        Change
                    </th>
                    <th>
                        Delete
                    </th>
                </tr>
                {filteredProjects.map((project) => <ProjectItem project={project}
                                                                deleteProject={deleteProject}/>)}
            </table>
        </div>
    )
}

export default ProjectList;
