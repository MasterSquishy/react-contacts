import "../css/App.css";
import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import ListContacts from "./ListContacts";
import CreateContact from "./CreateContact";
import * as ContactsAPI from "../utils/ContactsAPI";

function App() {
  let navigate = useNavigate();
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    // Get contacts list from API
    const getContacts = async () => {
      const res = await ContactsAPI.getAll();
      setContacts(res);
    };
    getContacts();
  }, []);

  const handleDelete = (contact) => {
    // Remove contact from the database
    ContactsAPI.remove(contact);

    // Remove contact from the UI
    setContacts(contacts.filter((c) => c.id !== contact.id));
  };

  const handleCreate = (contact) => {
    const create = async () => {
      const res = await ContactsAPI.create(contact);
      setContacts([...contacts, res]);
    };
    create();
    navigate("/");
  };

  return (
    <Routes>
      <Route
        exact
        path="/"
        element={
          <ListContacts contacts={contacts} onDeleteContact={handleDelete} />
        }
      />
      <Route
        path="/create"
        element={
          <CreateContact onCreateContact={(contact) => handleCreate(contact)} />
        }
      />
    </Routes>
  );
}

export default App;
