import React from "react";

const ProjectItem = ({project}) => {
    return (
        <tr>
            <td>
                {project.username}
            </td>
            <td>
                {project.first_name}
            </td>
            <td>
                {project.last_name}
            </td>
            <td>
                {project.email}
            </td>
        </tr>
    )
}

const ProjectList = ({projects}) => {
    return(
        <table className = 'bordered'>
            <caption>Table with users</caption>
            <th>
                User name
            </th>
            <th>
                First name
            </th>
            <th>
                Last name
            </th>
            <th>
                E-mail
            </th>
            {projects.map((project) => <ProjectItem project={project} />)}
        </table>
    )
}

export default ProjectList