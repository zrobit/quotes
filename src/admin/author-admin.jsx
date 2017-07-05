import React from 'react';
import {
  List, Edit, Datagrid, DateField, SimpleForm, DisabledInput, TextInput,
  Show, SimpleShowLayout, ShowButton,
  ReferenceField,
  TextField, EditButton, NumberField, LongTextInput
} from 'admin-on-rest';

export const AuthorList = props => (
  <List {...props} perPage={10}>
    <Datagrid>
      <TextField label="ID" source="id"/>
      <TextField label="Slug" source="slug"/>
      <TextField label="Name" source="name"/>
      <DateField label="Created" source="createdAt"/>
      <ShowButton/>
      <EditButton/>
    </Datagrid>
  </List>
);

export const AuthorShow = props => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="id"/>
      <TextField source="slug"/>
      <TextField source="name"/>
      <DateField label="Created" source="createdAt"/>
    </SimpleShowLayout>
  </Show>
);

export const AuthorEdit = props => (
  <Edit {...props}>
    <SimpleForm>
      <DisabledInput source="id"/>
      <DisabledInput source="slug"/>
    </SimpleForm>
  </Edit>
);

