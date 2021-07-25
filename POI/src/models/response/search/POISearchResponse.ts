// Models
import { POIEntity } from '../general/POIEntity';
import { POIAddressEntity } from '../general/POIAddressEntity';

export interface POISearchResponse {
    id?: string;
    dist?: number;
    score?: number;
    poiDetails?: POIEntity;
    poiAddress?: POIAddressEntity;
}