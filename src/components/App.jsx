import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import ContactForm from './ContactForm';
import Filter from './Filter';
import ContactList from './ContactList';

import { Container, PhonebookTitle, ContactsTitle } from './App.styled';

const stateContacts = [
  { id: 'id-1', name: 'Jane Doe', number: '804(166)220-55-95' },
  { id: 'id-2', name: 'John Doe', number: '50(061)672-01-68' },
  { id: 'id-3', name: 'John Paul', number: '5(5102)750-81-58' },
  { id: 'id-4', name: 'Dennis Wilson', number: '13(8330)970-09-79' },
  { id: 'id-5', name: 'Rick Bell', number: '2(6388)541-45-72' },
  { id: 'id-6', name: 'John Gardner', number: '9(989)872-67-35' },
  { id: 'id-7', name: 'Shane Gonzales', number: '25(019)004-42-80' },
  { id: 'id-8', name: 'Joseph Duncan', number: '0(06)853-72-53' },
];

export const App = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(window.localStorage.getItem('contacts')) || stateContacts
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (name, number) => {
    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    setContacts([...contacts, newContact]);
  };

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
