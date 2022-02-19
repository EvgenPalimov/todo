import React from "react";
import {useParams} from "react-router-dom";

const UserDetailsList = ({users}) => {
    let {id} = useParams()
    let filtered_users = users.filter(item => item.id === parseInt(id))

    return (
        filtered_users.map((item) =>
            <div className="project-details padding-site">
                <h1 className="project-details__name">{item.name}</h1>
                <span>Описание проекта.</span>
                <p className="project-details__description">{item.description}</p>
                <span>Репозиторий:</span>
                <p className="project-details__repository">{item.repository}</p>
                <span>Список пользователей:</span>
                <ol className="project-details__list-user">
                    {item.users.map((user) => <li>{user}</li>)}
                </ol>
            </div>
        )
    )
}

export default UserDetailsList