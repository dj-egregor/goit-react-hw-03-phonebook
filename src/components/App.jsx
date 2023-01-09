import React from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

class App extends React.Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const serializedState = localStorage.getItem('contacts');
    const contacts = serializedState ? JSON.parse(serializedState) : [];
    this.setState({ contacts });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts && this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  handleAddContact = newContact => {
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  filterContacts = filter => {
    this.setState({ filter });
  };

  addContact = contact => {
    const { name } = contact;
    const lowerCaseName = name.toLowerCase();
    const isNameUnique = !this.state.contacts.some(
      existingContact => existingContact.name.toLowerCase() === lowerCaseName
    );

    if (isNameUnique) {
      const id = nanoid();
      this.setState(prevState => ({
        contacts: [...prevState.contacts, { ...contact, id }],
      }));
      this.setState({ name: '', number: '' });
    } else {
      alert(`${name} is already in contacts.`);
    }
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const { contacts, filter } = this.state;
    const filteredContacts = contacts
      ? contacts.filter(
          contact =>
            contact.name &&
            contact.name.toLowerCase().includes(filter.toLowerCase())
        )
      : [];

    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onAddContact={this.addContact} />
        <h2>Contacts</h2>
        <Filter filter={this.state.filter} onFilter={this.filterContacts} />
        <ContactList
          contacts={filteredContacts}
          onDeleteContact={this.deleteContact}
        />
      </div>
    );
  }
}

export default App;
