export interface POISearchRequest {
    query: string;
    ext: string;
    key: string;
    //optional parameters
    limit?: string;
    latitude?: string;
    longitude?: string;
}