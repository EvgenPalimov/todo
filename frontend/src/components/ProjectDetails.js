import React from "react";
import {useParams} from "react-router-dom";

const ProjectDetailsList = ({projects}) => {
    let {id} = useParams()
    let filtered_project = projects.filter(item => item.id === parseInt(id))

    return (
        filtered_project.map((item) =>
            <div className="project-details padding-site">
                <h1 className="project-details__name">{item.name}</h1>
                <span>Project Description:</span>
                <p className="project-details__description">{item.description}</p>
                <span>Repository:</span>
                <p className="project-details__repository">{item.repository}</p>
                <span>List of users:</span>
                <ol className="project-details__list-user">
                    {item.users.map((user) => <li>{user}</li>)}
                </ol>
            </div>
        )
    )
}

export default ProjectDetailsList
