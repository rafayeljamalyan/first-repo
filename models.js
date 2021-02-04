class Post{
    constructor(_userId,_title,_body) {
        this.id = ++Post.verjinPostiId;
        this.title = _title;
        this.body = _body;
        this.userId = _userId;
    }

}
Post.verjinPostiId = 21;

function Comments(_postId,_name,_email,_body){
    this.postId = _postId;
    this.id = ++Comments.verJinCommentId;
    this.name = _name;
    this.email = _email;
    this.body = _body;
}
Comments.verJinCommentId = 27;