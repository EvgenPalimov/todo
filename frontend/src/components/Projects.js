import React from "react";
import {Link} from "react-router-dom";

const ProjectItem = ({project}) => {
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
        </tr>
    )
}

const ProjectList = ({projects}) => {
    return (
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
            </tr>
            {projects.map((project) => <ProjectItem project={project}/>)}
        </table>
    )
}

export default ProjectList