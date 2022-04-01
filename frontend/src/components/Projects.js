import React from "react";
import {Link} from "react-router-dom";

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
                <Link className='button-link' to={`/project/update/${project.id}`}>Update</Link>
            </td>
            <td>
                <button className='app-button' type='button' onClick={() => deleteProject(project.id)}>Delete</button>
            </td>
        </tr>
    )
}

const ProjectList = ({projects, deleteProject}) => {
    return (
        <div>
            <div className='padding-site'>
                <Link className='button-link ' to='/project/create'>Create</Link>
            </div>
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
                {projects.map((project) => <ProjectItem project={project}
                                                        deleteProject={deleteProject}/>)}
            </table>
        </div>
    )
}

export default ProjectList