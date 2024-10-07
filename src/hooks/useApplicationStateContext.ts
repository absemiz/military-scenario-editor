import { useContext } from "react";
import { ApplicationStateContext, ApplicationState } from "../contexts/ApplicationStateContext";

export const useApplicationStateContext = (): ApplicationState => {
    const context: ApplicationState | undefined = useContext(ApplicationStateContext);

    if (!context) throw new Error("useApplicationStateContext must be used within ApplicationStateContextProvider.");

    return context;
}