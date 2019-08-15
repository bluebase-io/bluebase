export class EddystoneData {
    type: 'eddystone';
    frameType: 'URL' | 'TLM' | 'UID' | 'EID';
    version: number;
    temperature?: number;
    batteryVoltage?: number;
    batteryVoltageString?: string;
    instance?: string;
    uid?: string;
    namespace?: string;
}
