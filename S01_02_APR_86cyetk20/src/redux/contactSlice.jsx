import { createSlice } from "@reduxjs/toolkit";


const loadContacts = () => {
  const storedContacts = localStorage.getItem("contacts");
  return storedContacts ? JSON.parse(storedContacts) : [];
};

const contactSlice = createSlice({
  name: "contacts",
  initialState: {
    contacts: loadContacts(),
  },
  reducers: {
    addContact: (state, action) => {
      state.contacts.push(action.payload);
      localStorage.setItem("contacts", JSON.stringify(state.contacts));
    },
    updateContact: (state, action) => {
      const { id, name, phone, email, address, company, notes, photo } = action.payload;
      const index = state.contacts.findIndex(contact => contact.id === id);
      if (index !== -1) {
        state.contacts[index] = { id, name, phone, email, address, company, notes, photo };
        localStorage.setItem("contacts", JSON.stringify(state.contacts)); 
      }
    },
    deleteContact: (state, action) => {
      state.contacts = state.contacts.filter(contact => contact.id !== action.payload);
      localStorage.setItem("contacts", JSON.stringify(state.contacts)); 
    },
  },
}); 

export const { addContact, updateContact, deleteContact } = contactSlice.actions;
export default contactSlice.reducer; 