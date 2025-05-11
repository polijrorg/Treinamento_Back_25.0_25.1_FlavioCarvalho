import { randomUUID } from 'crypto';

import { Router} from 'express';

import PiusRepository from '../repositories/PiusRepository';
import CreatePiuService from '../services/CreatePiuService';
import DeletePiuService from '../services/DeletePiuService';

const piusRouter = Router();

export const piusRepository = new PiusRepository();

// Rota de criação de piu:
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

// Rota de obtenção de todos os pius:
// - chama a função de obter todos os pius do repositorio
// - retorna os usuarios obtidos
piusRouter.get('/getAll', (req, res) => {
    try{
        const pius = piusRepository.getAll();    
        return res.status(200).json(pius);
    } catch(err: unknown){
        return res.status(400).json({ error: (err as Error).message });
    };
});

// Rota de deleção de piu:
// - espera receber o id do piu a ser deletado
// - chama o serviço de deleção de usuario
// - manda executar o serviço, retornando o usuario deletado
// - verifica se ouve erro no processo, jogados no service
piusRouter.delete('/:id', (req, res) => {
    try{
        const { id } = req.params;

        const DeletePiu = new DeletePiuService(piusRepository);

        const deleted_piu = DeletePiu.execute({ id });

        return res.status(200).json(deleted_piu);
    } catch(err: unknown){
        return res.status(400).json({ error: (err as Error).message });
    };
});

export default piusRouter;