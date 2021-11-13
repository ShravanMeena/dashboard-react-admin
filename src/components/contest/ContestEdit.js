import * as React from "react";
import {
  Edit,
  SimpleForm,
  TextInput,
  NumberInput,
  DateTimeInput,
} from "react-admin";

const PostTitle = ({ record }) => {
  return <span>Post {record ? `"${record.name}"` : ""}</span>;
};

export const ContestEdit = (props) => {
  return (
    <Edit
      title={<PostTitle />}
      successMessage={"Successfully edit post"}
      {...props}
    >
      <SimpleForm warnWhenUnsavedChanges>
        <TextInput fullWidth disabled source="id" />
        <TextInput fullWidth source="name" />

        {/* multistage tournament open or close TODO: */}

        <NumberInput fullWidth source="max_player" />
        <NumberInput fullWidth source="min_player" />
        <TextInput fullWidth source="joining_details" />
        <NumberInput fullWidth source="platform_id" label="Platform Id" />
        <NumberInput
          fullWidth
          source="prize_structure_master_id"
          label="Prize Structure Master Id"
        />
        <NumberInput fullWidth source="game_master_id" label="Game Master Id" />
        <TextInput
          fullWidth
          source="type_of_tournament"
          label="Type Of Tournament"
        />
        <TextInput fullWidth source="map_detail" label="Map name" />
        <TextInput fullWidth source="get_joined_status" />
        <NumberInput fullWidth source="joined_user_count" />
        <TextInput fullWidth source="created_by_platformusername" />
        <NumberInput fullWidth source="number_of_levels" />
        <TextInput fullWidth source="contest rules" />

        <NumberInput fullWidth source="winners" />
        <DateTimeInput fullWidth source="starting_at" />
      </SimpleForm>
    </Edit>
  );
};
