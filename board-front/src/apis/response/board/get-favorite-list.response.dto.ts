import ResponseDto from "../response.dto";
import {FavoriteListItem} from "../../../types/interface";

export default interface GetFavoriteListResponseDTO extends ResponseDto{
  favoriteList: FavoriteListItem[];
}