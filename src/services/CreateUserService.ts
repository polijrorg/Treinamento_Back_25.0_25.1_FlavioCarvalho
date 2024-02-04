import Users from "../models/users";
import usersRepository from "../repositories/usersRepository";

interface IRequest{
    id: string;
    name: string;
    email: string;
    cpf: string;
}

class CreateUserService {
    private usersRepository: usersRepository;

    constructor(usersRepository: usersRepository){
        this.usersRepository = usersRepository;
    }

    public execute(data: IRequest){
        const userwithCPF = this.usersRepository.findUserByCPF(data.cpf);
        if(userwithCPF) { throw Error('Já existe um usuário com esse cpf');}

        const userwithemail = this.usersRepository.findUserByemail(data.email);
        if(userwithemail) { throw Error('Já existe um usuário com esse email');}

        const user = this.usersRepository.create(data);

        return user;
    }
}

export default CreateUserService;