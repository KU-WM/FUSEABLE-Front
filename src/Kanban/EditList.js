import React, { useState, useRef, useCallback } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useRecoilState } from "recoil";
import { kanbanListState } from "../recoil";
import './EditList.css';
import ReactDatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function EditList({item}) {
  const [kanbanList, setKanbanList] = useRecoilState(kanbanListState);
  const index = kanbanList.findIndex((listItem) => listItem === item);
  const ref = useRef();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, seleteDate] = useState(new Date());


  const selectedProjectId = window.localStorage.getItem("selectedProjectId");

  const navigate = useNavigate();
  
  
  const Edit = () => {
    var textTitle = document.getElementById('editTitle').value;
    var textContent = document.getElementById('editContent').value;
    var textDeadline = document.getElementById('editDeadline').value;

    editItem(textTitle, textContent, textDeadline);

    closeModal();
  }

  const Modal = useCallback((props) => {
    const { open, close, header } = props;
  
    return (
      <div className={open ? 'openedModal' : 'modal'}>
        {open ? (
          <section>
            {/* {console.log("Modal Open")} */}
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
                  <ReactDatePicker 
                    selected={selectedDate}
                    onChange={date => seleteDate(date)}
                    id="editDeadline"
                    type="text"
                    className="Input_deadline"
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
  },[selectedDate])

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
    window.localStorage.setItem("ITEM", hoverIndex);

    if (dragItem) {
      const tempArray = [...kanbanList];

      tempArray.splice(dragIndex, 1);
      tempArray.splice(hoverIndex, 0, dragItem);
      
      setKanbanList(tempArray);
    };
  }

  // const [, dropUp] = useDrop(
  //   () => ({
  //     accept: 'kanban',
  //     canDrop: () => false,
  //     hover({item, index}) {
  //       const tempSet = kanbanList.filter((data) => data.progress === item.progress)
  //       const hoverIndex = tempSet.findIndex((data) => data === item)
  //       const target = kanbanList.findIndex((data) => data === tempSet[hoverIndex - 1])
  //       console.log("DropUP : ",tempSet, hoverIndex);
  //       if (hoverIndex) {
  //         moveHandler(index, target);
  //       }
  //     }
  //   }),
  //   [moveHandler]
  // )

  // const [, dropDown] = useDrop(
  //   () => ({
  //     accept: 'kanban',
  //     canDrop: () => false,
  //     hover({item, index}) {
  //       const tempSet = kanbanList.filter((data) => data.progress === item.progress)
  //       const hoverIndex = tempSet.findIndex((data) => data === item)
  //       const target = kanbanList.findIndex((data) => data === tempSet[hoverIndex + 1])
  //       console.log("TEST : ", {item, index});
  //       if (tempSet.index !== hoverIndex) {
  //         moveHandler(index, target);
  //       }
  //     }
  //   }),
  //   [moveHandler]
  // )



  const [, drop] = useDrop({
    accept: 'kanban',
    hover(item, monitor) {
        if (!ref.current) {
            return;
        }
        const hoverIndex = index;
        const itemIndex = kanbanList.filter((data) => data.progress === item.progress).findIndex((data) => data === item)
        const tempF = itemIndex > 0 ? kanbanList.filter((data) => data.progress === item.progress)[itemIndex - 1] : 0;
        const tempB = itemIndex < kanbanList.filter((data) => data.progress === item.progress).length - 1 ? kanbanList.filter((data) => data.progress === item.progress)[itemIndex + 1] : 0;
        const dragForwordIndex = kanbanList.findIndex((listItem) => listItem === tempF)
        const dragBackwordIndex = kanbanList.findIndex((listItem) => listItem === tempB)

        // Don't replace items with themselves
       
        // Determine rectangle on screen
        const hoverBoundingRect = ref.current?.getBoundingClientRect();
        // Get vertical middle
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        // Determine mouse position
        const clientOffset = monitor.getClientOffset();
        // console.log(hoverBoundingRect);
        // console.log(clientOffset);
        // Get pixels to the top
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;
        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%
        // Dragging downwards
        if (hoverClientY < hoverMiddleY && hoverIndex >= kanbanList.length) {
          moveHandler(hoverIndex, dragForwordIndex);
        }
        // Dragging upwards
        if (hoverClientY > hoverMiddleY && hoverIndex !== 0) {
          moveHandler(hoverIndex, dragBackwordIndex);
        }
        // Time to actually perform the action
        // console.log("Drag : ", dragIndex);
        // console.log("Hover : ", hoverIndex);
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

    end: async(item, monitor) => {
      const dropResult = monitor.getDropResult();
      // console.log('Drag ', dropResult);
      if (dropResult) {
        if(dropResult.name)
          switch (dropResult.name) {
            case 'TODO':
              changeProcess(item, 'TODO');
              break;
            case 'PROGRESS':
              changeProcess(item, 'PROGRESS');
              break;
            case 'DONE':
              changeProcess(item, 'DONE');
              break;
            case 'VERIFY':
              changeProcess(item, 'VERIFY');
              break;
        }
      }
      
      try {
          const sendIndex = kanbanList.findIndex((listItem) => listItem === item);
          // console.log("LISE : ", newIndex, sendIndex);
          // console.log("SEND : ", {
          //   newStep: dropResult.name,
          //   arrayId: Number(item.id),
          //   newArrayId: Number(newIndex),
          // });

        const res = await axios
        .post(
          `http://localhost:8080/api/project/main/move/${selectedProjectId}`,
          {
            newStep: dropResult.name,
            arrayId: Number(item.id),
            newArrayId: Number(window.localStorage.getItem("ITEM")),
          }
        )
        .then((response) => {
          // console.log("D&D response : ", response);
        })
      }
      catch (e) {
        console.log(e);
      }
      
    },
    }),
  )


  dragRef(drop(ref));
  // dragRef(dropUp(ref));
  // dragRef(dropDown(ref));

  const editItem = async(title, content, deadline) => {
    const newList = replaceItemAtIndex(kanbanList, index, {
      ...item,
      title: title,
      content: content,
      deadline: deadline,
    });

    setKanbanList(newList);
    const endAt = (deadline.slice(6,10) + "-" + deadline.slice(0,2) + "-" + deadline.slice(3,5));
    console.log(endAt);

    try {
      const res = await axios
      .post (
        `http://localhost:8080/api/project/main/update/${selectedProjectId}/${index}`,
        {
          title: title,
          content: content,
          endAt: endAt,
        }
      )
      .then ((response) => 
        console.log("Delete Response : ", response)
      )
    }
    catch(e) {
      console.log(e);
    }

    navigate("/main");
  };

  const deleteItem = async() =>{
    const newList = removeItemAtIndex(kanbanList, index);

    try {
      const res = await axios
      .get (
        `http://localhost:8080/api/project/main/delete/${selectedProjectId}/${item.id}`
      )
      .then ((response) => 
        console.log("Delete Response : ", response)
      )
    }
    catch(e) {
      console.log(e);
    }

    setKanbanList(newList);

    navigate("/main");
  };

  return (
    <React.Fragment>
      <div className="KanbanList" ref={ref} style={{opacity: isDragging? '0.3' : '1'}} >
          <div id="kanbanTitle">
            {item.title}
          </div>
          <div id="kanbanContent">
            {item.content}          
          </div>
          <div id="kanbanDeadline">
            {item.deadline}          
          </div>
          <button className="Edit_btn" onClick={openModal}>수정</button>
          <button className="Delete_btn" onClick={deleteItem}>삭제</button>
      </div>
      <Modal open={modalOpen} close={closeModal} header="Modal heading"></Modal>
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