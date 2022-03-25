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
    async findByUserId({ adminId, userId }) {
        const like = await likeModel.findOne({ adminId, userId });
        return like;
    }
  
    async findByUserIdCount({ userId }) {
      const likes = await likeModel.find({ userId }).count();
      return likes;
    }
  
    async deleteById({ adminId, userId }) {
      const deleteLike = await likeModel.deleteOne({ adminId, userId });
      return deleteLike;
    }
  }
  const Like =  new like()
  export { Like };
  
