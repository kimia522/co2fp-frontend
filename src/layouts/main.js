import * as React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import SignIn from "./auth/sign-in";
import SignUp from "./auth/sign-up";
import UserDashboard from "./dashboard/user-dashboard";
import AdminDashboard from "./dashboard/admin-dashboard";
import MenuAppBar from "../components/appbar";

function Main() {
    return (
        <>
            <MenuAppBar sx={{zIndex:'1000 !important'}}/>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/dashboard" element={<UserDashboard />} />
                <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
        </>
    );
}

export default Main;
