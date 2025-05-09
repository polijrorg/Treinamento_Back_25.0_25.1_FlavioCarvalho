class Users {
    id: string;

    name: string;

    cpf: string;

    email: string;

    created_at: Date;

    updated_at?: Date;

    constructor(
        id: string,
        name: string,
        cpf: string,
        email: string,
        created_at: Date,
        updated_at: Date
    ){
        this.id = id;
        this.name = name;
        this.cpf = cpf;
        this.email = email;
        this.created_at = new Date (created_at);
        this.updated_at = new Date (updated_at); //teste
    }
}

export default Users;
