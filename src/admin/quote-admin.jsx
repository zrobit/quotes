import React from 'react';
import {
  List, Edit, Datagrid, DateField, SimpleForm, DisabledInput, TextInput,
  ReferenceField,
  TextField, EditButton, NumberField, LongTextInput

} from 'admin-on-rest';

// export PostIcon from 'material-ui/svg-icons/action/book';

export const QuoteList = props => (
  <List {...props} perPage={10}>
    <Datagrid>
      <NumberField label="Size" source="sizeInt"/>
      <ReferenceField label="Author" source="author" reference="authors">
        <TextField source="name"/>
      </ReferenceField>
      <TextField label="Slug" source="slug"/>
      <DateField label="Created" source="createdAt"/>
      <EditButton/>
    </Datagrid>
  </List>
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
