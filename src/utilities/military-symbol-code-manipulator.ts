import { Affiliation } from "../types/entity";
class MilitarySymbolCodeManipulator
{
    private static instance: MilitarySymbolCodeManipulator;
    private static affiliationCodePosition = 3;


    private constructor () {};

    public static getInstance(): MilitarySymbolCodeManipulator {
        if (!MilitarySymbolCodeManipulator.instance) MilitarySymbolCodeManipulator.instance = new MilitarySymbolCodeManipulator();

        return MilitarySymbolCodeManipulator.instance;
    }

    public setAffiliation(symbolicIdentificationCode: string, newAffiliation: Affiliation): string {
        const codeArray: string[] = symbolicIdentificationCode.split('');
        codeArray[MilitarySymbolCodeManipulator.affiliationCodePosition] = newAffiliation.toString();
        return codeArray.join('');
    }
}

export default MilitarySymbolCodeManipulator;