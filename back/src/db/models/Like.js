import { likeModel } from "../schemas/like";
class like {
  async create({ newLike }) {
    const likeUp = await likeModel.create(newLike);
    return likeUp;
  }

  async findByCompanyId({ userId, companyId }) {
    const like = await likeModel.findOne({ userId, companyId });
    return like;
  }

  async findByUserIdCount({ userId }) {
    const likes = await likeModel.find({ userId }).count();
    return likes;
  }

  async deleteById({ userId, companyId }) {
    const deleteLike = await likeModel.deleteOne({ userId, companyId });
    return deleteLike;
  }
}
const Like = new like();
export { Like };
