export class User {
    constructor (public email: string,
                 public  name: string,
                 private password: string) {}

     matches(another: User): boolean {
        return another !== undefined &&
            another.email === this.email &&
            another.password === this.password;
     }
}

export const users: {[key: string]: User} = {
    'victor@gmail.com': new User('victor@gmail.com', 'Victor', 'victor123'),
    'hugo@gmail.com': new User('hugo@gmail.com', 'hugo', 'hugo123'),
}
