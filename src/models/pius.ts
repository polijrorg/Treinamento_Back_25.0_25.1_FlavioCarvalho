class Pius {
    id: string;

    text: string;

    likes: string;

    comments: string;

    created_at: Date;

    edited_at?: Date;

    constructor(
        id: string,
        text: string,
        likes: string,
        comments: string,
        created_at: Date,
        edited_at: Date
    ){
        this.id = id;
        this.text = text;
        this.likes = likes;
        this.comments = comments;
        this.created_at = new Date (created_at);
        this.edited_at = new Date (edited_at); //teste
    }
}

export default Pius;
