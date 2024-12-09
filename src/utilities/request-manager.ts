import MilitaryEntity from "../models/military-entity";
import Path from "../models/path";
import Waypoint from "../models/waypoint";


class RequestManager
{
    private static instance: RequestManager;

    private static simulationAPIURL = 'http://localhost:8080/milsimapi';

    public static getInstance(): RequestManager {

        if (!RequestManager.instance)
        {
            RequestManager.instance = new RequestManager();
        }

        return RequestManager.instance;
    }

    private constructor() {

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

        return new Request(RequestManager.simulationAPIURL, { method: requestMethod, headers: requestHeaders, body: requestBody });
    }
}

export default RequestManager;