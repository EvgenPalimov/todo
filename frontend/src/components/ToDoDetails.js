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
                <p className="project-details__description">{item.text}</p>
                <span>User:</span>
                <h1 className="project-details">{item.user}</h1>
            </div>
        )
    )
}

export default ToDoDetailsList;
