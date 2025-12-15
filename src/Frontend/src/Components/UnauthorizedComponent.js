import React from "react";
import { Box, Alert, Button } from "@mui/material";
const UnauthorizedComponent = ({ error, onLogout, }) => (React.createElement(Box, { display: "flex", flexDirection: "column", alignItems: "center", bgcolor: "#FDEDED", p: 2 },
    React.createElement(Alert, { severity: "error", sx: { mb: 2 } }, error),
    React.createElement(Button, { variant: "contained", color: "error", onClick: onLogout }, "Log Out")));
export default UnauthorizedComponent;
