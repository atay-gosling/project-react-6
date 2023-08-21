import React, {useEffect, useState} from 'react';
import axios from "axios";

const App = () => {
    const [users, setUsers] = useState([])
    const [name, setName] = useState('')
    const [newName, setNewName] = useState('')

    useEffect(() => {
        axios('https://64e2ef23bac46e480e77eca4.mockapi.io/users')
            .then(({data}) => setUsers(data))
    }, [])

    const handleChange = (e, user) => {
        axios.put(`https://64e2ef23bac46e480e77eca4.mockapi.io/users/${user.id}`, {...user, hired: e.target.checked})
            .then(({data}) => {
                setUsers(users.map(user => user.id === data.id ? data : user))
            })
    }

    const handleDelete = (user) => {
        axios.delete(`https://64e2ef23bac46e480e77eca4.mockapi.io/users/${user.id}`)
            .then(({data}) => {
                setUsers(users.filter(user => user.id !== data.id))
            })
    }

    const handleAddUser = (e) => {
        e.preventDefault()
        axios.post(`https://64e2ef23bac46e480e77eca4.mockapi.io/users`, {name})
            .then(({data}) => {
                setUsers([...users, data])
                setName('')
            })
    }

    const handleRename = (e, user) => {
        e.preventDefault()
        axios.put(`https://64e2ef23bac46e480e77eca4.mockapi.io/users/${user.id}`, {name: newName})
            .then(({data}) => {
                setUsers(users.map(user => user.id === data.id ? data : user))
                setNewName('')
            })
    }

        return (
            <div className={'container'}>
                <form onSubmit={handleAddUser}>
                    <input onChange={(e) => setName(e.target.value)} type="text"/>
                    <button type={'submit'}>Add user</button>
                </form>
                {
                    users.map(user => {
                        return (
                            <div key={user.id} className={'user-wrapper'}>
                                <h2>{user.name}</h2>
                                <input type="checkbox" onChange={(e) => handleChange(e, user)} checked={user.hired}/>
                                <button onClick={() => handleDelete(user)}>Delete</button>
                                <form onSubmit={(e) => handleRename(e, user)}>
                                    <input onChange={(e) => setNewName(e.target.value)} value={newName}/>
                                    <button type='submit'>Rename User</button>
                                </form>
                            </div>
                        )
                    })
                }
            </div>
        );
    }


export default App;