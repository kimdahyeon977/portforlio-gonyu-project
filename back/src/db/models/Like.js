import { likeModel } from "../schemas/like";


class like {
    async create({ newLike }) {
      const likeUp = await likeModel.create(newLike);
      return likeUp;
    }
  
    async findByAdminId({ adminId }) {
      const like = await likeModel.find({ adminId });
      return like;
    }
  
    async findByUserIdCount({ userId }) {
      const likes = await likeModel.find({ userId }).count();
      return likes;
    }
  
    async deleteByid({ adminId }) {
      const deleteLike = await likeModel.deleteOne({ adminId });
      return deleteLike;
    }
  }
  const Like =  new like()
  export { Like };
  