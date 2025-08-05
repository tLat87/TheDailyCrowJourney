// src/store/characterSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Асинхронный thunk для загрузки персонажа из AsyncStorage
export const loadCharacter = createAsyncThunk(
    'character/loadCharacter',
    async (_, { rejectWithValue }) => {
        try {
            const storedCharacter = await AsyncStorage.getItem('selectedCharacter');
            return storedCharacter || null; // Возвращаем null, если ничего не найдено
        } catch (error) {
            console.error('Failed to load character from AsyncStorage:', error);
            return rejectWithValue('Failed to load character');
        }
    }
);

// Асинхронный thunk для сохранения персонажа в AsyncStorage
export const saveCharacter = createAsyncThunk(
    'character/saveCharacter',
    async (character, { rejectWithValue }) => {
        try {
            await AsyncStorage.setItem('selectedCharacter', character);
            return character; // Возвращаем сохраненного персонажа
        } catch (error) {
            console.error('Failed to save character to AsyncStorage:', error);
            return rejectWithValue('Failed to save character');
        }
    }
);

const characterSlice = createSlice({
    name: 'character',
    initialState: {
        selectedCharacter: null,
        status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
        error: null,
    },
    reducers: {
        // Здесь можно было бы добавить синхронные редюсеры, если нужны
        // setCharacterManually: (state, action) => {
        //   state.selectedCharacter = action.payload;
        // }
    },
    extraReducers: (builder) => {
        builder
            // Обработка загрузки персонажа
            .addCase(loadCharacter.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(loadCharacter.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.selectedCharacter = action.payload;
            })
            .addCase(loadCharacter.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
                state.selectedCharacter = null; // Сбрасываем, если загрузка не удалась
            })
            // Обработка сохранения персонажа
            .addCase(saveCharacter.pending, (state) => {
                state.status = 'loading'; // Или 'saving'
                state.error = null;
            })
            .addCase(saveCharacter.fulfilled, (state, action) => {
                state.status = 'succeeded'; // Или 'saved'
                state.selectedCharacter = action.payload;
            })
            .addCase(saveCharacter.rejected, (state, action) => {
                state.status = 'failed'; // Или 'saveFailed'
                state.error = action.payload;
            });
    },
});

export const { actions } = characterSlice; // Если есть синхронные экшены
export default characterSlice.reducer;
