import ResponseDto from "../response.dto";
import {BoardListItem} from "../../../types/interface";

export default interface GetUserBoardListResponseDTO extends ResponseDto{
  userBoardList: BoardListItem[];
}