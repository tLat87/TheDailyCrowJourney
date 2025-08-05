// src/store/taskSlice.js
import { createSlice, nanoid } from '@reduxjs/toolkit'; // nanoid для генерации уникальных ID

const taskSlice = createSlice({
    name: 'tasks',
    initialState: {
        // Структура для хранения задач по колонкам
        // 'orderOfTheDay': [], 'knightsMission': [], 'royalChallenge': []
        orderOfTheDay: [],
        knightsMission: [],
        royalChallenge: [],
    },
    reducers: {
        addTask: {
            reducer(state, action) {
                const { columnId, task } = action.payload;
                if (state[columnId]) {
                    state[columnId].push(task);
                }
            },
            prepare(columnId, title, description = '', reminder = '') {
                return {
                    payload: {
                        columnId,
                        task: {
                            id: nanoid(), // Генерируем уникальный ID для каждой задачи
                            title,
                            description,
                            reminder,
                            createdAt: new Date().toISOString(), // Время создания
                        },
                    },
                };
            },
        },
        // Можно добавить редюсеры для удаления, обновления, перемещения задач
        // removeTask: (state, action) => {
        //   const { columnId, taskId } = action.payload;
        //   state[columnId] = state[columnId].filter(task => task.id !== taskId);
        // },
        // updateTask: (state, action) => {
        //   const { columnId, taskId, updates } = action.payload;
        //   const taskIndex = state[columnId].findIndex(task => task.id === taskId);
        //   if (taskIndex !== -1) {
        //     state[columnId][taskIndex] = { ...state[columnId][taskIndex], ...updates };
        //   }
        // },
    },
});

export const { addTask } = taskSlice.actions; // Экспортируем экшен для добавления задачи
export default taskSlice.reducer;
