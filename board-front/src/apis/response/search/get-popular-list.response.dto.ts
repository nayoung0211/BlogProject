import ResponseDto from "../response.dto";
import {BoardListItem} from "../../../types/interface";

export default interface GetPopularListResponseDto extends ResponseDto {
  popularWordList: string[];
}