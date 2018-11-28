export class User {
    constructor(
        public password: string,
        public username: string,
        public power: number,
        public isSignedin: Boolean
        ) {}
}
