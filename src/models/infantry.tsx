import MilitaryEntity from "./military-entity";
import { InfantryType, Affiliation } from "../types/entity";

class Infantry extends MilitaryEntity 
{
    type: InfantryType;

    constructor(
        id: string, 
        name: string,
        type: InfantryType,
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