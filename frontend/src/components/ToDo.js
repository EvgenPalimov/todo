import React from "react";

const ToDoItem = ({toDoElement}) => {
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
        </tr>
    )
}

const ToDoList = ({todo}) => {
    return (
        <table className='bordered'>
            <caption>Table with ToD</caption>
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
            {todo.map((toDoElement) => <ToDoItem toDoElement={toDoElement}/>)}
        </table>
    )
}

export default ToDoList