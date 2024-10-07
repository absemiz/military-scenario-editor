import { Affiliation } from "../types/entity"

export const AffiliationNameTable: Record<Affiliation, string> = {
    [Affiliation.Friend]: 'Blueforce',
    [Affiliation.Hostile]: 'Redforce',
    [Affiliation.Any]: 'Any',
    [Affiliation.Unknown]: 'Unknown',
    [Affiliation.Neutral]: 'Neutral'
}