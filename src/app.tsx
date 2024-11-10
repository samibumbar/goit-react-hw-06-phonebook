import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./store";
import { addContact, deleteContact, setFilter } from "./contactsSlice";
import { nanoid } from "nanoid";
import { ContactForm, Filter, ContactList } from "./components";
import styles from "./app.module.css";

const App: React.FC = () => {
  const contacts = useSelector((state: RootState) => state.contacts.contacts);
  const filter = useSelector((state: RootState) => state.contacts.filter);
  const dispatch = useDispatch();

  const handleAddContact = (name: string, number: string) => {
    if (contacts.some((contact) => contact.name === name)) {
      alert(`${name} is already in contacts.`);
      return;
    }
    const newContact = { id: nanoid(), name, number };
    dispatch(addContact(newContact));
  };

  const handleDeleteContact = (id: string) => {
    dispatch(deleteContact(id));
  };

  const handleFilterChange = (filter: string) => {
    dispatch(setFilter(filter));
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Phonebook</h1>
      <ContactForm onSubmit={handleAddContact} />
      <h2 className={styles.h2}>Contacts</h2>
      <Filter filter={filter} onChange={handleFilterChange} />
      <ContactList contacts={filteredContacts} onDelete={handleDeleteContact} />
    </div>
  );
};

export default App;
