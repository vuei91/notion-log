import axios from "axios";

interface LikesDto {
  notionId: number;
  userId: string;
}

export const getCountLikes = async (likesDto: LikesDto) => {
  const { data } = await axios.get(
    `/api/likes?notion_id=${likesDto.notionId}&user_id=${likesDto.userId}`,
  );
  return data;
};

export const increamentLikes = async (likesDto: LikesDto) => {
  const { data } = await axios.post(`/api/likes`, likesDto);
  return data;
};

export const decreamentLikes = async (likesDto: LikesDto) => {
  const { data } = await axios.delete(`/api/likes`, { data: likesDto });
  return data;
};

export const clickLikes = async (likesDto: LikesDto) => {
  const data = await getCountLikes(likesDto);
  if (data.count > 0) {
    await decreamentLikes(likesDto);
  } else {
    await increamentLikes(likesDto);
  }
};
