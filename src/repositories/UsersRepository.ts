import Users from '../models/users';

interface ICreateDTO {
    id: string;
    name: string;
    email: string;
    cpf: string;
}

class UsersRepository{
    private users: Users[];

    constructor(){
        this.users = [];
    }

    public findUserByCPF(cpf: string): Users | undefined {
        return this.users.find((user: Users) => user.cpf === cpf);
    }
    
    public findUserByEmail(email: string): Users | undefined {
        return this.users.find((user: Users) => user.email === email);
    }

    public create(data: ICreateDTO): Users{
        const user = new Users(data.id, data.name, data.cpf, data.email, new Date(), new Date());
        this.users.push(user);
        return user;
    }
}

export default UsersRepository;