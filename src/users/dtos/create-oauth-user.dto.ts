export class CreateOAuthUserDto {
    constructor(init?: Partial<CreateOAuthUserDto>) {
        Object.assign(this, init);
    }

    provider: string;

    providerId: string;
}
