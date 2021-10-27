import React, { useEffect } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import useSession from '../hooks/useSession';
import { HomePage } from '../pages/app/home';
import { LoginPage } from '../pages/auth/login';
import { BalancePage } from '../pages/app/customer/balance';
// import { SignupPage } from '../pages/app/signup';
import { AdministrationChecksPage } from '../pages/app/admin/administration-checks';
import useApi from '../hooks/useApi';

const AuthRoutes = (): JSX.Element => (
    <Switch>
        <Route exact path="/login" component={LoginPage} />
        <Route>
            <Redirect to="/login" />
        </Route>
    </Switch>
);

const AppRoutesCustomers = (): JSX.Element => (
    <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/balance" component={BalancePage} />
        <Route>
            <Redirect to="/" />
        </Route>
    </Switch>
);

const AppRoutesAdmins = (): JSX.Element => (
    <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/administration-checks" component={AdministrationChecksPage} />
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
                return <AppRoutesAdmins />
            }
            return <AppRoutesCustomers />
        }
        return <AuthRoutes />;
    }
    return (
        <BrowserRouter>
            {
                handleRoutes()
            }
        </BrowserRouter>
    );
};
