import React from "react";
import {Link} from "react-router-dom";

const UserItem = ({user, deleteUser}) => {
    return (
        <tr>
            <td>
                {user.username}
            </td>
            <td>
                {user.firstName}
            </td>
            <td>
                {user.lastName}
            </td>
            <td>
                {user.email}
            </td>
            <td>
                <button className='app-button' type='button' onClick={() => deleteUser(user.id)}>Delete</button>
            </td>
        </tr>
    )
}

const UserList = ({users, deleteUser}) => {
    return (
        <table className='bordered'>
            <caption>Table with users</caption>
            <tr>
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
                <th>
                    Delete
                </th>
            </tr>
            {users.map((user) => <UserItem user={user}
                                           deleteUser={deleteUser}/>)}
        </table>
    )
}

export default UserList