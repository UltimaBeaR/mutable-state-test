import { useReducer, useRef } from 'react';

export function useRerender() {
    // Каждый раз создаем новый объект
    //return useReducer(() => ({}), {})[1];

    // Офф. способ из доков реакта. Но так может быть переполнение до infinity
    //return useReducer(() => ({}), {})[1];

    // Так вроде тоже работает и должно быть в теории более дешево
    // чем каждый раз создавать новый объект, но это неточно
    return useReducer(() => Symbol(), Symbol())[1];
}

export function useMutableState(initialObject) {
    return useRef(initialObject).current;
}