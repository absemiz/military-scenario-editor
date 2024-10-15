import React from "react";
import ms from "milsymbol";
import { Icon, IconOptions } from "leaflet";

class MilitarySymbolFactory
{
    private static instance: MilitarySymbolFactory;

    private defaultFriendSymbolComponent: React.JSX.Element;
    private defaultHostileSymbolComponent: React.JSX.Element;
    private defaultNeutralSymbolComponent: React.JSX.Element;
    private defaultUnknownSymbolComponent: React.JSX.Element;

    private constructor () {
        this.defaultFriendSymbolComponent  = this.createReactComponent('30031000000000000000', 24);
        this.defaultHostileSymbolComponent = this.createReactComponent('30061000000000000000', 24);
        this.defaultNeutralSymbolComponent = this.createReactComponent('30041000000000000000', 24);
        this.defaultUnknownSymbolComponent = this.createReactComponent('30011000000000000000', 24);
    }

    public static getInstance(): MilitarySymbolFactory
    {
        if (!MilitarySymbolFactory.instance) this.instance = new MilitarySymbolFactory();

        return this.instance;
    }

    public getDefaultFriendSymbol(): React.JSX.Element {
        return this.defaultFriendSymbolComponent;
    }
    public getDefaultHostileSymbol(): React.JSX.Element {
        return this.defaultHostileSymbolComponent;
    } 
    public getDefaultNeutralSymbol(): React.JSX.Element {
        return this.defaultNeutralSymbolComponent;
    } 
    public getDefaultUnknownSymbol(): React.JSX.Element {
        return this.defaultUnknownSymbolComponent;
    } 

    public createLeafletIcon(symbolIdentificationCode: string, size: number = 36): Icon {
        const leafletIconOptions: IconOptions = {
            iconUrl: this.createSVGSymbolURL(symbolIdentificationCode, size),
            iconSize: [size, size]
        }

        const leafletIcon: Icon = new Icon(leafletIconOptions);
        return leafletIcon;
    }

    public createReactComponent(symbolicIdentificationCode: string, size: number = 32): React.JSX.Element {
        return <div dangerouslySetInnerHTML={{__html: this.createSVGSymbol(symbolicIdentificationCode, size)}}></div>;
    }

    private createSVGSymbol(symbolIdentificationCode: string, size: number = 32): string {
        const symbol: ms.Symbol = new ms.Symbol(symbolIdentificationCode, { size: size });
        const asSVG: string = symbol.asSVG();
        return asSVG;
    }

    private createSVGSymbolURL(symbolicIdentificationCode: string, size: number = 32): string {
        const asSVG: string = this.createSVGSymbol(symbolicIdentificationCode, size);
        const encodedSVG: string = btoa(asSVG);
        const svgURL: string = `data:image/svg+xml;charset=utf-8;base64,${encodedSVG}`;
        return svgURL;
    }
}

export default MilitarySymbolFactory;