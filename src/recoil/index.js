import { atom } from "recoil";


const kanbanListState = atom({
  key: 'kanbanListState',
  default: [],
});

export {kanbanListState};