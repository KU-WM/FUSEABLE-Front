import React, { useState, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useRecoilState } from "recoil";
import { kanbanListState } from "../recoil";
import './EditList.css';

function EditList({item}) {
  const [kanbanList, setKanbanList] = useRecoilState(kanbanListState);
  const index = kanbanList.findIndex((listItem) => listItem === item);
  const ref = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);

  const Edit = () => {
    var textTitle = document.getElementById('editTitle').value;
    var textContent = document.getElementById('editContent').value;
    var textDeadline = document.getElementById('editDeadline').value;

    editItem(textTitle, textContent, textDeadline);

    closeModal();
  }

  const Modal = (props) => {
    const { open, close, header } = props;
  
    return (
      <div className={open ? 'openedModal' : 'modal'}>
        {open ? (
          <section>
            <div>
              {header}
              <button className="close" onClick={close}>
                &times;
              </button>
            </div>
            <main>
              {props.children}
              <ul>
                <li>
                  <input
                    id="editTitle"
                    className="Input_title"
                    type="text"
                    defaultValue={item.title || ''}
                    placeholder='Title'
                  />
                </li>
                <li>
                  <input
                    id="editContent"
                    className="Input_content"
                    type="text"
                    defaultValue={item.content || ''}
                    placeholder='Content'
                  />
                </li>
                <li>
                  <input 
                    id="editDeadline"
                    type="text"
                    className="Input_deadline"
                    defaultValue={item.deadline || ''}
                    placeholder='Deadline'
                  />
                </li>
                <li>
                  <input type='button'
                    className="Edit"
                    defaultValue='수정'
                    onClick={Edit}
                  />
                </li>
              </ul>
            </main>
            <footer>
              <button className="close" onClick={close}>
                close
              </button>
            </footer>
          </section>
        ) : null}
      </div>
    )
  }

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };


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

        console.log("Temp", tempArray);

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
  
  const editItem = (title, content, deadline) => {
    const newList = replaceItemAtIndex(kanbanList, index, {
      ...item,
      title: title,
      content: content,
      deadline: deadline,
    });

    setKanbanList(newList);
  };

  const deleteItem = () =>{
    const newList = removeItemAtIndex(kanbanList, index);

    setKanbanList(newList);
  };

  return (
    <React.Fragment>
      <div className="KanbanList" ref={ref} style={{opacity: isDragging? '0.3' : '1'}}>
        <div id="kanbanTitle">
          {item.title}
        </div>
        <div id="kanbanContent">
          {item.content}          
        </div>
        <div id="kanbanDeadline">
          {item.deadline}          
        </div>
        <Modal open={modalOpen} close={closeModal} header="Modal heading">
        </Modal>
        <button className="Edit_btn" onClick={openModal}>수정</button>
        <button className="Delete_btn" onClick={deleteItem}>삭제</button>
      </div>
    </React.Fragment>
  );
}

function replaceItemAtIndex(arr, index, newValue) {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}

function removeItemAtIndex(arr, index) {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
}

export default EditList;