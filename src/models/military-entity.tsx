import React from "react";

import { IEntityPosition, IEntityPlatform, IMilitaryEntity, Affiliation } from "../types/entity";
import { IMapRenderable } from "../types/map";
import { IAssetTreeItem } from "../types/asset-browser";

import EntityView from "../components/entity-view/EntityView";
import MilitarySymbolFactory from "../utilities/military-symbol-factory";
import MilitarySymbolCodeManipulator from "../utilities/military-symbol-code-manipulator";
import { ISceneHierarchyTreeItem } from "../types/scene-hierarchy";

abstract class MilitaryEntity implements IEntityPosition, IEntityPlatform, IMilitaryEntity, IMapRenderable, IAssetTreeItem, ISceneHierarchyTreeItem {
    private static callsignCounter: number = -55;

    protected mID: string;
    protected mName: string;
    protected mLabel: string;
    protected mCallsign: string;

    protected mLatitude: number = 0;
    protected mLongitude: number = 0;
    protected mAltitude: number = 0;
    protected mHeading: number = 0;
    protected mPitch: number = 0
    protected mRoll: number = 0;

    protected mMaxSpeed: number = 0;
    protected mFuel: number = 100;
    protected mWeight: number = 0;
    
    protected mAffiliation: Affiliation;
    protected mSymbolicIdentificationCode: string;
    protected mDescription?: string;
    protected mMapIndex: number = -1;

    constructor(
        id: string, 
        name: string,
        symbolicIdentificationCode: string,
        affiliation: Affiliation = Affiliation.Friend,
        maxSpeed: number = 0,
        weight: number = 0,
        description?: string,
    ) 
    {
        this.mID = id;
        this.mName = name;
        this.mLabel = this.mName;

        this.mMaxSpeed = maxSpeed;
        this.mWeight = weight;

        this.mAffiliation = affiliation;
        this.mSymbolicIdentificationCode = symbolicIdentificationCode;
        this.mDescription = description
        this.mCallsign = `${this.mLabel} | ${MilitaryEntity.callsignCounter.toString()}`

        this.getAssetTreeIcon = this.getAssetTreeIcon.bind(this);

        MilitaryEntity.callsignCounter++;
    }

    public getHierarchyTreeItemID(): string
    {
        return this.mapID();
    }

    public getHierarchyTreeLabel(): string
    {
        return this.getEntityCallsign();
    }

    public getHierarchyTreeChildren(): ISceneHierarchyTreeItem[]
    {
        return [];
    }

    public getHierarchyTreeIcon(): React.JSX.Element
    {
        return this.getAssetTreeIcon();
    }

    public getAffiliation(): Affiliation
    {
        return this.mAffiliation;
    }

    public getSymbolicIdentificationCode(): string
    {
        return this.mSymbolicIdentificationCode;
    }

    public getEntityID(): string
    {
        return this.mID;
    }

    public getEntityName(): string
    {
        return this.mName;
    }

    public getEntityCallsign: (() => string) = () => { return this.mCallsign ?? this.mName; }

    public getLatitude(): number
    {
        return this.mLatitude;
    }

    public getLongitude(): number
    {
        return this.mLongitude;
    }

    public getAltitude(): number
    {
        return this.mAltitude;
    }

    public getHeading(): number
    {
        return this.mHeading;
    }

    public getPitch(): number
    {
        return this.mPitch;
    }

    public getRoll(): number
    {
        return this.mRoll;
    }

    public setLatitude(newLatitude: number): void
    {
        this.mLatitude = newLatitude;
    }

    public setLongitude(newLongitude: number): void
    {
        this.mLongitude = newLongitude;
    }

    public setAltitude(newAltitude: number): void
    {
        this.mAltitude = newAltitude;
    }

    public setHeading(newHeading: number): void
    {
        this.mHeading = newHeading;
    }

    public getAssetTreeItemID(): string
    {
        return this.mID;
    }

    public getAssetTreeLabel(): string
    {
        return this.mLabel;
    }

    public getAssetTreeChildren(): IAssetTreeItem[]
    {
        return [];
    }

    public getDescription?: (() => string) | undefined = () => { return this.mDescription ?? 'No description available'};

    public getAssetTreeIcon(): React.JSX.Element 
    {
        return MilitarySymbolFactory.getInstance().createReactComponent(this.mSymbolicIdentificationCode, 24);
    }

    public abstract clone(): MilitaryEntity;

    public changeAffiliation(newAffiliation: Affiliation): void 
    {
        this.mAffiliation = newAffiliation;
        this.mSymbolicIdentificationCode = MilitarySymbolCodeManipulator.getInstance().setAffiliation(this.mSymbolicIdentificationCode, newAffiliation);
    }

    public mapID(index?: number): string 
    {
        if (index !== undefined)
        {
            this.mMapIndex = index;
        }
        return `${this.mID}-${this.mMapIndex.toString()}`;
    }

    public mapPosition(): [number, number] 
    {
        return [this.mLatitude, this.mLongitude];
    }

    public mapComponent(): React.JSX.Element 
    {
        return <EntityView entity={this} />;
    }

    public abstract getFuel?: (() => number) | undefined;
    
    public getMaxSpeed(): number
    {
        return this.mMaxSpeed;
    }
    public getWeight(): number
    {
        return this.mWeight;
    }

    public abstract setFuel?: ((newFuel: number) => void) | undefined;

    public abstract getTypeName?: (() => string) | undefined;
    public abstract getSubTypeName?: (() => string) | undefined;
}

export default MilitaryEntity;