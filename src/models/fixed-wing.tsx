import MilitaryEntity from "./military-entity";
import { FixedWingType, Affiliation } from "../types/entity";

class FixedWing extends MilitaryEntity 
{
    type: FixedWingType;

    constructor(
        id: string, 
        name: string,
        type: FixedWingType,
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
            case FixedWingType.Attacker:
                return "Attacker";
            case FixedWingType.Bomber:
                return "Bomber";
            case FixedWingType.Fighter:
                return "Fighter";
            case FixedWingType.ElectronicWarfare:
                return "Electronic Warfare";
            case FixedWingType.Reconnaissance:
                return "Reconnaissance";
            case FixedWingType.Trainer:
                return "Trainer";
            case FixedWingType.Transport:
                return "Transport";
            case FixedWingType.UAV:
                return "Reconnaissance";
            default:
                return "Unknown Type";
        }
    }
}

export default FixedWing;