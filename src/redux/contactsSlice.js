import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContacts, deleteContacts } from './operations';

const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

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
  extraReducers: {
    [fetchContacts.pending]: handlePending,
    [fetchContacts.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      console.log(`action.payload`,action.payload);
      state.contacts = action.payload;
    },
    [fetchContacts.rejected]: handleRejected,
    [addContacts.pending]: handlePending,
    [addContacts.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;

      const contactName = [];

      for (const contact of state.contacts) {
        contactName.push(contact.contact);
      }

      if (contactName.includes(action.payload.contact)) {
        alert(`${action.payload.contact} is already in contacts list`);
        return;
      }

      state.contacts.push(action.payload);
    },
    [addContacts.rejected]: handleRejected,
    [deleteContacts.pending]: handlePending,
    [deleteContacts.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.contacts.splice(action.payload, 1);
    },
    [deleteContacts.rejected]: handleRejected,
  },
  
});

// export const contactsSlice = createSlice({
//   name: 'contacts',
//   initialState: {
//     contacts: [],
//     isLoading: false,
//     error: null,
//     filter: '',
//   },
//   reducers: {
//     addContacts: {
//       reducer(state, action) {
//         const contactName = [];

//         for (const contact of state.contacts) {
//           contactName.push(contact.name);
//         }

//         if (contactName.includes(action.payload.name)) {
//           alert(`${action.payload.name} is already in contacts list`);
//           return;
//         }

//         state.contacts.push(action.payload);
//       },
//       prepare(name, number) {
//         return {
//           payload: {
//             name,
//             number,
//             id: nanoid(),
//           },
//         };
//       },
//     },
//     deleteContacts(state, action) {
//       state.contacts.splice(action.payload, 1);
//     },
//     filterContacts(state, action) {
//       state.filter = action.payload;
//     },
//   },
// });

// Генератори екшенів
export const { filterContacts } =  contactsSlice.actions;
// Редюсер слайсу
export const contactsReducer = contactsSlice.reducer;
