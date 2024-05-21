import { useState } from 'react';
import './App.css';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const finalSpaceCharacters = [
  {
    id: 'gary',
    name: 'Gary Goodspeed',
  },
  {
    id: 'cato',
    name: 'Little Cato',
  },
  {
    id: 'kvn',
    name: 'KVN',
  },
];

function App() {
  const [characters, setCharacters] = useState(finalSpaceCharacters);

  const handleEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(characters);
    const [reorderedItem] = items.splice(result.source.index, 1);

    items.splice(result.destination.index, 0, reorderedItem);
    setCharacters(items);
  };

  return (
    <>
      <header className='App-header'>
        <h1>Final Space Characters</h1>
        <DragDropContext onDragEnd={handleEnd}>
          <Droppable droppableId='characters'>
            {(provided) => (
              <ul
                className='characters'
                {...provided.droppableProps}
                ref={provided.innerRef}>
                {characters.map(({ id, name }, index) => {
                  return (
                    <Draggable key={id} draggableId={id} index={index}>
                      {(provided) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}>
                          <p>{name}</p>
                        </li>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </header>
    </>
  );
}

export default App;
