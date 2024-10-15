import MilitaryEntity from "./military-entity";
import { InfantryType, Affiliation } from "../types/entity";

class Infantry extends MilitaryEntity 
{
    private mType: InfantryType;

    constructor(
        id: string, 
        name: string,
        type: InfantryType,
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
            description
        );
        this.mType = type;
    }
    
    public getTypeName?: (() => string) | undefined = () => { return "Infantry"; }
    public getSubTypeName?: (() => string) | undefined = () => { return this.subTypeName(); }

    public clone(): MilitaryEntity {
        return new Infantry(
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

    public getFuel?: (() => number) | undefined = undefined;
    public setFuel?: ((newFuel: number) => void) | undefined = undefined;

    public subTypeName(): string {
        switch (this.mType) {
            case InfantryType.Rifleman:
                return "Rifleman";
            case InfantryType.MechanizedInfantry:
                return "Mechanized Infantry";
            case InfantryType.MotorizedInfantry:
                return "Motorized Infantry";
            case InfantryType.SpecialForces:
                return "Special Forces";
            case InfantryType.AntiTank:
                return "Anti-Tank Infantry";
            case InfantryType.Airborne:
                return "Airborne Infantry";
            case InfantryType.MountainInfantry:
                return "Mountain Infantry";
            case InfantryType.NavalInfantry:
                return "Naval Infantry";
            case InfantryType.Engineer:
                return "Engineer";
            case InfantryType.Sniper:
                return "Sniper";
            case InfantryType.MortarTeam:
                return "Mortar Team";
            case InfantryType.Reconnaissance:
                return "Reconnaissance";
            case InfantryType.CombatMedic:
                return "Combat Medic";
            case InfantryType.UrbanWarfare:
                return "Urban Warfare Infantry";
            case InfantryType.ChemicalWarfare:
                return "Chemical Warfare Infantry";
            default:
                return "Unknown Infantry Type";
        }
    }
}

export default Infantry;