import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useMsal } from "@azure/msal-react";
import { InteractionStatus } from "@azure/msal-browser";
import { loginRequest } from "./authConfig";
const ProtectedRoute = () => {
    const { instance, inProgress, accounts } = useMsal();
    useEffect(() => {
        console.log("inProgress value:", inProgress);
        console.log("accounts:", accounts);
        console.log("active account:", instance.getActiveAccount());
        if (inProgress === InteractionStatus.None &&
            accounts.length === 0 &&
            !instance.getActiveAccount()) {
            console.log("Starting loginRedirect...");
            instance
                .loginRedirect(loginRequest)
                .catch((error) => console.error("Login failed:", error));
        }
    }, [inProgress, accounts, instance]);
    // While login/redirect in progress
    if (inProgress !== InteractionStatus.None) {
        return React.createElement("div", null, "Processing login...");
    }
    // Still unauthenticated? Show redirect message
    if (accounts.length === 0 && !instance.getActiveAccount()) {
        return React.createElement("div", null, "Redirecting to sign in...");
    }
    // Authenticated route content
    return React.createElement(Outlet, null);
};
export default ProtectedRoute;
