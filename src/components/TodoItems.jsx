import React, { useRef } from 'react'
import tick from '../assets/tick.png'
import not_tick from '../assets/not_tick.png'
import delete_icon from '../assets/delete.png'

const TodoItems = ({ text, id, isComplete, dueDate, priority ,deleteTodo, toggle ,startEdit }) => {



    return (
        <div className='flex items-center my-3 gap-2'>
            <div onClick={() => { toggle(id) }} className='flex flex-1 items-center cursor-pointer'>
                <img src={isComplete ? tick : not_tick} alt="" className='w-7' />
                <p className={`text-slate-700 ml-4 text-[17px] decoration-slate-500 ${isComplete ? "line-through" : ""}`}>{text}</p>
                <p className={` text-slate-700 ml-8 text-[17px] decoration-slate-500 ${isComplete ? "line-through" : ""}`} >{dueDate}</p>
                <span className={` ml-8 font-medium ${isComplete ? "line-through" : ""}
                    ${priority === "High"
                        ? "text-red-500"
                        : priority === "Medium"
                            ? "text-yellow-500"
                            : "text-green-500"}`
                }>
                    {priority}
                </span>
            </div>

            <div>
                <button
                    onClick={() => startEdit({ id, text })}
                    className="text-blue-500 text-sm"
                    >
                    Edit
                    </button>
            </div>

            <img onClick={() => { deleteTodo(id) }} src={delete_icon} alt="" className='w-3.5 cursor-pointer' />

        </div>
    )
}

export default TodoItems
