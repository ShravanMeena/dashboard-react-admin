import * as React from "react";
import { Show, SimpleShowLayout, TextField, DateField } from "react-admin";

export const ContestShow = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="name" />
      <DateField label="Starting date" source="starting_at" />
    </SimpleShowLayout>
  </Show>
);
