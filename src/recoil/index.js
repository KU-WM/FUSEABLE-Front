import { atom } from "recoil";


const kanbanListState = atom({
  key: 'kanbanListState',
  default: [],
});

const projectListState = atom({
  key: 'projectListState',
  default: [],
})

const noticeListState = atom({
  key: 'noticeListState',
  default: [],
})

export {kanbanListState, projectListState, noticeListState};