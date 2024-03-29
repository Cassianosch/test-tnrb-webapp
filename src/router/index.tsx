import React, { useEffect } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import useSession from '../hooks/useSession';

import { HomePage } from '../pages/app/home';

import { SignupPage } from '../pages/auth/signup';
import { LoginPage } from '../pages/auth/login';

import { AdministrationChecksPage } from '../pages/app/admin/administration-checks';

import { BalancePage } from '../pages/app/customer/balance';
import { IncomePage } from '../pages/app/customer/income';
import { OutcomePage } from '../pages/app/customer/outcome';
import { NotificationPage } from '../pages/app/customer/notification';
import { ProfilePage } from '../pages/app/customer/profile';
import { SettingPage } from '../pages/app/customer/setting';
import { HelpPage } from '../pages/app/customer/help';

import useApi from '../hooks/useApi';

const AuthRoutes = (): JSX.Element => (
    <Switch>
        <Route exact path="/signup" component={SignupPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route>
            <Redirect to="/login" />
        </Route>
    </Switch>
);

const AppRoutesCustomers = (): JSX.Element => (
    <Switch>
        <Route exact path="/balance" component={BalancePage} />
        <Route exact path="/income" component={IncomePage} />
        <Route exact path="/outcome" component={OutcomePage} />
        <Route exact path="/notification" component={NotificationPage} />
        <Route exact path="/profile" component={ProfilePage} />
        <Route exact path="/setting" component={SettingPage} />
        <Route exact path="/help" component={HelpPage} />
        <Route>
            <Redirect to="/balance" />
        </Route>
    </Switch>
);

const AppRoutesAdmins = (): JSX.Element => (
    <Switch>
        <Route exact path="/" component={HomePage} />
        <Route
            exact
            path="/administration-checks"
            component={AdministrationChecksPage}
        />
        <Route>
            <Redirect to="/" />
        </Route>
    </Switch>
);

export const Router = (): JSX.Element => {
    const { session, handleCheckLogged } = useSession();

    useApi();

    useEffect(() => {
        handleCheckLogged();
    }, [handleCheckLogged]);

    const handleRoutes = () => {
        if (session && session.access_token) {
            if (session.user.admin === 1) {
                return <AppRoutesAdmins />;
            }
            return <AppRoutesCustomers />;
        }
        return <AuthRoutes />;
    };
    return <BrowserRouter>{handleRoutes()}</BrowserRouter>;
};
