//import Users from '../models/users';

import PiusRepository from '../repositories/PiusRepository';

//interface com os dados a serem requisitados para o serviço
interface IRequest {
    id: string;
}

class DeletePiuService {
    private piusRepository: PiusRepository;

    constructor(piusRepository: PiusRepository) {
        this.piusRepository = piusRepository;
    }

    public execute(data: IRequest){

        //Verifica se o piu existe no repositorio
        const piuWithId = this.piusRepository.findPiuById(data.id);

        if(!piuWithId){
            throw new Error('Esse piu não existe');
        }

        //Busca o index do piu no array
        const index = this.piusRepository.findIndexById(data.id);

        //Deleta o piu
        this.piusRepository.delete(index);

        return piuWithId;
    }
}
export default DeletePiuService;