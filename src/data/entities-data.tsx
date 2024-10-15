import { ExpandMore } from "@mui/icons-material";

import MilitaryEntity from "../models/military-entity";
import FixedWing from "../models/fixed-wing";
import RotaryWing from "../models/rotary-wing";
import ArmoredFightingVehicle from "../models/armored-fighting-vehicle";
import Infantry from "../models/infantry";

import { FixedWingType, RotaryWingType, ArmoredFightingVehicleType, InfantryType, Affiliation } from "../types/entity";

import { IAssetTreeItem } from "../types/asset-browser";

const MilitaryEntitiesData: MilitaryEntity[] = [
    new FixedWing('F-16', 'F-16 Fighting Falcon', FixedWingType.Fighter, '30030100001101050000', Affiliation.Friend, 2400, 9200, "A versatile multirole fighter used by various air forces."),
    new FixedWing('F-35', 'F-35 Lightning II', FixedWingType.Fighter, '30030100001101050000', Affiliation.Friend, 1930, 13200, "A fifth-generation stealth multirole fighter aircraft."),
    new FixedWing('F-22', 'F-22 Raptor', FixedWingType.Fighter, '30030100001101050000', Affiliation.Friend, 2400, 19700, "A fifth-generation stealth air superiority fighter."),
    new FixedWing('MiG-31', 'MiG-31 Foxhound', FixedWingType.Fighter, '30060100001101050000', Affiliation.Hostile, 3000, 33500, "A long-range interceptor aircraft designed for high-speed operations."),
    new FixedWing('B-52', 'B-52 Stratofortress', FixedWingType.Bomber, '30030100001101030000', Affiliation.Friend, 1000, 220000, "A long-range, subsonic, strategic bomber used for decades."),
    new FixedWing('B-2', 'B-2 Spirit', FixedWingType.Bomber, '30030100001101030000', Affiliation.Friend, 1000, 170000, "A stealth bomber capable of delivering both conventional and nuclear weapons."),
    new FixedWing('Su-34', 'Su-34', FixedWingType.Bomber, '30060100001101030000', Affiliation.Hostile, 1100, 45000, "A Russian twin-seat strike fighter and tactical bomber."),
    new FixedWing('Eurofighter', 'Eurofighter Typhoon', FixedWingType.Fighter, '30030100001101050000', Affiliation.Friend, 2500, 11000, "A highly agile, multirole fighter developed by European nations."),
    new FixedWing('Rafale', 'Dassault Rafale', FixedWingType.Fighter, '30030100001101050000', Affiliation.Friend, 2000, 9500, "A French twin-engine, multirole fighter aircraft."),
    new FixedWing('Su-57', 'Sukhoi Su-57', FixedWingType.Fighter, '30060100001101050000', Affiliation.Hostile, 2100, 19000, "Russia's fifth-generation stealth multirole fighter."),
    new FixedWing('Tu-160', 'Tupolev Tu-160', FixedWingType.Bomber, '30060100001101030000', Affiliation.Hostile, 2200, 275000, "A supersonic strategic bomber with variable-sweep wings."),
    new FixedWing('Tu-95', 'Tupolev Tu-95 Bear', FixedWingType.Bomber, '30060100001101030000', Affiliation.Hostile, 800, 185000, "A Soviet-era turboprop-powered strategic bomber."),
    new FixedWing('A-10', 'A-10 Thunderbolt II', FixedWingType.Attacker, '30030100001101020000', Affiliation.Friend, 700, 11300, "A ground-attack aircraft renowned for its toughness and anti-tank capabilities."),
    new FixedWing('Su-25', 'Sukhoi Su-25 Frogfoot', FixedWingType.Attacker, '30060100001101040000', Affiliation.Hostile, 800, 10500, "A Russian close air support aircraft designed for battlefield roles."),
    new FixedWing('U-2', 'Lockheed U-2', FixedWingType.Reconnaissance, '30030100001101070000', Affiliation.Friend, 500, 3000, "A high-altitude reconnaissance aircraft used by the US."),
    new FixedWing('RQ-4', 'RQ-4 Global Hawk', FixedWingType.Reconnaissance, '30030100001101070000', Affiliation.Friend, 600, 14000, "A long-endurance UAV designed for surveillance and reconnaissance."),
    new FixedWing('Tu-22MR', 'Tupolev Tu-22MR', FixedWingType.Reconnaissance, '30060100001101070000', Affiliation.Hostile, 1300, 22000, "A Russian reconnaissance version of the Tu-22 bomber."),
    new FixedWing('C-130', 'Lockheed C-130 Hercules', FixedWingType.Transport, '30030100001101090000', Affiliation.Friend, 500, 70000, "A versatile tactical airlifter used for cargo and personnel transport."),
    new FixedWing('Il-76', 'Ilyushin Il-76', FixedWingType.Transport, '30060100001101090000', Affiliation.Hostile, 800, 190000, "A Soviet-era strategic airlifter for transporting troops and cargo."),
    new FixedWing('EA-18G', 'Boeing EA-18G Growler', FixedWingType.ElectronicWarfare, '30030100001101080000', Affiliation.Friend, 2000, 14000, "An electronic warfare aircraft designed to disrupt enemy radar and communications."),
    new FixedWing('Il-22PP', 'Ilyushin Il-22PP', FixedWingType.ElectronicWarfare, '30060100001101080000', Affiliation.Hostile, 800, 60000, "A Russian electronic warfare aircraft specialized in signal disruption."),
    new FixedWing('MQ-9', 'MQ-9 Reaper', FixedWingType.UAV, '30030100001101100000', Affiliation.Friend, 400, 2500, "A remotely piloted UAV used for precision strikes and intelligence gathering."),
    new FixedWing('Orion', 'Orion UAV', FixedWingType.UAV, '30060100001101100000', Affiliation.Hostile, 500, 3200, "A Russian long-endurance UAV used for surveillance and reconnaissance."),

    new RotaryWing('AH-64', 'AH-64 Apache', RotaryWingType.Attack, '30030100001102000000', Affiliation.Friend, 300, 11000, "A highly advanced and powerful attack helicopter used for close air support."),
    new RotaryWing('EurocopterTiger', 'Eurocopter Tiger', RotaryWingType.Attack, '30030100001102000000', Affiliation.Friend, 300, 6500, "A modern European attack helicopter designed for anti-tank and combat missions."),
    new RotaryWing('Ka-52', 'Kamov Ka-52 Alligator', RotaryWingType.Attack, '30060100001102000000', Affiliation.Hostile, 300, 11500, "A Russian twin-seat attack helicopter designed for all-weather operations."),
    new RotaryWing('Mi-28', 'Mil Mi-28 Havoc', RotaryWingType.Attack, '30060100001102000000', Affiliation.Hostile, 300, 13000, "A Russian attack helicopter designed for tank destruction and battlefield support."),
    new RotaryWing('CH-47', 'Boeing CH-47 Chinook', RotaryWingType.Transport, '30030100001102000000', Affiliation.Friend, 250, 22000, "A heavy-lift tandem rotor helicopter used for troop and equipment transport."),
    new RotaryWing('UH-60', 'Sikorsky UH-60 Black Hawk', RotaryWingType.Transport, '30030100001102000000', Affiliation.Friend, 250, 11000, "A versatile medium-lift utility helicopter used in various roles."),
    new RotaryWing('Mi-17', 'Mil Mi-17 Hip', RotaryWingType.Transport, '30060100001102000000', Affiliation.Hostile, 250, 7000, "A Russian medium twin-turbine transport helicopter used for both military and civilian roles."),
    new RotaryWing('Mi-26', 'Mil Mi-26 Halo', RotaryWingType.Transport, '30060100001102000000', Affiliation.Hostile, 250, 56000, "The largest and most powerful transport helicopter in the world, used for heavy lifting."),
    new RotaryWing('OH-58', 'Bell OH-58 Kiowa', RotaryWingType.Reconnaissance, '30030100001102000000', Affiliation.Friend, 150, 3000, "A light reconnaissance helicopter used for observation and support."),
    new RotaryWing('EC-135', 'Eurocopter EC-135', RotaryWingType.Reconnaissance, '30030100001102000000', Affiliation.Friend, 200, 3000, "A lightweight twin-engine helicopter used for reconnaissance and utility roles."),
    new RotaryWing('Ka-226', 'Kamov Ka-226', RotaryWingType.Reconnaissance, '30060100001102000000', Affiliation.Hostile, 200, 2500, "A light multi-role helicopter designed for reconnaissance and transport."),
    new RotaryWing('Mi-2', 'Mil Mi-2', RotaryWingType.Reconnaissance, '30060100001102000000', Affiliation.Hostile, 150, 2200, "A small, multipurpose Soviet-designed helicopter used for recon and light transport."),

    new ArmoredFightingVehicle('M1', 'M1 Abrams', ArmoredFightingVehicleType.MainBattleTank, '30031000001204010000', Affiliation.Friend, 72, 68000, "The M1 Abrams is a third-generation American main battle tank."),
    new ArmoredFightingVehicle('T-90', 'T-90', ArmoredFightingVehicleType.MainBattleTank, '30061000001204010000', Affiliation.Hostile, 60, 46000, "The T-90 is a Russian third-generation main battle tank."),
    new ArmoredFightingVehicle('Leopard2', 'Leopard 2', ArmoredFightingVehicleType.MainBattleTank, '30031000001204010000', Affiliation.Friend, 72, 62000, "The Leopard 2 is a German main battle tank designed for high mobility."),
    new ArmoredFightingVehicle('Challenger2', 'Challenger 2', ArmoredFightingVehicleType.MainBattleTank, '30031000001204010000', Affiliation.Friend, 59, 62000, "The Challenger 2 is a British main battle tank with advanced armor."),
    new ArmoredFightingVehicle('T80', 'T-80', ArmoredFightingVehicleType.MainBattleTank, '30061000001204010000', Affiliation.Hostile, 70, 46000, "The T-80 is a Soviet-designed main battle tank with advanced technology."),
    new ArmoredFightingVehicle('BMP2', 'BMP-2', ArmoredFightingVehicleType.InfantryFightingVehicle, '10061000001211055800', Affiliation.Hostile, 70, 14000, "The BMP-2 is a Soviet infantry fighting vehicle with good firepower."),
    new ArmoredFightingVehicle('Bradley', 'M2 Bradley', ArmoredFightingVehicleType.InfantryFightingVehicle, '10031000001211055800', Affiliation.Friend, 72, 22000, "The M2 Bradley is an American infantry fighting vehicle designed for transporting troops."),
    new ArmoredFightingVehicle('Stryker', 'Stryker', ArmoredFightingVehicleType.ArmoredPersonnelCarrier, '10031000001211025800', Affiliation.Friend, 100, 15000, 'The Stryker is a family of eight-wheeled armored fighting vehicles.'),
    new ArmoredFightingVehicle('BTR80', 'BTR-80', ArmoredFightingVehicleType.ArmoredPersonnelCarrier, '10061000001211025800', Affiliation.Hostile, 70, 13000, 'The BTR-80 is a Soviet-designed armored personnel carrier with amphibious capabilities.'),
    new ArmoredFightingVehicle('AMX10RC', 'AMX-10 RC', ArmoredFightingVehicleType.LightTank, '30031000001205000019', Affiliation.Friend, 90, 14000, 'The AMX-10 RC is a French wheeled tank destroyer with high mobility.'),
    new ArmoredFightingVehicle('M113', 'M113', ArmoredFightingVehicleType.ArmoredPersonnelCarrier, '10031000001211025800', Affiliation.Friend, 65, 12000, 'The M113 is an American armored personnel carrier that has been widely used since the Vietnam War.'),
    new ArmoredFightingVehicle('Jagdpanzer', 'Jagdpanzer E-100', ArmoredFightingVehicleType.TankDestroyer, '10031000001204015800', Affiliation.Friend, 40, 80000, 'The Jagdpanzer E-100 is a German tank destroyer that was never produced in large numbers.'),
    new ArmoredFightingVehicle('SU-100', 'SU-100', ArmoredFightingVehicleType.TankDestroyer, '10061000001204015800', Affiliation.Hostile, 50, 32000, 'The SU-100 is a Soviet tank destroyer based on the T-34 chassis.'),

    new Infantry('Green Berets', 'U.S. Army Special Forces', InfantryType.SpecialForces, '30031000001217000000', Affiliation.Friend, 50, 80, "Elite special forces unit of the U.S. Army, known for unconventional warfare and counterterrorism operations."),
    new Infantry('Spetsnaz', 'Russian Special Forces', InfantryType.SpecialForces, '30061000001217000000', Affiliation.Hostile, 50, 80, "Highly trained Russian special forces unit, specializing in covert and direct action missions."),
    new Infantry('TOW Team', 'TOW Missile Anti-Tank Team', InfantryType.AntiTank, '30031000001204000000', Affiliation.Friend, 40, 100, "U.S. anti-tank team equipped with the TOW missile system, designed to destroy armored vehicles."),
    new Infantry('Kornet Team', 'Kornet Anti-Tank Missile Team', InfantryType.AntiTank, '30061000001204000000', Affiliation.Hostile, 40, 100, "Russian anti-tank team equipped with Kornet missiles, effective against tanks and armored vehicles."),
    new Infantry('82nd Airborne', '82nd Airborne Division', InfantryType.Airborne, '30031000001655000000', Affiliation.Friend, 55, 85, "A U.S. Army airborne infantry division known for rapid deployment and parachute assault capabilities."),
    new Infantry('VDV', 'Russian VDV Paratroopers', InfantryType.Airborne, '30061000001655000000', Affiliation.Hostile, 55, 85, "Elite Russian airborne forces capable of rapid deployment and airborne operations."),
    new Infantry('LRS Team', 'Long-Range Surveillance Team', InfantryType.Reconnaissance, '30031000001216000000', Affiliation.Friend, 40, 75, "U.S. reconnaissance team specialized in long-range surveillance and intelligence gathering."),
    new Infantry('Spetsnaz Recon', 'Spetsnaz Recon Team', InfantryType.Reconnaissance, '30061000001216000000', Affiliation.Hostile, 40, 75, "Russian Spetsnaz team trained in reconnaissance and intelligence gathering missions."),
];

