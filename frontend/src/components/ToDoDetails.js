import React from "react";
import {useParams} from "react-router-dom";

const ToDoDetailsList = ({listTodo}) => {
    let {id} = useParams();
    let filteredTodo = listTodo.filter(item => item.id === parseInt(id));

    return (
        filteredTodo.map((item) =>
            <div className="project-details padding-site">
                <h1 className="project-details__name">{item.project}</h1>
                <span>Description:</span>
                <p className="project-details__description">{item.description}</p>
                <span>List of users:</span>
                <ol className="project-details__list-user">
                    {item.users.map((user) => <li>{user}</li>)}
                </ol>
            </div>
        )
    )
}

export default ToDoDetailsList;
