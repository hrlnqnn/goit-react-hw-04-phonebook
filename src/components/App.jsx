import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import ContactForm from './ContactForm';
import Filter from './Filter';
import ContactList from './ContactList';

import { Container, PhonebookTitle, ContactsTitle } from './App.styled';

const stateContacts = [
  { id: 'id-1', name: 'Jane Doe', number: '804(166)220-55-95' },
  { id: 'id-2', name: 'John Doe', number: '50(061)672-01-68' }
];

export const App = () => {
  const [contacts, setContacts] = useState(
    () => JSON.parse(window.localStorage.getItem('contacts')) || stateContacts
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = ({ name, number }) => {

    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    const isInContacts = contacts.some((contact) => contact.name === name);

    if (isInContacts) {
      throw new Error(`${name} is already in contacts.`)
    }

    setContacts([...contacts, newContact]);
  }

  const deleteContact = id => {
    setContacts(contacts.filter(contact => id !== contact.id));
  };

  const handleFilterChange = e => {
    const { value } = e.target;

    setFilter(value);
  };

  const visibleContacts = contacts.filter(({ name }) => {
    const normalizedFilter = name.toLowerCase().includes(filter.toLowerCase());

    return normalizedFilter;
  });

  return (
    <Container>
      <PhonebookTitle>Phonebook</PhonebookTitle>
      <ContactForm onSubmit={addContact} contacts={contacts}></ContactForm>

      <ContactsTitle>Contacts</ContactsTitle>
      <Filter filter={filter} onChange={handleFilterChange} />
      <ContactList
        visibleContacts={visibleContacts}
        deleteContact={deleteContact}
      />
    </Container>
  );
};