

let data = [
  {
    id: "1",
    text: "name 1",
    child: [
        
    ],
  },
  {
    id: "2",
    text: "name 2",
    child: [
       
    ],
  },
  {
    id: "3",
    text: "name 3",
    child: [
       
    ],
  },
];

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
  let newData = findAndSetData(data);
  data = newData;
  console.log(data);
}

setData("2", "name 2.1");
