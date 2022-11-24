import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { fetchContacts, addContacts, deleteContacts } from './operations';

const extraAxtions = [fetchContacts, addContacts, deleteContacts];

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: [],
    isLoading: false,
    error: null,
    filter: '',
  },
  reducers: {
    filterContacts(state, action) {
      state.filter = action.payload;
    },
  },
  extraReducers: builder =>
    builder
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.contacts = action.payload;
      })
      .addCase(addContacts.fulfilled, (state, action) => {
        state.contacts.push(action.payload);
      })
      .addCase(deleteContacts.fulfilled, (state, action) => {
        const index = state.contacts.findIndex(
          contact => contact.id === action.payload.id
        );
        state.contacts.splice(index, 1);
      })
      .addMatcher(
        isAnyOf(...extraAxtions.map(action => action.pending)),
        state => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(...extraAxtions.map(action => action.fulfilled)),
        state => {
          state.isLoading = false;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(...extraAxtions.map(action => action.rejected)),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      ),
});

// Генератори екшенів
export const { filterContacts } = contactsSlice.actions;
// Редюсер слайсу
export const contactsReducer = contactsSlice.reducer;
