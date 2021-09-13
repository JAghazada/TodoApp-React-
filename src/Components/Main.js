import { useState, useEffect } from 'react'
import './style.css'
const Main = () => {
    var TodoList = []
    const ClearCompleted = () => {
        setList(
            list.filter(item =>
                !item.completed))
    }
    const css = {
        margin: '0 auto',
    }
    const [list, setList] = useState(TodoList)
    const [newTodo, setNewTodo] = useState('')
    const [editTodo,setEditTodo] = useState('')
    
    useEffect(() => {
        localStorage.setItem("item", JSON.stringify(list))
    })
    if (localStorage.getItem('item')) {
        var value = localStorage.getItem('item')
        value = JSON.parse(value)
        for (let c of value) {
            TodoList.push(c)
        }
    }
    return (
        <div>
            <ul className="list-group">
                <h1 style={css} className='p-4'>Todo App</h1>
                <h6 className="text-center">if you complete your todo ,click on todo</h6>
                <hr />
                <input className='form-control col-3' placeholder="Type your new todo & click add btn"  value={newTodo} onChange={(e) => {
                    setNewTodo(e.target.value)
                }} style={css} />
                
                <button className="col-2 btn my-2 btn-success" onClick={() => {
                    let data = { id: Date.now(), title: newTodo, completed: false }
                    if (data.title && data.title.trim() !== '' && data.title !== null) {
                        setList([
                            ...list, data])
                    } else {
                        return 'Title was Empty!'
                    }
                }
                
                }
                    style={css}>Add New Todo</button>
                <input  className = "form-control col-3 " placeholder="Type todo and click edit" onChange={
                    (editted)=>{
                        if (editted.target.value && editted.target.value.trim() !== '' && editted.target.value !== null)
                        {setEditTodo(editted.target.value)}else{return 'edit empty'}
                    }
                }/>
                {list.map(
                    todos => {
                        return <div  value={todos.title}   className='d-flex justify-content-center col-12'><div onClick={() => {
                            setList(list.map(
                                element =>
                                    element.id === todos.id ? { ...element, completed: !element.completed } : element
                            ))
                        }
                        } key={todos.id} className={todos.completed ? 'bg-warning list-group-item col-10 completed' : 'bg-warning list-group-item col-10 '} style={css}>{todos.title}</div>
                        <button className="btn btn-dark col-2" onClick={()=>{
                            setList(list.map(
                                element =>
                                    element.id === todos.id && editTodo !==null && editTodo.trim() !== "" ? { ...element, title: editTodo } : element
                            ))
                            setEditTodo('')
                        }}>Edit</button></div>
                    }
                )}
                <button className="col-2 btn my-2  btn-danger" onClick={ClearCompleted} style={css}>Clear All Completed's</button>
            </ul>
        </div>
    )
}
export default Main