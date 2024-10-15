import MilitaryEntity from "./military-entity";
import { RotaryWingType, Affiliation } from "../types/entity";

class RotaryWing extends MilitaryEntity {
    private mType: RotaryWingType;

    constructor(
        id: string, 
        name: string,
        type: RotaryWingType,
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

    public getTypeName?: (() => string) | undefined = () => { return "Rotary Wing"; }
    public getSubTypeName?: (() => string) | undefined = () => { return this.subTypeName(); }

    public clone(): MilitaryEntity {
        return new RotaryWing(
            this.mID,
            this.mName,
            this.mType,
            this.mSymbolicIdentificationCode,
            this.mAffiliation,
            this.mMaxSpeed,
            this.mWeight,
            this.mDescription,
        )
    }

    public subTypeName(): string {
        switch (this.mType) {
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