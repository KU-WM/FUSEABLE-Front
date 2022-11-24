import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useRecoilState, useRecoilValue } from "recoil";
import { kanbanListState } from "../recoil";
import AddList from "./AddList";
import EditList from "./EditList";
import KanbanList from "./KanbanList";
import './Kanban.css';
import { useEffect } from "react";
import axios from "axios";


function Kanban() {
  const kanbanList = useRecoilValue(kanbanListState);
  const [kanbanListSet, setKanbanListSet] = useRecoilState(kanbanListState);

  useEffect(() => {(async() => {
    {try {
      const UserProfile = window.localStorage.getItem("userCode");
      const res = await axios
      .get(
        '/dummy/dummyKanban.json'
      )
      .then((response) => 
      {
        console.log(response);
        if (kanbanListSet.length != response.data.length)
        {
          setKanbanListSet(clearData(kanbanListSet));
          (response.data).map((data) => {
            setKanbanListSet((oldprojectList) => [
            ...oldprojectList,
            {
              id: data.id,
              title: data.title,
              content: data.content,
              deadline: data.deadline,
              progress: data.progress
            },
          ])
        })}
      })
    }
    catch (e) {
      console.error(e);
    }}
    })();
  },[])

  const clearData = (arr) => {
    return [...arr.slice(0,0)]
  }

  const progressName = [
    {id: 1, progress: 'To Do'},
    {id: 2, progress: 'Progress'},
    {id: 3, progress: 'Done'},
    {id: 4, progress: 'Verify'},
  ];

  const projectId = Number(window.localStorage.getItem("selectedProjectId"))
  console.log("ProjectedId : ", projectId);
  
  const dataHandler = (progress) => {
    return kanbanList
    .filter((data) => data.progress === progress)
    .map((item) => <EditList key={item.id} item={item}/>);
  }

  return (
    <>
      <section className="kanbanListContainer">
        <DndProvider className="Kanban" backend={HTML5Backend}>
          {progressName.map((data) => (
            <KanbanList key={data.id} title={`${data.progress}`}>
              {dataHandler(data.progress)}
            </KanbanList>
          ))}
        </DndProvider>
      </section>
    </>
  )
}

export default Kanban;