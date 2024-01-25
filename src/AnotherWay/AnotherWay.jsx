/* eslint-disable no-unused-vars */
import { useState } from "react";

const AnotherWay = () => {
  const [task, setTask] = useState([]);
  const [selectedId, setSelectedId] = useState();
console.log(task);

  const handleSubmit = (e) => {
    e.preventDefault();
    const value =  e.target.name.value
    setTask((pre) => [
      ...pre,
      {
        id: task.reduce((count) => (count += 1), 1),
        name:value,
        child: [],
      },
    ]);
    e.target.name.value='';

  };



  const handleSelectedText = (id) => {
    setSelectedId(id);
  };


  const handleChildSubmit = (e, parentId) => {
    e.preventDefault();
    const childName = e.target.childName.value;
    setData(parentId, childName);
    // setTask((pre) =>
    //   pre.map((item) =>
    //     item.id == parentId
    //       ? {
    //           ...item,
    //           child: item.child.some((ch) => ch.name == childName)
    //             ? item.child // Child with the same name already exists, do not add
    //             : [
    //                 ...item.child,
    //                 {
    //                   id: Number(
    //                     `${parentId}.${item.child.reduce(
    //                       (state) => (state += 1),
    //                       1
    //                     )}`
    //                   ),
    //                   name: childName,
    //                   children: [],
    //                 },
    //               ],
    //         }
    //       : item
    //   )
    // );
    setSelectedId("");
    e.target.childName.value ='';
  };


  function setData(id = "2.1", text = "name 2.1.1") {
    const findAndSetData = (arr) => {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].id == id) {
          if (arr[i].child.length > 0) {
            arr[i].child = [
              ...arr[i].child,
              {
                id: arr[i].id + "." + (arr[i].child.length + 1),
                name: text,
                child: [],
              },
            ];
          } else {
            arr[i].child = [
              {
                id: arr[i].id + "." + (arr[i].child.length + 1),
                name: text,
                child: [],
              },
            ];
          }
          break;
        } else if (arr[i].child.length > 0) {
          findAndSetData(arr[i].child);
        }
      }
      return arr;
    };
    let newData = findAndSetData(task);
    setTask(newData);
  }

  const renderChild = (item) => {
    const array = item.id.toString().split(".");
    console.log(array);
    let ml = 0;
    for (let index = 0; index < array.length - 1; index++) {
      ml += Number(array[index]);
    }
console.log(ml);
    return (
      <div>
        <p
          className={`py-5 pl-5 mt-1`}
          style={{
            marginLeft: `${Number(ml) * 2 * 10}px`,
            borderLeft: "1px solid red",
          }}
          onClick={() => handleSelectedText(item.id)}
        >
          {item.id} {item.name}
        </p>
        {item.id == selectedId && (
          <div className="flex">
            <form
              className="ml-[50px] flex"
              onSubmit={(e) => handleChildSubmit(e, item.id)}
            >
              <input
                type="text"
                placeholder="Type here"
                name="childName"
                className="input input-bordered input-primary w-full max-w-xs"
              />
              <input className="px-5 py-2 bg-green-400 text-xl text-white" type="submit" value="Submit" />
            </form>
          </div>
        )}
        {item?.child?.map((item) => {
          const array = item.id.toString().split(".");
          let ml = 0;
          for (let index = 0; index < array.length - 1; index++) {
            ml += Number(array[index]);
          }
          return (
            <div key={item?.id}>
              <p
                className={`py-5 pl-5 mt-1`}
                style={{
                  marginLeft: `${Number(ml) * 2 * 10}px`,
                  borderLeft: "1px solid red",
                }}
                onClick={() => handleSelectedText(item.id)}
              >
                {item.id} {item.name}
              </p>
              {item.id == selectedId && (
                <div className="flex">
                  <form
                    className="ml-[50px] flex"
                    onSubmit={(e) => handleChildSubmit(e, item.id)}
                  >
                    <input
                      type="text"
                      placeholder="Type here"
                      name="childName"
                      className="input input-bordered input-primary w-full max-w-xs"
                    />
                    <input className="px-5 py-2 bg-green-400 text-xl text-white" type="submit" value="Submit" />
                  </form>
                </div>
              )}
              {item?.child?.length > 0 && (
                <>
                  {item?.child?.map((_item) => {
                    return renderChild(_item);
                  })}
                </>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type here"
          name="name"
          className="input input-bordered input-primary w-full max-w-xs"
        />
        <input className="px-5 py-2 bg-green-400 text-xl text-white" type="submit" value="Submit" />
      </form>
      {task.length > 0 && (
        <>
          {task.map((item) => {
            return renderChild(item);
          })}
        </>
      )}
    </div>
  );
};

export default AnotherWay;



