import MilitaryEntity from "../models/military-entity";
import Path from "../models/path";
import Waypoint from "../models/waypoint";


class RequestManager
{
    private static instance: RequestManager;

    private static readonly simulationInitializeAPIURL = 'http://localhost:8080/milsimapi/initialize';
    private static readonly simulationRuntimeAPIURL = 'http://localhost:8080/milsimapi/runtime';


    public static getInstance(): RequestManager {

        if (!RequestManager.instance)
        {
            RequestManager.instance = new RequestManager();
        }

        return RequestManager.instance;
    }

    private constructor() {

    }

    public getUpdateStateRequest(): Request {

        const requestMethod: string = 'GET';
        const requestHeaders: HeadersInit = {
            'Content-Type': 'application/json',
            'Message-Kind': 'scenario/update-state',
        }

        return new Request(RequestManager.simulationRuntimeAPIURL, { method: requestMethod, headers: requestHeaders});
    }

    public getRunRequest(militaryEntities: MilitaryEntity[], paths: Path[], waypoints: Waypoint[]): Request {

        const initializationMessage: object = {
            entities: militaryEntities.map((value: MilitaryEntity) => value.asJSON()),
            paths: paths.map((value: Path) => value.asJSON()),
            waypoints: waypoints.map((value: Waypoint) => value.asJSON())
        };

        const requestMethod: string = 'POST';
        const requestHeaders: HeadersInit = {
            'Content-Type': 'application/json',
            'Message-Kind': 'scenario/initialize',
        };
        const requestBody: string = JSON.stringify(initializationMessage);

        return new Request(RequestManager.simulationInitializeAPIURL, { method: requestMethod, headers: requestHeaders, body: requestBody });
    }
}

export default RequestManager;