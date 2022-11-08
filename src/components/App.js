import "../css/App.css";
import { useState, useEffect } from "react";
import ListContacts from "./ListContacts";
import CreateContact from "./CreateContact";
import * as ContactsAPI from "../utils/ContactsAPI";

function App() {
  const [contacts, setContacts] = useState([]);
  const [screen, setScreen] = useState("list");

  useEffect(() => {
    // Get contacts list from API
    const getContacts = async () => {
      const res = await ContactsAPI.getAll();
      setContacts(res);
    };
    getContacts();
  }, []);

  const handleDelete = async (contact) => {
    // Remove contact from the database
    ContactsAPI.remove(contact);

    // Remove contact from the UI
    setContacts(contacts.filter((c) => c.id !== contact.id));
  };

  return (
    <div>
      {screen === "list" && (
        <ListContacts contacts={contacts} onDeleteContact={handleDelete} />
      )}
      {screen === "create" && <CreateContact />}
    </div>
  );
}

export default App;
