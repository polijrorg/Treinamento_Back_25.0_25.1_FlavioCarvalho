//import Users from '../models/users';

import PiuRepository from '../repositories/PiusRepository';

// interface com os dados a serem requisitados para o serviço
interface IRequest {
    id: string;
}

//Classe de leitura de um único piu
class GetPiuService {
    private piusRepository: PiuRepository;

    constructor(piusRepository: PiuRepository) {
        this.piusRepository = piusRepository;
    }

    public execute(data: IRequest){

        //Pega o usuario do array a partir do id
        const user = this.piusRepository.findPiuById(data.id);

        //Manda mensagem de erro se não existir piu
        if(!user){
            throw new Error('Esse piu não existe');
        }
        return user;
    }
}
export default GetPiuService;