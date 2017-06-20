import React from 'react';
import {
  List, Edit, Datagrid, DateField, SimpleForm, DisabledInput, TextInput,
  ReferenceField,
  TextField, EditButton, NumberField, LongTextInput

} from 'admin-on-rest';

// export PostIcon from 'material-ui/svg-icons/action/book';

export const AuthorList = props => (
  <List {...props} perPage={10}>
    <Datagrid>
      <TextField label="ID" source="id"/>
      <TextField label="Slug" source="slug"/>
      <TextField label="Name" source="name"/>
      <DateField label="Created" source="createdAt"/>
      <EditButton/>
    </Datagrid>
  </List>
);

export const AuthorEdit = props => (
  <Edit {...props}>
    <SimpleForm>
      <DisabledInput source="id"/>
      <DisabledInput source="slug"/>
    </SimpleForm>
  </Edit>
);
