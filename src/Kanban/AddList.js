import { useRecoilState, useSetRecoilState } from "recoil";
import { kanbanListState } from "../recoil";
import './AddList.css'

function AddList({title}) {
  const [KanbanList, setKanbanList] = useRecoilState(kanbanListState);

  const getId = () => {
    let id = KanbanList.length > 0 ? KanbanList[KanbanList.length - 1].id + 1 : 0;
    return id;
  }

  const addItem = () => {
    setKanbanList((oldKanbanList) => [
      ...oldKanbanList,
      {
        id: getId(),
        title: '',
        content: '',
        deadline: '',
        progress: title,
      },
    ])
  };


  return (
    <div className="Btn_area">
      <button className="Add_btn" onClick={addItem}>Add</button>
    </div>
  )
}

export default AddList;