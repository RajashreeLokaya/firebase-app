import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import Todo from '../../components/Todo';
import { db } from '../../config/FirebaseConfig';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import "./ToDoPage.css"
const q = query(collection(db, 'todos'), orderBy('timestamp', 'desc'));

const TaskComponent = () => {
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        onSnapshot(q, (snapshot) => {
            setTodos(snapshot.docs.map(doc => ({
                id: doc.id,
                item: doc.data()
            })))
        })
    }, [input]);
    const addTodo = (e) => {
        e.preventDefault();
        addDoc(collection(db, 'todos'), {
            todo: input,
            todoDescription: description,
            timestamp: serverTimestamp()
        })
        setInput('')
        setDescription('')
    };
    return (
        <div className="TaskComponent">
            <h2> TODO List App</h2>
            <form>
                <TextField id="outlined-basic" label="Make Todo" variant="outlined" style={{ margin: "0px 5px" }} size="small" value={input}
                    onChange={e => setInput(e.target.value)} />
                <TextField id="outlined-basic" label="Make Todo Description" variant="outlined" style={{ margin: "0px 5px" }} size="small" value={description}
                    onChange={e => setDescription(e.target.value)} />
                <Button variant="contained" color="primary" onClick={addTodo}  >Add Todo</Button>
            </form>
            <ul>
                {todos.map(item => <Todo key={item.id} arr={item} />)}
            </ul>
        </div>
    );
}

export default TaskComponent
