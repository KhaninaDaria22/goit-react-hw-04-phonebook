import { useState, useEffect} from "react";
import Section from "components/Section/Section";
import {Container} from "./App.styled";
import  ContactList from "components/ContactList/ContactList";
import  Phonebook  from "components/Phonebook/Phonebook";
import Filter from "components/Filter/Filter";
import { nanoid } from 'nanoid'


const App = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);

  const [filter, setFilter] = useState('');


  useEffect(()=> {
    const storedContacts = localStorage.getItem('contacts');
    if(storedContacts) {
      setContacts(JSON.parse(storedContacts));
    }
  },[]);
  
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);
  
  const addContact = ({name, number}) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };
  
    if (contacts.find((contact) => contact.name.toLowerCase() === name.toLowerCase())) {
      alert(`${name} is already in contact`);
      return;
    }

    setContacts((prevContacts) =>[contact, ...prevContacts]);
};

    const deleteContact = contactId => {
    setContacts((prevContacts) => prevContacts.filter(contact => contact.id !== contactId))  
    };

    const changeFilter = (e) => {
      setFilter(e.currentTarget.value );
  }

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter((contact) => contact.name.toLowerCase().includes(normalizedFilter));
  };

  const filteredContacts = getFilteredContacts();


  return(
    <Container>
      <Section title="Phonebook">
        <Phonebook onSubmit={addContact}></Phonebook>
      </Section>
      <Section title="Contacts">
        <Filter value={filter} onChange={changeFilter}> </Filter>
        <ContactList
         onDeleteContact={deleteContact} contacts={filteredContacts}></ContactList>
      </Section>
    </Container>
  )
};

  
export default App;



