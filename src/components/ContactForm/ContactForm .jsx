import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContacts } from 'redux/operations';
import { getContacts } from '../../redux/selectors';

import { Input, Form, Button } from './ContactForm.module';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [phone, setNumber] = useState('');

  const dispatch = useDispatch();
  const allContacts = useSelector(getContacts);

  function handelInputChange(event) {
    switch (event.currentTarget.name) {
      case 'name':
        setName(event.currentTarget.value);
        break;
      case 'phone':
        setNumber(event.currentTarget.value);
        break;
      default:
        return;
    }
  }

  function reset() {
    setName('');
    setNumber('');
  }

  function handelSubmit(event) {
    event.preventDefault();

    const contactName = [];

    for (const contact of allContacts) {
      contactName.push(contact.name);
    }

    if (contactName.includes(name)) {
      alert(`${name} is already in contacts list`);
      return;
    }
    dispatch(addContacts({ name, phone }));
    reset();
  }

  return (
    <Form onSubmit={handelSubmit}>
      <label>
        <span>Name</span>
      </label>
      <Input
        autoComplete="off"
        type="text"
        name="name"
        value={name}
        onChange={handelInputChange}
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />

      <label>
        <span>Number</span>
      </label>
      <Input
        type="tel"
        name="phone"
        value={phone}
        onChange={handelInputChange}
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
      />

      <label>
        <Button type="submit">Add contact</Button>
      </label>
    </Form>
  );
}
