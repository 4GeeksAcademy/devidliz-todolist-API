import React, { useState, useEffect } from 'react';

function Tareas() {
    const [tareas, setTareas] = useState([]);
    const [nuevaTarea, setNuevaTarea] = useState('');

    const API_URL = 'https://playground.4geeks.com/todo/users/deividliz'; // URL de la API
    const userName = 'deividliz'

    useEffect(() => {
        // Carga inicial de tareas desde la API
        fetch(API_URL)
            .then(response => response.json())
            .then(data => setTareas(data.todos || [])); // En el caso de que no haya tareas (data.todos sea null o undefined)
    }, []);

    const inputChange = (event) => {
        setNuevaTarea(event.target.value);
    };

    const KeyDown = async (event) => {
        if (event.key === 'Enter' && nuevaTarea.trim() !== '') {
            const nuevaTareaObj = {
                label: nuevaTarea.trim(),
                is_done: false 
            };

            fetch(`https://playground.4geeks.com/todo/todos/${userName}`, { // URL para añadir tareas
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(nuevaTareaObj)
            })
                .then(response => response.json())
                .then(tareaGuardada => {
                    setTareas([...tareas, tareaGuardada]);
                    setNuevaTarea('');
                });
        }
    };

    const deleteTarea = async (id) => {
        fetch(`https://playground.4geeks.com/todo/todos/${id}`, { method: 'DELETE' }) // URL correcta para eliminar tareas una a una
            .then(() => {
                const nuevasTareas = tareas.filter(tarea => tarea.id !== id);
                setTareas(nuevasTareas);
            });
    };

    const deleteAllTareas = async () => {
        
            // 1. Pedirle a la API la lista de todas las tareas del usuario
            const todasTareas = await fetch(`https://playground.4geeks.com/todo/users/${userName}`); // Eliminar tareas todas a la vez
            const datos = await todasTareas.json();
            const listaDeTareas = datos.todos || []; // Si no hay tareas, usamos una lista vacía
    
            // 2. Para cada tarea en la lista, pedirle a la API que la borre
            for (let i = 0; i < listaDeTareas.length; i++) {
                let tarea = listaDeTareas[i];
                await fetch(`https://playground.4geeks.com/todo/todos/${tarea.id}`, {
                    method: 'DELETE' 
                });
            }
    
            // 3. Cuando terminamos actualizamos la lista
            setTareas([]);
    
         throw (error) => {
            // Si algo sale mal, mostramos un mensaje de error
            console.error('No se pudieron borrar las tareas:', error);
        }
    };
    return (
        <div className='titulo'>
            <h1>Mi lista de tareas</h1>
            <div className="tareas-container">
                <input
                    type="text"
                    value={nuevaTarea}
                    onChange={inputChange}
                    onKeyDown={KeyDown}
                    placeholder="Agrega una tarea"
                />
                <button  onClick={deleteAllTareas}>Limpiar todas las tareas</button>
                <ul>
                    {tareas.length === 0 ? (<li>No hay tareas, añade tareas</li>) : (
                        tareas.map((tarea) => (
                            <li key={tarea.id}>
                                <strong>{tarea.label}</strong> {/* Muestra el texto de la tarea */}
                                <button className='btn' onClick={() => deleteTarea(tarea.id)}>X</button>
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </div>
    );
}

export default Tareas;
