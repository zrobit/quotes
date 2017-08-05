import React from 'react';
import {
  List, Edit, Datagrid, DateField, SimpleForm, DisabledInput,
  Show, SimpleShowLayout, ShowButton,
  TextField, EditButton, LongTextInput
} from 'admin-on-rest';

export const AuthorList = props => (
  <List {...props} perPage={50}>
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
      <TextField source="meta.title"/>
      <TextField source="meta.description"/>
      <TextField source="meta.og.title"/>
      <TextField source="meta.og.description"/>
    </SimpleShowLayout>
  </Show>
);

export const AuthorEdit = props => (
  <Edit {...props}>
    <SimpleForm redirect="show">
      <DisabledInput source="id"/>
      <DisabledInput source="slug"/>
      <LongTextInput source="meta.title"/>
      <LongTextInput source="meta.description"/>
      <LongTextInput label="OG title" source="meta.og.title"/>
      <LongTextInput label="OG description" source="meta.og.description"/>
    </SimpleForm>
  </Edit>
);
