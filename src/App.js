// src/App.js
import { useState } from "react";
import "./App.css";
import contactsArray from "./contacts.json";

function App() {
  const fiveContacts = contactsArray.slice(5, 10);
  const [contacts, setContacts] = useState(fiveContacts);
  console.log(contacts);

  function addRandomContact() {
    let randomIndex = Math.floor(Math.random() * contactsArray.length);
    const randomContact = contactsArray[randomIndex];
    if (contacts.includes(randomContact)) {
      addRandomContact();
    } else {
      setContacts(contacts.concat(randomContact));
    }
  }

  function sortPopularity() {
    const popularityArray = contacts.slice().sort((contact1, contact2) => {
      return contact2.popularity - contact1.popularity;
    });

    setContacts(popularityArray);
  }

  function sortName() {
    const nameArray = contacts.slice().sort((contact1, contact2) => {
      return contact1.name.localeCompare(contact2.name)
    });

    setContacts(nameArray);
  }

  function deleteContact(id) {
    setContacts(contacts.filter((contact) => {
        return contact.id !== id;
      })
    );
  }

  return (
    <div className="App">
      <h1>IronContacts</h1>
      <button onClick={addRandomContact}>Add Random Contact</button>
      <button onClick={sortPopularity}>Sort by popularity</button>
      <button onClick={sortName}>Sort by name</button>
      <table>
        <tbody>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won an Oscar</th>
            <th>Won an Emmy</th>
            <th>Actions</th>
          </tr>

          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td>
                <img
                  src={contact.pictureUrl}
                  alt=""
                  style={{ height: "100px", width: "auto" }}
                />
              </td>
              <td>{contact.name}</td>
              <td>{contact.popularity.toFixed(2)}</td>
              <td>{contact.wonOscar && "🏆"}</td>
              <td>{contact.wonEmmy && "🏆"}</td>
              <td>
                <button onClick={() => deleteContact(contact.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
