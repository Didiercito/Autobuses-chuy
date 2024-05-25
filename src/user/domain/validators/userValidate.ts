import { validate } from "class-validator";
import { UserCredentials } from "../entities/userCredentials";

export class UserValidator {
    public credentials : UserCredentials;
    public listErrors: any [];


    constructor(credentials:UserCredentials){
        this.credentials = credentials;
        this.listErrors = []
    }

    public async invalidHasErrors() {
        await this.validate();

        if (!this.foundedErrors()) {
            return;
        }

        throw {
            http_status: 422,
            validations: this.errors()
        };
    }

    protected async validate() {
        this.listErrors = await validate(this.credentials);
    }

    protected errors(): any[] {
        return this.listErrors.map((error) => {
            let property = error.property;
            let errorMessages = Object.values(error.constraints);
            return {
                property,
                errorMessages
            };
        });
    }

    protected foundedErrors(): boolean {
        return this.listErrors.length > 0;
    }
}