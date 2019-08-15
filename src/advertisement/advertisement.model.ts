import { MinewData } from "./minew.model";
import { EddystoneData } from "./eddystone.model";
import { ServiceData } from "./service-data.entity";
import { ManufacturerData } from "./manufacturer-data.model";

export class Advertisement {
    flags?: [string];
    pduData?: string;
    minew?: MinewData;
    rssi: number;
    mac?: string;
    id: string;
    name?: string;
    cnc?: string;
    gatewayId: string;
    serviceData: [ServiceData];
    manufacturerData: ManufacturerData;
}
