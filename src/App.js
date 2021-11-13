import React from "react";
import { Admin, Resource } from "react-admin";

// data provider
import { CustomDataProvider } from "./provider/CustomDataProvider";

// contest components
import { ContestList, ContestIcon } from "./components/contest/ContestList";
import { ContestEdit } from "./components/contest/ContestEdit";
import { ContestCreate } from "./components/contest/ContestCreate";
import { AuthProvider } from "./provider/AuthProvider";
import MyLoginPage from "./auth/Login";

export default function App() {

  return (
    <Admin
      dataProvider={CustomDataProvider}
      loginPage={MyLoginPage}
      authProvider={AuthProvider}
    >
      <Resource
        name="esport_game_contest"
        list={ContestList}
        create={ContestCreate}
        edit={ContestEdit}
        icon={ContestIcon}
        options={{ label: "All Contests" }}
      />
    </Admin>
  );
}
