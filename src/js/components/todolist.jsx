import React, { useState } from 'react';

function Tareas() {

  const [tareas, setTareas] = useState([]);

  // Estado para almacenar el texto de la nueva tarea que el usuario está escribiendo
  const [nuevaTarea, setNuevaTarea] = useState('');


  // Función para el cambio en el input de la nueva tarea
  const inputChange = (event) => {

    // Actualizamos el estado 'nuevaTarea' con el valor actual del input
    setNuevaTarea(event.target.value);
  };

  // Función para la tecla Enter
  const KeyDown = (event) => {

    // Si se presiona Enter y el campo de entrada no está vacío
    if (event.key === 'Enter' && nuevaTarea.trim !== '') {
      
      // Creamos una nueva lista de tareas a partir de la lista actual
      const nuevasTareas = [...tareas, nuevaTarea];

      // Actualizamos el estado 'tareas' con la nueva lista que incluye la nueva tarea
      setTareas(nuevasTareas);

      // Limpiamos el campo de entrada 
      setNuevaTarea('');
    }
  };

  // Función para eliminar una tarea
  const deleteTarea = (index) => {
    // Creamos una copia de la lista de tareas para evitar modificar el estado directamente
    const nuevasTareas = [...tareas];
    // Eliminamos la tarea en la posición indicada utilizando splice
    nuevasTareas.splice(index, 1);
    // Actualizamos el estado con la lista modificada
    setTareas(nuevasTareas);
  };

  // Renderizamos 
  return (
    <div className='titulo'><h1>Esta es tu todolist</h1>
    <div className="tareas-container">

      {/* Input para agregar nuevas tareas */}
      <input
        type="text"
        value={nuevaTarea}
        onChange={inputChange}
        onKeyDown={KeyDown}
        placeholder="Agrega una tarea"
      />
      {/* Lista de tareas */}
      <ul>
        {/* Si no hay tareas, mostramos un mensaje */}
        {tareas.length === 0 ? (
          <li>No hay tareas, añade tareas</li>) : (

          // Si hay tareas las mapeamos y renderizamos cada una

          tareas.map((tarea, index) => (
            <li key={index}> {tarea}
            <button onClick={() => deleteTarea(index)}>X</button>
            </li>
          ))
        )}
      </ul>
    </div>
    </div>
  );
}

export default Tareas;