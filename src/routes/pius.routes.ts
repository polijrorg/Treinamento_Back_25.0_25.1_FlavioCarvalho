import { randomUUID } from 'crypto';

import { Router} from 'express';

import PiusRepository from '../repositories/PiusRepository';
import CreatePiuService from '../services/CreatePiuService';
//import CreateUserService from '../services/CreateUsersService';
//import DeleteUserService from '../services/DeleteUserService';

const piusRouter = Router();

export const piusRepository = new PiusRepository();


// Rota de criação de usuario:
// - espera receber os dados para criação
// - verifica se todos os dados foram enviados e envia codigo de erro caso exista
// - chama o serviço de criação de usuario
// - retorna o usuario criado e codigo 
// - verifica se ouve erro no processo
piusRouter.post('/', (req, res) => {
    try{
        const { text, likes, comments} = req.body;

        if( !text || !likes || !comments){
            return res.status(200).json({ error: 'Por favor, envie todas as informações'});
        }

        const createPiu = new CreatePiuService(piusRepository);

        const piu = createPiu.execute({
            id: randomUUID(),
            text, 
            likes,
            comments
        });

        return res.status(200).json(piu);
    } catch(err: unknown){
        return res.status(400).json({ error: (err as Error).message });
    }
});

// Rota de obtenção de todos os usuarios:
// - chama a função de obter todos os usuarios do repositorio
// - retorna os usuarios obtidos
piusRouter.get('/getAll', (req, res) => {
    const users = piusRepository.getAll();
    
    return res.json(users);
});

// Rota de deleção de usuário:
// - espera receber o id do usuario a ser deletado
// - chama o serviço de deleção de usuario
// - manda executar o serviço, retornando o usuario deletado
// - verifica se ouve erro no processo, jogados no service
piusRouter.delete('/:id', (req, res) => {
    try{
        const { id } = req.params;

        const DeleteUser = new DeleteUserService(piusRepository);

        const deleted_user = DeleteUser.execute({ id });

        return res.status(200).json(deleted_user);
    } catch(err: unknown){
        return res.status(400).json({ error: (err as Error).message });
    };
});

export default piusRouter;