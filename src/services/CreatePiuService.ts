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
        // Verifica se o tamanho está entre 1 e 140
        if( data.text.length > 140 ){
            throw new Error('Tamanho do texto muito grande');
        };

        // Verifica se o texto esta vazio 
        if( data.text.length === 0 ){
            throw new Error('Texto vazio');
        };

        //Verifica se já existe um piu com o id
        const userWithId = this.piusRepository.findPiuById(data.id);
        if(userWithId){
            throw new Error('Já existe um piu com esse id');
        }

        //Cria o piu
        const piu = this.piusRepository.create(data);

        return piu;
    }
}
export default CreatePiuService;