import { randomUUID } from 'crypto';

import { Router} from 'express';

import UsersRepository from '../repositories/UsersRepository';
import CreateUserService from '../services/CreateUsersService';

const usersRouter = Router();

export const usersRepository = new UsersRepository();

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

export default usersRouter;