class Utils {
  editPermission(requester, owner) {
    if (requester !== owner) throw new Error("수정할 권한이 없습니다.");
  }

  deletePermission(requester, owner) {
    if (requester !== owner) throw new Error("삭제할 권한이 없습니다.");
  }
}

const utils = new Utils();
export { utils };
