import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useRecoilValue } from "recoil";
import { kanbanListState } from "../recoil";
import AddList from "./AddList";
import EditList from "./EditList";
import KanbanList from "./KanbanList";
import './Kanban.css';

function Kanban() {
  const kanbanList = useRecoilValue(kanbanListState);
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
      <span className="title">KANBAN BOARD</span>

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