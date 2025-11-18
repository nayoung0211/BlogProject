import ResponseDto from "../response.dto";

export default interface GetRelatedBoardListResponseDto extends ResponseDto {
  relationWordList: string[];
}