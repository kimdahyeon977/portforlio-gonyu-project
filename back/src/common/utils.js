const util = {};

util.hasPermission = function (owner, requester) {
  if (owner != requester.id) {
    if (requester.role == "admin") {
      return;
    }
    throw new Error("no Permission!");
  }
};


util.isAdmin = function (requester) {
  //관리자만 볼수 있는 모든 유저의 플젝정보보기
  if (requester != "admin") {
    throw new Error("admin 유저만 모든 프로젝트를 볼 수 있습니다.");
  }
};

util.isRecruter = function (requesterRole) {
  if (requesterRole !== "recruter") {
    throw new Error("채용관계자만 좋아요를 누를수있습니다!");
  }
};
export { util };