class MilitaryEntitiesDataService
{
    private static instance: MilitaryEntitiesDataService;
    private constructor() {}

    public static getInstance(): MilitaryEntitiesDataService
    {
        if (!MilitaryEntitiesDataService.instance) MilitaryEntitiesDataService.instance = new MilitaryEntitiesDataService();
        return MilitaryEntitiesDataService.instance;
    }

    public fixedWings(affiliation: Affiliation = Affiliation.Any): FixedWing[] {
        return MilitaryEntitiesData.filter((value: MilitaryEntity): value is FixedWing => {
            return (value instanceof FixedWing) && (affiliation === Affiliation.Any ? true : affiliation === value.getAffiliation());
        });
    }

    public rotaryWings(affiliation: Affiliation = Affiliation.Any): RotaryWing[] {
        return MilitaryEntitiesData.filter((value: MilitaryEntity): value is RotaryWing => {
            return (value instanceof RotaryWing) && (affiliation === Affiliation.Any ? true : affiliation === value.getAffiliation());
        });
    }

    public armoredFightingVehicles(affiliation: Affiliation = Affiliation.Any): ArmoredFightingVehicle[] {
        return MilitaryEntitiesData.filter((value: MilitaryEntity): value is ArmoredFightingVehicle => {
            return (value instanceof ArmoredFightingVehicle) && (affiliation === Affiliation.Any ? true : affiliation === value.getAffiliation());
        });
    }

