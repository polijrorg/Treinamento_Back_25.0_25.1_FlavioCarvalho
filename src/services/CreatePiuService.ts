//import Users from '../models/users';

import PiusRepository from '../repositories/PiusRepository';

interface IRequest {
    id: string;
    text: string;
    likes: string;
    comments: string;
}


class CreatePiuService {
    private piusRepository: PiusRepository;

    constructor(piusRepository: PiusRepository) {
        this.piusRepository = piusRepository;
    }

    public execute(data: IRequest){
        if( data.text.length > 140 ){
            throw new Error('Tamanho do texto muito grande');
        };

        if( data.text.length === 0 ){
            throw new Error('Texto vazio');
        };

        const userWithId = this.piusRepository.findUserById(data.id);
        if(userWithId){
            throw new Error('Já existe um usuário com esse id');
        }
        const piu = this.piusRepository.create(data);

        return piu;
    }
}
export default CreatePiuService;