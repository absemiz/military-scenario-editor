import { Icon } from "leaflet";

export enum Affiliation 
{
    Friend = 3,
    Hostile = 6,
    Unknown = 1,
    Neutral = 4,
    Any = -1
};

export interface IEntity
{
    getEntityID: () => string;
    getEntityName: () => string;
    getEntityCallsign: () => string;
};

export interface IMilitaryEntity extends IEntity 
{
    getAffiliation: () => Affiliation;
    getSymbolicIdentificationCode: () => string;
    getTypeName?: () => string;
    getSubTypeName?: () => string;
};

export interface IMarkerEntity extends IEntity 
{ 
    icon: Icon; 
}

export interface IEntityPosition 
{
    getLatitude: () => number;
    getLongitude: () => number;
    getAltitude: () => number;
    getHeading: () => number;
    getPitch: () => number;
    getRoll: () => number;

    setLatitude: (newLatitude: number) => void;
    setLongitude: (newLongitude: number) => void;
    setAltitude: (newAltitude: number) => void;
    setHeading: (newHeading: number) => void;
}

export interface IEntityPlatform
{
    getFuel?: () => number;
    getMaxSpeed: () => number;
    getWeight: () => number;

    setFuel?: (newFuel: number) => void;
}

export enum FixedWingType 
{
    Fighter,
    Bomber,
    Attacker,
    Reconnaissance,
    Transport,
    Trainer,
    ElectronicWarfare,
    UAV
};

export enum ArmoredFightingVehicleType 
{
    MainBattleTank,
    LightTank,
    InfantryFightingVehicle,
    ArmoredPersonnelCarrier,
    TankDestroyer
};

export enum RotaryWingType 
{
    Attack,
    Utility,
    Transport,
    Reconnaissance,
    AntiSubmarine,
    SearchAndRescue,
    ElectronicWarfare,
    SpecialOperations,
    UAV
};

export enum InfantryType 
{
    Rifleman,                  
    MechanizedInfantry,         
    MotorizedInfantry,          
    SpecialForces,              
    AntiTank,                  
    Airborne,                   
    MountainInfantry,           
    NavalInfantry,              
    Engineer,                   
    Sniper,
    MortarTeam,
    Reconnaissance,
    CombatMedic,
    UrbanWarfare,
    ChemicalWarfare,
};

