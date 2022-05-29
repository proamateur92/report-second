import { doc, collection, addDoc, updateDoc, deleteDoc, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

// Actions
const LOAD = 'vocabulary/LOAD';
const CREATE = 'vocabulary/CREATE';
const UPDATE = 'vocabulary/UPDATE';
const REMOVE = 'vocabulary/REMOVE';
const DONE = 'vocabulary/DONE';

const initialValue = [
  { id: 0, thai: 'ความรัก', korean: '사랑', exam: 'จิตใจที่รู้สึกได้ถึงเสน่ห์ของฝ่ายตรงข้ามและชอบอย่างจริงจัง', isDone: false },
  { id: 1, thai: 'ความรัก', korean: '사랑', exam: 'จิตใจที่รู้สึกได้ถึงเสน่ห์ของฝ่ายตรงข้ามและชอบอย่างจริงจัง', isDone: false },
  { id: 2, thai: 'ความรัก', korean: '사랑', exam: 'จิตใจที่รู้สึกได้ถึงเสน่ห์ของฝ่ายตรงข้ามและชอบอย่างจริงจัง', isDone: false },
];

// Firebase로부터 데이터 가져오기
export const loadWordDB = () => {
  return async function (dispatch) {
    const words = await getDocs(collection(db, 'word'));
    let wordList = [];
    words.forEach(word => {
      wordList.push({ id: word.id, ...word.data() });
    });
    dispatch(loadWord(wordList));
  };
};

// Firebase에 데이터 넣기
export const addWordFB = word => {
  return async function (dispatch) {
    const docRef = await addDoc(collection(db, 'word'), word);
    const newWord = { id: docRef.id, ...word };
    dispatch(createWord(newWord));
  };
};

// Firebase에 데이터 수정
export const updateWordFB = (targetId, newWord) => {
  return async function (dispatch) {
    const docRef = doc(collection(db, 'word'), targetId);
    await updateDoc(docRef, {
      ...newWord,
    });
    await updateDoc(docRef, { ...newWord, isDone: false });
    dispatch(updateWord(targetId, newWord));
  };
};

// Firebase에 데이터 삭제
export const deleteWordFB = targetId => {
  return async function (dispatch) {
    const docRef = doc(collection(db, 'word'), targetId);
    await deleteDoc(docRef);
    dispatch(removeWord(targetId));
  };
};

// Reducer
export default function reducer(state = { list: initialValue }, action = {}) {
  switch (action.type) {
    case 'vocabulary/LOAD': {
      return { list: action.data };
    }
    case 'vocabulary/CREATE': {
      return { list: [...state.list, action.data] };
    }
    case 'vocabulary/UPDATE': {
      return { list: state.list.map(v => (v.id === action.targetId ? { ...v, ...action.newWord } : v)) };
    }
    case 'vocabulary/REMOVE': {
      return { list: state.list.filter(v => v.id !== action.targetId) };
    }
    case 'vocabulary/DONE': {
      return { list: state.list.map(v => (v.id === action.targetId ? { ...v, isDone: !v.isDone } : v)) };
    }
    default:
      return state;
  }
}

export function loadWord(data) {
  return { type: LOAD, data };
}

export function createWord(data) {
  return { type: CREATE, data };
}

export function updateWord(targetId, newWord) {
  return { type: UPDATE, targetId, newWord };
}

export function removeWord(targetId) {
  return { type: REMOVE, targetId };
}

export function doneWord(targetId) {
  return { type: DONE, targetId };
}
