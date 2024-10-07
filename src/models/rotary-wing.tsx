import MilitaryEntity from "./military-entity";
import { RotaryWingType, Affiliation } from "../types/entity";

class RotaryWing extends MilitaryEntity {
    type: RotaryWingType;

    constructor(
        id: string, 
        name: string,
        type: RotaryWingType,
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
            case RotaryWingType.Attack:
                return "Attack";
            case RotaryWingType.AntiSubmarine:
                return "Anti Submarine";
            case RotaryWingType.SearchAndRescue:
                return "Search and Rescue";
            case RotaryWingType.ElectronicWarfare:
                return "Electronic Warfare";
            case RotaryWingType.Reconnaissance:
                return "Reconnaissance";
            case RotaryWingType.SpecialOperations:
                return "Special Operations";
            case RotaryWingType.Transport:
                return "Transport";
            case RotaryWingType.Utility:
                return "Utility";
            case RotaryWingType.UAV:
                return "UAV";
            default:
                return "Unknown Type";
        }
    }
};

export default RotaryWing;