import React, { useEffect } from "react";
import { EventType, PublicClientApplication, } from "@azure/msal-browser";
import { msalConfig } from "../authConfig";
import { MsalProvider } from "@azure/msal-react";
const msalInstance = new PublicClientApplication(msalConfig);
export const AuthProvider = ({ children }) => {
    useEffect(() => {
        const callbackId = msalInstance.addEventCallback((event) => {
            if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
                const payload = event.payload;
                if (payload.account) {
                    msalInstance.setActiveAccount(payload.account);
                }
            }
        });
        return () => {
            if (callbackId)
                msalInstance.removeEventCallback(callbackId);
        };
    }, []);
    return React.createElement(MsalProvider, { instance: msalInstance }, children);
};
export function useAuthProvider() {
    return { AuthProvider };
}
