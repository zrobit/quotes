import React from 'react';
import {
  List, Edit, Datagrid, DateField, SimpleForm, DisabledInput, TextInput,
  SimpleShowLayout,
  Show, ReferenceField, ShowButton,
  TextField, EditButton, NumberField, LongTextInput

} from 'admin-on-rest';

export const QuoteList = props => (
  <List {...props} perPage={10}>
    <Datagrid>
      <NumberField label="Size" source="sizeInt"/>
      <ReferenceField label="Author" source="author" reference="authors">
        <TextField source="name"/>
      </ReferenceField>
      <TextField label="Slug" source="slug"/>
      <DateField label="Created" source="createdAt"/>
      <ShowButton/>
    </Datagrid>
  </List>
);

export const QuoteShow = props => (
  <Show {...props}>
    <SimpleShowLayout>
      <NumberField label="Size" source="sizeInt"/>
      <DateField label="Created" source="createdAt"/>
      <TextField label="Slug" source="slug"/>
      <ReferenceField label="Author" source="author" reference="authors">
        <TextField source="name"/>
      </ReferenceField>
      <TextField source="content"/>
    </SimpleShowLayout>
  </Show>
);

export const QuoteEdit = props => (
  <Edit {...props}>
    <SimpleForm>
      <DisabledInput source="id"/>
      <DisabledInput source="slug"/>
      <LongTextInput source="content"/>
    </SimpleForm>
  </Edit>
);
