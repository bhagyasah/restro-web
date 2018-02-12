import React from 'react';
import { Label } from 'semantic-ui-react';
import { SchemaForm, SchemaLabel } from '../schema';
import { ItemType } from './dropdowns';

const ItemForm = props => (
  <SchemaForm {...props} schema="Item">
    <ItemType name="itemTypeId" label="Type" />
    <SchemaForm.Input name="name" label="Name" placeholder="Item name" />
    <SchemaForm.Input name="unit" label="Unit" placeholder="ml, plate, ..." />
    <SchemaForm.Input
      name="threshold"
      label="Threshold"
      placeholder="Use 0 to disaable warning"
      labelPosition="right"
    >
      <input />
      <SchemaLabel name="unit" as={Label} />
    </SchemaForm.Input>
  </SchemaForm>
);

export default ItemForm;
