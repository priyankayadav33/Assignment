import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/todos';

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

const taskSlice = createSlice({
  name: 'tasks',
  initialState: { list: [], status: 'idle' },
  reducers: {
    addTask: (state, action) => {
      state.list.push(action.payload);
    },
    editTask: (state, action) => {
      const index = state.list.findIndex(task => task.id === action.payload.id);
      state.list[index] = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.list = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchTasks.rejected, (state) => { state.status = 'failed'; });
  },
});

export const { addTask, editTask } = taskSlice.actions;
export default taskSlice.reducer;
