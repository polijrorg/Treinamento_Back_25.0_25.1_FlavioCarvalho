import Users from '../models/users';

    // interface com os dados a serem requisitados para realizar a função de criar
interface ICreateDTO {
    id: string;
    name: string;
    email: string;
    cpf: string;
}

    // interface com os dados a serem requisitados para realizar a função de atualizar
interface IUpdateUserDTO {
    id: string;
    data: {
        name: string;
        email: string;
    }
}

    // Classe de repositório de usuários:
class UsersRepository{
    private users: Users[];

    constructor(){
        this.users = [];
    }
    //MÉTODOS USADOS PARA CRIAÇÃO DE USUÁRIO:

    // Método para encontrar um usuário pelo CPF, retornando-o se existir
    public findUserByCPF(cpf: string): Users | undefined {
        return this.users.find((user: Users) => user.cpf === cpf);
    }
    
    // Método para encontrar um usuário pelo e-mail, retornando-o se existir
    public findUserByEmail(email: string): Users | undefined {
        return this.users.find((user: Users) => user.email === email);
    }

    // Método para criar um usuário, recebendo os dados do usuário e retornando o usuário criado
    public create(data: ICreateDTO): Users{
        const user = new Users(data.id, data.name, data.cpf, data.email, new Date(), new Date());
        this.users.push(user);
        return user;
    }

    //MÉTODOS USADOS PARA OBTENÇÃO DE USUÁRIO:

    // Método para obter todos os usuários, retornando um array de usuários
    public getAll(): Users[]{
        return this.users;
    }

    // Método para obter um usuário pelo id, retornando o usuário ou undefined
    public getById(id: string): Users | undefined {
        return this.users.find((user: Users) => user.id === id);
    }

    //MÉTODOS USADOS PARA ATUALIZAR O USUÁRIO:

    //Método para atualizar um usuário, recebendo os dados do usuário e retornando o usuário atualizado
    public update(data: IUpdateUserDTO): Users | undefined {
        const index = this.users.findIndex((user: Users) => user.id === data.id);

        return (this.users[index] = { ...this.users[index], ...data.data, updated_at: new Date() });
    }

    //MÉTODOS USADOS PARA DELEÇÃO DE USUÁRIO:

    //Método para achar o index de um usuário
    public findIndexById(id: string): number {
        const index = this.users.findIndex((user: Users) => user.id === id);

        return index;

    }

    //Método para deletear um usuário a partir de seu index, retornando nada
    public delete(index: number): void {
        this.users.splice(index, 1);
    }
}

export default UsersRepository;