import { Icon } from "leaflet";

export enum Affiliation {
    Friend = 3,
    Hostile = 6,
    Unknown = 1,
    Neutral = 4,
    Any = -1
};

export interface IEntity {
    id: string;
    name: string;
    position: [number, number];
};

export interface IMilitaryEntity extends IEntity {
    affiliation: Affiliation;
    symbolicIdentificationCode: string;
};

export interface IMarkerEntity extends IEntity { icon: Icon; }

export interface IFixedWing extends IMilitaryEntity {}

export enum FixedWingType {
    Fighter,
    Bomber,
    Attacker,
    Reconnaissance,
    Transport,
    Trainer,
    ElectronicWarfare,
    UAV
};

export enum ArmoredFightingVehicleType {
    MainBattleTank,
    LightTank,
    InfantryFightingVehicle,
    ArmoredPersonnelCarrier,
    TankDestroyer
};

export enum RotaryWingType {
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

export enum InfantryType {
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

