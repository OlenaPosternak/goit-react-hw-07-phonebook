import {
  ListOfContact,
  Container,
  ContactItem,
  Button,
} from './ContactList.module';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteContacts } from 'redux/operations';
import { getFilter, getContacts,getLoading,getError  } from '../../redux/selectors';
import { fetchContacts } from '../../redux/operations';

export const ContactsList = () => {
  const contacts = useSelector(getContacts);
  const isLoading = useSelector(getLoading);  
  const error = useSelector(getError);

  const filter = useSelector(getFilter);
  const dispatch = useDispatch();
  

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const visibleContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase().trim())
  );

  return (
    <Container>

      <h2>My contacts</h2>
      {isLoading && !error && <b>Request in progress...</b>}
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