    public infantries(affiliation: Affiliation = Affiliation.Any): Infantry[] {
        return MilitaryEntitiesData.filter((value: MilitaryEntity): value is Infantry => {
            return (value instanceof Infantry) && (affiliation === Affiliation.Any ? true : affiliation === value.getAffiliation());
        });
    }

    public friendsTree(): IAssetTreeItem[] {
        return this.treeOf(Affiliation.Friend);
    }

    public hostilesTree(): IAssetTreeItem[] {
        return this.treeOf(Affiliation.Hostile);
    }

    public getEntityCopy(id: string): MilitaryEntity {
        const entity: MilitaryEntity | undefined = MilitaryEntitiesData.find((entity: MilitaryEntity) => { return entity.getEntityID() === id });

        if (!entity) throw new Error("Invalid IAssetTreeItem.");

        return entity.clone();
    }

    public getEntity(id: string): MilitaryEntity {
        const entity: MilitaryEntity | undefined = MilitaryEntitiesData.find((entity: MilitaryEntity) => { return entity.getEntityID() === id });

        if (!entity) throw new Error("Invalid IAssetTreeItem.");

        return entity
    }

    public treeOf(affiliation: Affiliation): IAssetTreeItem[] {
        const fixedWingRoot: IAssetTreeItem = {
            getAssetTreeItemID: () => 'fixed-wing-root',
            getAssetTreeLabel: () => 'Fixed Wing',
            getAssetTreeChildren: () => MilitaryEntitiesDataService.getInstance().fixedWings(affiliation),
            getAssetTreeIcon: function (): React.JSX.Element { return <ExpandMore /> },
        }

        const rotaryWingRoot: IAssetTreeItem = {
            getAssetTreeItemID: () => 'rotary-wing-root',
            getAssetTreeLabel: () => 'Rotary Wing',
            getAssetTreeChildren: () => MilitaryEntitiesDataService.getInstance().rotaryWings(affiliation),
            getAssetTreeIcon: function (): React.JSX.Element { return <ExpandMore /> },
        }

        const armoredFightingVehicleRoot: IAssetTreeItem = {
            getAssetTreeItemID: () => 'armored-fighting-vehicle-root',
            getAssetTreeLabel: () => 'Armored Fighting Vehicle',
            getAssetTreeChildren: () => MilitaryEntitiesDataService.getInstance().armoredFightingVehicles(affiliation),
            getAssetTreeIcon: function (): React.JSX.Element { return <ExpandMore /> },
        }

        const infantriesRoot: IAssetTreeItem = {
            getAssetTreeItemID: () => 'infantry-root',
            getAssetTreeLabel: () => 'Infantry',
            getAssetTreeChildren: () => MilitaryEntitiesDataService.getInstance().infantries(affiliation),
            getAssetTreeIcon: function (): React.JSX.Element { return <ExpandMore />},
        }

        return [
            fixedWingRoot,
            rotaryWingRoot,
            armoredFightingVehicleRoot,
            infantriesRoot
        ];
    }
    
}

export default MilitaryEntitiesDataService;