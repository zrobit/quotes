import React from 'react';
import {
  List, Edit, Datagrid, DateField, SimpleForm, DisabledInput,
  SimpleShowLayout, SingleFieldList, ChipField,
  Show, ReferenceField, ShowButton, EditButton, SelectArrayInput, ReferenceArrayInput,
  TextField, NumberField, LongTextInput,
  ReferenceArrayField

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
      <EditButton/>
    </Datagrid>
  </List>
);

export const QuoteShow = props => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField label="Size" source="sizeInt"/>
      <DateField label="Created" source="createdAt"/>
      <TextField label="Slug" source="slug"/>
      <ReferenceField addLabel label="Author" source="author" reference="authors">
        <TextField source="name"/>
      </ReferenceField>
      <ReferenceArrayField label="Tags" reference="tags" source="tags">
        <SingleFieldList>
          <ChipField source="name"/>
        </SingleFieldList>
      </ReferenceArrayField>
      <TextField source="content"/>
    </SimpleShowLayout>
  </Show>
);

export const QuoteEdit = props => (
  <Edit {...props}>
    <SimpleForm redirect="show">
      <DisabledInput source="id"/>
      <DisabledInput source="slug"/>
      <ReferenceArrayInput label="Tags" source="tags" reference="tags">
        <SelectArrayInput optionText="name"/>
      </ReferenceArrayInput>
      <LongTextInput source="content"/>
    </SimpleForm>
  </Edit>
);
