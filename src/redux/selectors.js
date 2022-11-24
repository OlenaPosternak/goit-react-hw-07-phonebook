import { createSelector } from '@reduxjs/toolkit';

export const getFilter = state => state.contacts.filter;

export const getContacts = state => state.contacts.contacts;
export const getLoading = state => state.contacts.isLoading;
export const getError = state => state.contacts.error;

// export const selectVisibleContacts = state => {
//   const contacts = getContacts(state);
//   const filter = getFilter(state);
//   const visibleContacts = contacts.filter(contact =>
//     contact.name.toLowerCase().includes(filter.toLowerCase().trim())
//   );
//   return visibleContacts;
// };

// оптимізація і мемоізація запиту

export const selectVisibleContacts= createSelector(
  [getContacts, getFilter],
  (contacts, filter) => {
    const visibleContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase().trim())
    );
    return visibleContacts;
  }
);
