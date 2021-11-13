import React from "react";

import {
  Create,
  SimpleForm,
  TextInput,
  NumberInput,
  BooleanInput,
  SelectInput,
  DateTimeInput,
  FormDataConsumer,
} from "react-admin";

import TimeSlotsInput from "./CustomInouts/TimeSlotsInput";
const validateUserCreation = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = "The name is required";
  }
  if (!values.status) {
    errors.status = "The status is required";
  }
  if (!values.visibility_level) {
    errors.visibility_level = "The visibility level is required";
  }
  if (!values.status) {
    errors.status = "The status is required";
  }
  if (!values.min_player) {
    errors.min_player = "The min player is required";
  }
  if (!values.max_player) {
    errors.max_player = "The max player is required";
  }
  if (!values.game_master_id) {
    errors.game_master_id = "The game_master_id is required";
  }
  if (!values.winners) {
    errors.winners = "The winners is required";
  }

  return errors;
};

export const ContestCreate = (props) => (
  <Create title="Create new contest" warnWhenUnsavedChanges {...props}>
    <SimpleForm validate={validateUserCreation}>
      <BooleanInput source="multistage" />

      {/* multistage fields */}
      <FormDataConsumer fullWidth>
        {({ formData, ...rest }) =>
          formData.multistage && (
            <>
              {/* custom input field for time slots */}
              <TimeSlotsInput />
              <NumberInput
                fullWidth
                source="number_of_levels"
                {...rest}
                defaultValue={2}
              />
            </>
          )
        }
      </FormDataConsumer>

      <TextInput fullWidth source="name" />
      <TextInput
        fullWidth
        source="display_image"
        defaultValue="https://kgimages.s3.ap-south-1.amazonaws.com/icons/fficon.jpg"
      />

      <SelectInput
        fullWidth
        source="visibility_level"
        defaultValue="PUBLIC"
        choices={[
          { id: "PUBLIC", name: "PUBLIC" },
          { id: "PRIVATE", name: "PRIVATE" },
        ]}
      />

      <SelectInput
        fullWidth
        source="status"
        defaultValue="PENDING"
        choices={[
          { id: "PENDING", name: "PENDING" },
          { id: "COMPLETED", name: "COMPLETED" },
        ]}
      />

      <NumberInput fullWidth source="max_player" defaultValue={12} />
      {/* multistage max playes is equal to first object size length of time_slots */}

      <NumberInput fullWidth source="min_player" defaultValue={0} />
      <TextInput fullWidth source="joining_details" />

      <NumberInput
        fullWidth
        source="platform_id"
        defaultValue={1}
        label="Platform Id"
      />
      <NumberInput
        fullWidth
        source="prize_structure_master_id"
        label="Prize Structure Master Id"
        defaultValue={3}
      />

      <NumberInput fullWidth source="winners" defaultValue={3} />

      <NumberInput
        fullWidth
        source="game_master_id"
        label="Game Master Id"
        defaultValue={3}
      />
      {/* type of tournmaments depends on game master id*/}
      <TextInput
        fullWidth
        source="type_of_tournament"
        label="Type Of Tournament"
        defaultValue="SOLO"
      />

      <TextInput
        fullWidth
        source="map_detail"
        label="Map name"
        defaultValue="Bermuda"
      />
      <TextInput
        fullWidth
        source="created_by_platformusername"
        defaultValue="Shravan meena"
      />

      <DateTimeInput fullWidth source="starting_at" />
    </SimpleForm>
  </Create>
);
