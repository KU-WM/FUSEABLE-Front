import { useCallback, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useRecoilState } from "recoil";
import { kanbanListState } from "../recoil";
import './EditList.css';

function EditList({item}) {
  const [kanbanList, setKanbanList] = useRecoilState(kanbanListState);
  const index = kanbanList.findIndex((listItem) => listItem === item);
  const ref = useRef(null);

  const changeProcess = (Selecteditem, changeProgress) => {
    setKanbanList((prev) => {
      return prev.map((e) => {
        return {
          ...e,
          progress: e.id === Selecteditem.id ? changeProgress : e.progress,
        };
      });
    });
  };

  const moveHandler = (dragIndex, hoverIndex) => {
    const dragItem = kanbanList[dragIndex];
    const Hover = kanbanList.filter((data) => data.progress === data.progress)[hoverIndex]

    console.log('Hover : ', Hover);
    if (dragItem) {
      setKanbanList((prevState => {
        const tempArray = [...prevState];

        const prev = tempArray.splice(hoverIndex, 1, dragItem);

        tempArray.map((data) => {
          return {
            ...data,
            id: data.id > hoverIndex ? data.id : data.id - 1,
          }
        })
        
        tempArray.splice(dragIndex, 1, prev[0]);

        return tempArray;
      }));
    }
  }

  const [, drop] = useDrop({
    accept: 'kanban',
    hover(item, monitor) {
        if (!ref.current) {
            return;
        }
        const dragIndex = item.id;
        const hoverIndex = index;
        console.log('Index', index);

        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
            return;
        }
        // Determine rectangle on screen
        const hoverBoundingRect = ref.current?.getBoundingClientRect();
        // Get vertical middle
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        // Determine mouse position
        const clientOffset = monitor.getClientOffset();
        // Get pixels to the top
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;
        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%
        // Dragging downwards
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return;
        }
        // Dragging upwards
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return;
        }
        // Time to actually perform the action
        console.log("Drag : ", dragIndex);
        console.log("Hover : ", hoverIndex);
        moveHandler(dragIndex, hoverIndex);
        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
    },
});

  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: 'kanban',
    item: item,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),

    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      console.log('Drag ', dropResult);
      console.log('Item ', item);
      if (dropResult) {
        if (dropResult.name === item.progress) {
          console.log("Same");
        }
        else 
          {switch (dropResult.name) {
            case 'To Do':
              changeProcess(item, 'To Do');
              break;
            case 'Progress':
              changeProcess(item, 'Progress');
              break;
            case 'Done':
              changeProcess(item, 'Done');
              break;
            case 'Verify':
              changeProcess(item, 'Verify');
              break;
          }}
      }
    },
  }))

  dragRef(drop(ref));
  
  const editItemTitle = ({target: {value}}) => {
    const newList = replaceItemAtIndex(kanbanList, index, {
      ...item,
      title: value,
    });

    setKanbanList(newList);
  };

  const editItemContent = ({target: {value}}) => {
    const newList = replaceItemAtIndex(kanbanList, index, {
      ...item,
      content: value,
    });

    setKanbanList(newList);
  };

  const editItemDeadline = ({target: {value}}) => {
    const newList = replaceItemAtIndex(kanbanList, index, {
      ...item,
      deadline: value,
    });

    setKanbanList(newList);
  };

  const deleteItem = () =>{
    const newList = removeItemAtIndex(kanbanList, index);

    setKanbanList(newList);
  };

  return (
    <div className="KanbanList" ref={ref} style={{opacity: isDragging? '0.3' : '1'}}>
      <input
        className="Input_title"
        type="text"
        value={item.title || ''}
        onChange={editItemTitle}
        placeholder='Title'
      />
      <input
        className="Input_content"
        type="text"
        value={item.content || ''}
        onChange={editItemContent}
        placeholder='Content'
      />
      <input type="text"
        className="Input_deadline"
        value={item.deadline || ''}
        onChange={editItemDeadline}
        placeholder='Deadline'
      />
      <button className="Delete_btn" onClick={deleteItem}>X</button>
    </div>
  );
}

function replaceItemAtIndex(arr, index, newValue) {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}

function removeItemAtIndex(arr, index) {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
}

export default EditList;