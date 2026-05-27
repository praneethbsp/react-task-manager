import React, { useState } from 'react'
import Todo from './components/Todo'

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <div className={` grid py-4 min-h-screen ${
    darkMode ? "bg-gray-900" : "bg-stone-600"
    }`}>
      {/* <button className='text-white bg-' onClick={()=>{setDarkMode(!darkMode)}}>toggle</button>
       */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className={`absolute top-4 right-4 px-4 py-2 rounded-full text-sm font-medium 
        shadow-md transition-all duration-300
        ${darkMode 
          ? "bg-yellow-400 text-black hover:bg-yellow-300" 
          : "bg-gray-800 text-white hover:bg-gray-700"
        }`}>
        {darkMode ? "Light ☀️" : "Dark 🌙"}
      </button>
    <Todo darkMode={darkMode} />
    </div>
  )
}

export default App
