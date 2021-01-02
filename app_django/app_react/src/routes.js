import React from "react";
import { Route } from "react-router-dom";

import Body_About from "./containers/_About/Body";
import Body_Account from "./containers/_Account/Body";
import Body_Acct_Pub_Form from "./containers/_Account/Body_Private/Body_Acct_Pub_Form";
import Body_Acct_UnPub_Form from "./containers/_Account/Body_Private/Body_Acct_UnPub_Form";
import Body_Database from "./containers/_Database/Body";
import Body_DB_Details from "./containers/_Database/Body_Details";
import Body_DB_Details_Edit from "./containers/_Database/Body_Details_Form";
import Body_Store from "./containers/_Store/Body";
import Body_Store_Details from "./containers/_Store/Body_Details";

import Sider_Database from "./containers/_Database/Sider";
import Sider_Store from "./containers/_Store/Sider";

import Footer_About from "./containers/_About/Footer";

export const BodyRouter = () => (
    <div>
        <Route exact path="/" component={Body_About} />
        <Route path="/about" component={Body_About} />
        <Route exact path="/account/:accountId" component={Body_Account} />
        <Route
            exact
            path="/account/:accountId/public/edit"
            component={Body_Acct_Pub_Form}
        />
        <Route
            exact
            path="/account/:accountId/private/edit"
            component={Body_Acct_UnPub_Form}
        />
        <Route exact path="/database" component={Body_Database} />
        <Route exact path="/database/:phylum/:id" component={Body_DB_Details} />
        <Route
            exact
            path="/database/:phylum/:id/:mode"
            component={Body_DB_Details_Edit}
        />
        <Route exact path="/store" component={Body_Store} />
        <Route exact path="/store/:phylum/:id" component={Body_Store_Details} />
    </div>
);

export const SiderRouter = () => (
    <div>
        <Route exact path="/database" component={Sider_Database} />
        <Route exact path="/database/:phylum/:id" component={Sider_Database} />
        <Route path="/store" component={Sider_Store} />
    </div>
);

export const FooterRouter = () => (
    <div>
        <Route path="/about" component={Footer_About} />
    </div>
);

export default BodyRouter;
