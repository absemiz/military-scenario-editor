import MilitaryEntity from "./military-entity";
import { FixedWingType, Affiliation } from "../types/entity";

class FixedWing extends MilitaryEntity 
{
    
    private mType: FixedWingType;

    constructor(
        id: string, 
        name: string,
        type: FixedWingType,
        symbolicIdentificationCode: string,
        affiliation: Affiliation = Affiliation.Friend,
        maxSpeed: number = 0,
        weight: number = 0,
        description?: string,
    ) {
        super(
            id, 
            name, 
            symbolicIdentificationCode, 
            affiliation,
            maxSpeed,
            weight,
            description,
        );
        this.mType = type;
    }

    public getFuel?: (() => number) | undefined = () => { return this.mFuel };
    public setFuel?: ((newFuel: number) => void) | undefined = (newFuel: number) => { return this.mFuel = newFuel; };

    public getTypeName?: (() => string) | undefined = () => { return "FixedWing"; }
    public getSubTypeName?: (() => string) | undefined = () => { return this.subTypeName(); }

    public clone(): MilitaryEntity {
        return new FixedWing(
            this.mID,
            this.mName,
            this.mType,
            this.mSymbolicIdentificationCode,
            this.mAffiliation,
            this.mMaxSpeed,
            this.mWeight,
            this.mDescription
        )
    }

    public subTypeName(): string {
        switch (this.mType) {
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