import React from 'react';
import {
  List, Edit, Datagrid, DateField, SimpleForm, DisabledInput, TextInput,
  Show, SimpleShowLayout, ShowButton,
  ReferenceField,
  TextField, EditButton, NumberField, LongTextInput

} from 'admin-on-rest';

export const TagList = props => (
  <List {...props} perPage={10}>
    <Datagrid>
      <TextField label="ID" source="id"/>
      <NumberField label="Recur" source="recurrence"/>
      <TextField label="Slug" source="slug"/>
      <TextField label="Name" source="name"/>
      <DateField label="Created" source="createdAt"/>
      <ShowButton/>
      <EditButton/>
    </Datagrid>
  </List>
);

export const TagShow = props => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="id"/>
      <DateField source="createdAt"/>
      <TextField source="slug"/>
      <TextField label="Recur" source="recurrence"/>
      <TextField source="name"/>
    </SimpleShowLayout>
  </Show>
);

export const TagEdit = props => (
  <Edit {...props}>
    <SimpleForm>
      <DisabledInput source="id"/>
      <DisabledInput source="slug"/>
      <DisabledInput source="name"/>
    </SimpleForm>
  </Edit>
);
