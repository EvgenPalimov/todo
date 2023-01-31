import React from "react";
import {Link} from "react-router-dom";

const ToDoItem = ({toDoElement, deleteToDo}) => {
    return (
        <tr>
            <td>
                {toDoElement.project}
            </td>
            <td>
                {toDoElement.text}
            </td>
            <td>
                {toDoElement.user}
            </td>
            <td>
                {toDoElement.created}
            </td>
            <td>
                {toDoElement.updated}
            </td>
            <td>
                <Link className='button-link' to={`/todo/update/${toDoElement.id}/`}>Update</Link>
            </td>
            <td>
                <button className='app-button' type='button' onClick={() => deleteToDo(toDoElement.id)}>Delete</button>
            </td>
        </tr>
    )
}

const ToDoList = ({todo, deleteToDo}) => {
    return (
        <div>
            <div className='padding-site'>
                <Link className='button-link ' to='/todo/create'>Create</Link>
            </div>
            <table className='bordered'>
                <caption>Table with ToDo</caption>
                <tr>
                    <th>
                        Project name
                    </th>
                    <th>
                        About project
                    </th>
                    <th>
                        User
                    </th>
                    <th>
                        Created
                    </th>
                    <th>
                        Updated
                    </th>
                    <th>
                        Change
                    </th>
                    <th>
                        Delete
                    </th>
                </tr>
                {todo.map((toDoElement) => <ToDoItem toDoElement={toDoElement}
                                                     deleteToDo={deleteToDo}/>)}
            </table>
        </div>
    )
}

export default ToDoList
