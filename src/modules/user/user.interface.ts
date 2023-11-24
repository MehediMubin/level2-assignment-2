export type Name = {
    firstName: string;
    middleName?: string;
    lastName: string;
};

export type Address = {
    street: string;
    city: string;
    country: string;
};

export type Order = {
    productName: string;
    price: number;
    quantity: number;
};

export interface IUser {
    userId: number;
    username: string;
    password: string;
    fullName: Name;
    age: number;
    email: string;
    isActive: true | false;
    hobbies: string[];
    address: Address;
    orders?: Order[];
}
