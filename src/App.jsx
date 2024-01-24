import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import './App.css';
import AnotherWay from './AnotherWay/AnotherWay';

function App() {
  const [name, setName] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  console.log(name);

  const handleSubmit = (e) => {
    e.preventDefault();
    setName((prev) => [
      ...prev,
      {
        id: uuidv4(),
        name: e.target.name.value,
        children: [],
      },
    ]);
  };

  const handleInputBox = (id) => {
    setSelectedId((prevId) => (prevId === id ? '' : id));
  };

  const handleChildSubmit = (e, parentId) => {
    e.preventDefault();
    const childName = e.target.childName.value;
  
    setName((prev) =>
      prev.map((item) =>
        item.id === parentId
          ? {
              ...item,
              children: item.children.some((child) => child.name === childName)
                ? item.children // Child with the same name already exists, do not add
                : [
                    ...item.children,
                    {
                      id: uuidv4(),
                      name: childName,
                      children: [],
                    },
                  ],
            }
          : item
      )
    );
  };
  

  const renderItems = (items) => {
    return items.map((item) => (
      <div className="flex items-center my-10" key={item.id}>
        <p
          onClick={() => handleInputBox(item.id)}
          className={`my-5 mx-10 text-2xl ${item.id === selectedId ? 'text-blue-500' : ''}`}
        >
          {item.name}
        </p>
        {item.id === selectedId && (
          <div className="flex">
            <form className="ml-[50px]" onSubmit={(e) => handleChildSubmit(e, item.id)}>
              <input
                type="text"
                placeholder="Type here"
                name="childName"
                className="input input-bordered input-primary w-full max-w-xs"
              />
              <input type="submit" value="Submit" />
            </form>
          </div>
        )}
        {item.children.length > 0 && renderItems(item.children)}
      </div>
    ));
  };

  return (
    // <>
    //   <form onSubmit={handleSubmit}>
    //     <input
    //       type="text"
    //       placeholder="Type here"
    //       name="name"
    //       className="input input-bordered input-primary w-full max-w-xs"
    //     />
    //     <input type="submit" value="Submit" />
    //   </form>

    //   {name && renderItems(name)}
    // </>
    <AnotherWay/>
  );
}

export default App; 
