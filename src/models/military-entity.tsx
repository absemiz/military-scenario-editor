import React from "react";

import { IMilitaryEntity, Affiliation } from "../types/entity";
import { IMapRenderable } from "../types/map";
import { IAssetTreeItem } from "../types/asset-browser";

import EntityView from "../components/entity-view/EntityView";
import MilitarySymbolFactory from "../utilities/military-symbol-factory";
import MilitarySymbolCodeManipulator from "../utilities/military-symbol-code-manipulator";

class MilitaryEntity implements IMilitaryEntity, IMapRenderable, IAssetTreeItem {
    private static callsignCounter: number = -55;

    id: string;
    label: string;
    name: string;
    position: [number, number];
    affiliation: Affiliation;
    symbolicIdentificationCode: string;
    description?: string;
    mapIndex: number = -1;
    callsign: string;
    
    treeChildren: IAssetTreeItem[] = [];

    constructor(
        id: string, 
        name: string,
        symbolicIdentificationCode: string,
        position: [number, number] = [0, 0], 
        affiliation: Affiliation = Affiliation.Friend,
        description?: string
    ) {
        this.id = id;
        this.name = name;
        this.label = this.name;
        this.position = position;
        this.affiliation = affiliation;
        this.symbolicIdentificationCode = symbolicIdentificationCode;
        this.description = description
        this.callsign = `${this.label} | ${MilitaryEntity.callsignCounter.toString()}`

        this.treeIcon = this.treeIcon.bind(this);

        MilitaryEntity.callsignCounter++;
    }

    public clone(): MilitaryEntity {
        return new MilitaryEntity(
            this.id,
            this.name,
            this.symbolicIdentificationCode,
            [...this.position],
            this.affiliation
        );
    }

    public setPosition(newPosition: [number, number]): void {
        this.position = newPosition;
    }

    public changeAffiliation(newAffiliation: Affiliation): void {
        this.affiliation = newAffiliation;
        this.symbolicIdentificationCode = MilitarySymbolCodeManipulator.getInstance().setAffiliation(this.symbolicIdentificationCode, newAffiliation);
    }

    public mapID(index: number | undefined): string {
        if (typeof index === 'number') {
            this.mapIndex = index;
        }
        return `${this.id}-${this.mapIndex.toString()}`;
    }

    public setCallsign(): void {

    }

    public getCallsign(): string {
        return this.callsign;
    }

    public mapPosition(): [number, number] {
        return this.position;
    }

    public mapComponent(): React.JSX.Element {
        return <EntityView entity={this} />;
    }

    public treeIcon(): React.JSX.Element {
        return MilitarySymbolFactory.getInstance().createReactComponent(this.symbolicIdentificationCode, 24);
    }
}

export default MilitaryEntity;