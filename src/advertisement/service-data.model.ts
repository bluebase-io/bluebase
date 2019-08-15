import { MinewData } from "./minew.model";
import { EddystoneData } from "./eddystone.model";

export class ServiceData {
    type?: 'minew';
    uuid: string;
    data: string;
    minew?: MinewData;
    eddystone?: EddystoneData;
}
