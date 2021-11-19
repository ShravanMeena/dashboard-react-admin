import React from "react";
import { Admin, Resource } from "react-admin";
import { Route } from "react-router-dom";

// data provider
import { CustomDataProvider } from "./provider/CustomDataProvider";

// contest components
import { ContestList, ContestIcon } from "./components/contest/ContestList";
import { ContestEdit } from "./components/contest/ContestEdit";
import { ContestCreate } from "./components/contest/ContestCreate";
import { AuthProvider } from "./provider/AuthProvider";
// page
import MyLoginPage from "./auth/Login";
import CustomPage from "./page/CustomPage";

import "./App.css";
import { ToastContainer } from "react-toastify";
// react admin use its in built Response Format ...so please make sure ki aapki API ka response


export default function App() {
  return (
    <>
      <Admin
        customRoutes={[
          <Route path="/custom" component={CustomPage} />,
        ]}
        dataProvider={CustomDataProvider} // for api call...
        loginPage={MyLoginPage} //custom login page
        authProvider={AuthProvider} //for authenticatin ... login signup
      >
        {/* you can create multiple Resource I will show you... */}
        <Resource
          name="esport_game_contest" // for an expample your endpoint is www.api.v1.com/posts --- in this condition posts is name... in my case esport_game_contest is endpoint
          list={ContestList} //get all list like all posts list
          create={ContestCreate} // for create a post
          edit={ContestEdit} // for edit post
          icon={ContestIcon} // icon show in the left side
          options={{ label: "All Contests" }} // label in sidebar
        />
        <ToastContainer />
      </Admin>
    </>
  );
}

// yuou can add Filters || Paginations || Search Functionality || and everything you need
// TODO: If you want to help setup react-admin...filll free to ask me
// TODO: THANK YOU SO MUCH DOST!!!
