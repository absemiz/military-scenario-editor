import MilitaryEntity from "./military-entity";
import { ArmoredFightingVehicleType, Affiliation } from "../types/entity";

class ArmoredFightingVehicle extends MilitaryEntity 
{
    private mType: ArmoredFightingVehicleType;

    constructor(
        id: string, 
        name: string,
        type: ArmoredFightingVehicleType,
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
    
    public clone(): MilitaryEntity {
        return new ArmoredFightingVehicle(
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

    public getFuel?: (() => number) | undefined = () => { return this.mFuel };
    public setFuel?: ((newFuel: number) => void) | undefined = (newFuel: number) => { return this.mFuel = newFuel; };

    public getTypeName?: (() => string) | undefined = () => { return "Armored Fighting Vehicle"; }
    public getSubTypeName?: (() => string) | undefined = () => { return this.subTypeName(); }

    public subTypeName(): string {
        switch (this.mType) {
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