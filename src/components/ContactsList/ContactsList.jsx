import {
  ListOfContact,
  Container,
  ContactItem,
  Button,
} from './ContactList.module';

import { useSelector, useDispatch } from 'react-redux';
import { deleteContacts } from 'redux/operations';
import { getFilter, getContacts } from '../../redux/selectors';

export const ContactsList = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const visibleContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase().trim())
  );

  return (
    <Container>
      <h2>My contacts</h2>
      {visibleContacts.map(contact => (
        <ListOfContact key={contact.id}>
          <ContactItem>
            {contact.name}: {contact.phone}{' '}
            <Button onClick={() => dispatch(deleteContacts(contact.id))}>
              Delete
            </Button>
          </ContactItem>
        </ListOfContact>
      ))}
    </Container>
  );
};
