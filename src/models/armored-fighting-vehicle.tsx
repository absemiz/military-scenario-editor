import MilitaryEntity from "./military-entity";
import { ArmoredFightingVehicleType, Affiliation } from "../types/entity";

class ArmoredFightingVehicle extends MilitaryEntity 
{
    type: ArmoredFightingVehicleType;

    constructor(
        id: string, 
        name: string,
        type: ArmoredFightingVehicleType,
        symbolicIdentificationCode: string,
        affiliation: Affiliation = Affiliation.Friend,
        description?: string,
        position: [number, number] = [0, 0],
        
    ) {
        super(
            id, 
            name, 
            symbolicIdentificationCode, 
            position, 
            affiliation,
            description
        );
        this.type = type;
    }

    public subTypeName(): string {
        switch (this.type) {
            case ArmoredFightingVehicleType.MainBattleTank:
                return "Main Battle Tank";
            case ArmoredFightingVehicleType.LightTank:
                return "Light Tank";
            case ArmoredFightingVehicleType.InfantryFightingVehicle:
                return "Infantry Fighting Vehicle";
            case ArmoredFightingVehicleType.ArmoredPersonnelCarrier:
                return "Armored Personnel Carrier";
            case ArmoredFightingVehicleType.TankDestroyer:
                return "Tank Destroyer";
            default:
                return "Unknown Type";
        }
    }
}

export default ArmoredFightingVehicle;