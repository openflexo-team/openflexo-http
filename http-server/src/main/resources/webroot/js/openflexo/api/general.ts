import { Api } from "./Api"

export class Description<T> {
    constructor(
        public id: string,
        public url: string,
        public type: string
    ) {

    }

    public complete<T>(api: Api): Promise<T> {
        return api.call<T>(this.url); 
    }

}
