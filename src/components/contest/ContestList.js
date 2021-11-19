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
  TopToolbar,
  useRedirect,
} from "react-admin";
import Button from "@material-ui/core/Button";

import BookIcon from "@material-ui/icons/Book";

export const ContestIcon = BookIcon;

const PostPagination = (props) => (
  <Pagination rowsPerPageOptions={[10]} {...props} />
);

const PostListActions = ({ basePath, data, resource }) => {
  const redirect = useRedirect();
  return (
    <TopToolbar
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        flexDirection: "row",
        width: "100%",
      }}
    >
      {/* Add your custom actions */}

      <Button
        variant="contained"
        color="primary"
        onClick={() => redirect("/esport_game_contest/create")}
      >
        Create New
      </Button>
    </TopToolbar>
  );
};

export function ContestList(props) {
  return (
    <List
      actions={<PostListActions />}
      {...props}
      pagination={<PostPagination />}
    >
      <Datagrid>
        <TextField source="id" />
        <TextField source="name" />
        <BooleanField source="multistage" />
        <TextField source="winners" />
        <ChipField source="status" />
        <DateField source="starting_at" />
        <TextField
          source="created_by_platformusername"
          label="Platforum Username"
        />
        <EditButton basePath="/esport_game_contest" />
        <DeleteButton basePath="/esport_game_contest" />
      </Datagrid>
    </List>
  );
}
