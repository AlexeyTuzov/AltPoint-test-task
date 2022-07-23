interface Client {
    name: string;
    surname: string;
    patronymic: string;
    dob: string;
    passport: string;
    livingAddress: string;
    regAddress: string;
    curWorkExp: number;
    typeEducation: string;
    monIncome: number;
    monExpenses: number;
}

export default interface ClientCreationAttr extends Client {
    spouse?: Client;
}
