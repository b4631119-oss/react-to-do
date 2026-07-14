import { useState } from 'react'

export function TodoInput(props) {
    const { handleAddTodo } = props
    const [inputValue, setInputValue] = useState('')

    const handleAdd = () => {
        if (!inputValue.trim()) { return }
        handleAddTodo(inputValue.trim())
        setInputValue('')
    }

    return (
        <div className="input-container">
            <input 
                value={inputValue} 
                onChange={(e) => setInputValue(e.target.value)} 
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleAdd()
                    }
                }}
                placeholder="Add task" 
            />
            <button onClick={handleAdd}>
                <i className="fa-solid fa-plus"></i>
            </button>
        </div>
    )
}