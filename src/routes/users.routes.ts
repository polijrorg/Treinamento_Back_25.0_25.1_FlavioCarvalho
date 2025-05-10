import { randomUUID } from 'crypto';

import { Router} from 'express';

import UsersRepository from '../repositories/UsersRepository';
import CreateUserService from '../services/CreateUsersService';
import DeleteUserService from '../services/DeleteUserService';
import GetUserService from '../services/GetUserService';
import UpdateUserService from '../services/UpdateUserService'

const usersRouter = Router();

export const usersRepository = new UsersRepository();


// Rota de criação de usuario:
// - espera receber os dados para criação
// - verifica se todos os dados foram enviados e envia codigo de erro caso exista
// - chama o serviço de criação de usuario
// - retorna o usuario criado e codigo 
// - verifica se ouve erro no processo
usersRouter.post('/', (req, res) => {
    try{
        const { name, email, cpf} = req.body;

        if( !name || !email || !cpf){
            return res.status(400).json({ error: 'Por favor, envie todas as informações'});
        }

        const createUser = new CreateUserService(usersRepository);

        const user = createUser.execute({
            id: randomUUID(),
            name, 
            email,
            cpf
        });

        return res.status(201).json(user);
    } catch(err: unknown){
        return res.status(400).json({ error: (err as Error).message });
    }
});

// Rota de obtenção de todos os usuarios:
// - chama a função de obter todos os usuarios do repositorio
// - retorna os usuarios obtidos
usersRouter.get('/getAll', (req, res) => {
    const users = usersRepository.getAll();
    
    return res.json(users);
});

// Rota de obtenção de um usuario:
// - espera receber o id do usuario na url
// - cria uma variavel chamando o serviço de obter um usuario
// - manda executar o serviço, retornando o usuario encontrado a partir do id
// - retorna o usuario encontrado
// - verifica se ouve erro no processo, jogados no service
usersRouter.get('/:id', (req, res) => {
    try{
        const { id } = req.params;
        const GetUser = new GetUserService(usersRepository);
        const user = GetUser.execute({ id });
        return res.json(user);

    } catch(err: unknown){
        return res.status(404).json({ error: (err as Error).message });
    };    
});

// Rota de atualização de um usuario:
// - espera receber o id do usuario a ser atualizado
// - espera receber os dados do usuario a serem atualizados
// - verifica se todos os dados foram enviados e envia codigo de erro caso exista
// - chama o serviço de atualização de usuario
// - manda executar o serviço, retornando o usuario atualizado
// - verifica se ouve erro no processo, jogados no service
usersRouter.put('/:id', (req, res) => {
    try{
        const { id } = req.params;
        const { name, email } = req.body; 

        if( !name || !email ){
            return res.status(400).json({ error: 'Por favor, envie todas as informações'});
        }
    
        const UpdateUser = new UpdateUserService(usersRepository);

        const updated_user = UpdateUser.execute({
            id,
            data:{
            name,
            email,
            }
        });

        return res.status(200).json(updated_user);

    } catch(err: unknown){
        return res.status(400).json({ error: (err as Error).message });
    };
    
});

// Rota de deleção de usuário:
// - espera receber o id do usuario a ser deletado
// - chama o serviço de deleção de usuario
// - manda executar o serviço, retornando o usuario deletado
// - verifica se ouve erro no processo, jogados no service
usersRouter.delete('/:id', (req, res) => {
    try{
        const { id } = req.params;

        const DeleteUser = new DeleteUserService(usersRepository);

        const deleted_user = DeleteUser.execute({ id });

        return res.status(200).json(deleted_user);
    } catch(err: unknown){
        return res.status(400).json({ error: (err as Error).message });
    };
});

export default usersRouter;