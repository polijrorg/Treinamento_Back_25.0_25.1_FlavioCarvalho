import Pius from '../models/users';

interface ICreateDTO {
    id: string;
    text: string;
    likes: string;
    comments: string;
}


class PiusRepository{
    private pius: Pius[];

    constructor(){
        this.pius = [];
    }

    public findUserById(id: string): Pius | undefined {
        return this.pius.find((piu: Pius) => piu.id === id);
    }

    public create(data: ICreateDTO): Pius{
        const piu = new Pius(data.id, data.text, data.likes, data.comments, new Date(), new Date());
        this.pius.push(piu);
        return piu;
    }
}

export default PiusRepository;