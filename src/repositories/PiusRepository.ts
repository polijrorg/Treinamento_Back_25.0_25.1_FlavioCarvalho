import Pius from '../models/users';

//Interface com o requisitado para criar o piu
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

    //MÉTODOS PARA CRIAR PIU:

    //Método que procura o piu na array a partir do seu id
    public findPiuById(id: string): Pius | undefined {
        return this.pius.find((piu: Pius) => piu.id === id);
    }

    //Método que cria o Piu
    public create(data: ICreateDTO): Pius{
        const piu = new Pius(data.id, data.text, data.likes, data.comments, new Date(), new Date());
        this.pius.push(piu);
        return piu;
    }

    //MÉTODOS PARA OBTENÇÃO DE PIU:

    //Método para obter todos os pius
    public getAll(): Pius[]{
        return this.pius;
    }

    //MÉTODOS PARA DELEÇÃO DE PIU:

    //Método para achar o index de um piu a partir de seu id
    public findIndexById(id: string): number {
        const index = this.pius.findIndex((piu: Pius) => piu.id === id);

        return index;
    }

    //Método para deletar um piu
    public delete(index: number): void {
        this.pius.splice(index, 1);
    }
}

export default PiusRepository;