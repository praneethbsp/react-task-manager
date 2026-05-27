import React, { useEffect, useRef, useState } from 'react'
import todo_icon from '../assets/todo_icon.png'
import TodoItems from './TodoItems'

const Todo = ({darkMode}) => {

    const inputRef = useRef();
    const [todolist, setTodolist] = useState(localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : []);
    const [dueDate, setDueDate] = useState("")
    const [priority, setPriority] = useState("Low");
    const [success, setSuccess] = useState(false);
    const [filter, setFilter] = useState("all");
    const [editId, setEditId] = useState(null);
    const [editText, setEditText] = useState("");

    const add = () => {
        const inputText = inputRef.current.value.trim();
        if (inputText === "") {
            return null;
        }

        const newTodo = {
            id: Date.now(),
            text: inputText,
            isComplete: false,
            dueDate,
            priority,
        }
        setTodolist((prev) => [...prev, newTodo]);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 1000);
        
    }

    const deleteTodo = (id) => {
        setTodolist((prev) => {
            return prev.filter((todo) => todo.id != id)
        })
    }

    const toggle = (id) => {
        setTodolist((prev) => {
            return prev.map((todo) => {
                if (todo.id === id) {
                    return { ...todo, isComplete: !todo.isComplete }
                }
                return todo
            })
        })
    }

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todolist))
    }, [todolist])

    const filteredTodos = todolist.filter((todo) => {
                if (filter === "completed") return todo.isComplete;
                if (filter === "pending") return !todo.isComplete;
                return true;
                });

    const startEdit = (todo) => {
        setEditId(todo.id);
        setEditText(todo.text);
        };

    const saveEdit = (id) => {
        setTodolist((prev) =>
            prev.map((todo) =>
            todo.id === id
                ? { ...todo, text: editText }
                : todo
            )
        );

        setEditId(null);
        setEditText("");
        };

    return (
        <div className='bg-white place-self-center w-11/12 max-w-2xl flex flex-col p-7 min-h-137.5 rounded-xl'>
            {/* title */}
            <div className='flex items-center mt-7 gap-2'>
                <img className='w-8' src={todo_icon} alt="" />
                <h1 className='text-3xl font-semibold'>To-Do List</h1>
            </div>
            {/* input box */}
            <div className='flex items-center my-7 bg-gray-200 rounded-full'>
                <input ref={inputRef} className='bg-transparent border-0 outine-none flex-1 h-14 pl-4 pr-2 placeholder:text-slate-600 ' type="text" placeholder='Add your task' />
                <input className='bg-transparent border-0 outline-none  h-14 pl-2 pr-2 placeholder:text-slate-600' type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
                <select className='pl-2 pr-2 bg-transparent border-none outline-none'
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                </select>
                <button onClick={add} className={` ${darkMode? "bg-slate-600 hover:bg-slate-700" : "bg-gray-800 hover:bg-black"} border-none rounded-3xl active:scale-95 transition-all duration-150  w-32 h-16 text-white text-1xl font-medium cursor-pointer `}>ADD+</button>
                {success && (
                <p className="text-green-500 text-sm mt-2">Task added ✔</p>
                )}
            </div>

           {/* filter */}

            <div className="flex justify-end mb-4">
            <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="bg-gray-200 dark:bg-gray-700 px-3 py-2 rounded-full outline-none">
                <option value="all">All</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
            </select>
            </div>
            

            {/* todo list */}
            <div>
                {filteredTodos.map((item) => (
                <div key={item.id}>
                
                {editId === item.id ? (
                <div className="flex gap-2">
                    <input
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="border px-2"
                    />

                    <button
                    onClick={() => saveEdit(item.id)}
                    className="bg-green-500 text-white px-3 rounded"
                    >
                    Save
                    </button>
                </div>
                ) : (
                <TodoItems
                    text={item.text}
                    id={item.id}
                    isComplete={item.isComplete}
                    dueDate={item.dueDate}
                    priority={item.priority}
                    deleteTodo={deleteTodo}
                    toggle={toggle}
                    startEdit={startEdit}
                />
                )}

            </div>
))}

            </div>

        </div>
    )
}

export default Todo
