import * as React from "react";
import {
  List,
  Pagination,
  Datagrid,
  DateField,
  TextField,
  EditButton,
  DeleteButton,
  ChipField,
  BooleanField,
} from "react-admin";
import BookIcon from "@material-ui/icons/Book";

export const ContestIcon = BookIcon;

const PostPagination = (props) => (
  <Pagination rowsPerPageOptions={[10]} {...props} />
);

export  function ContestList(props) {
  return (
    <List {...props} pagination={<PostPagination />}>
      <Datagrid>
        <TextField source="id" />
        <TextField source="name" />
        <BooleanField source="multistage" />
        <TextField source="winners" />
        <ChipField source="status" />
        <DateField source="starting_at" />
        <TextField source="created_by_platformusername" label="Platforum Username" />
        <EditButton basePath="/esport_game_contest" />
        <DeleteButton basePath="/esport_game_contest" />
      </Datagrid>
    </List>
  );
}
