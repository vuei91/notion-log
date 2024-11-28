import axios from "axios";

interface ViewsDto {
  notionId: number;
}

export const getCountViews = async (notionId: number) => {
  const { data } = await axios.get(`/api/views?notion_id=${notionId}`);
  return data;
};

export const increamentViews = async (viewDto: ViewsDto) => {
  const { data } = await axios.post(`/api/views`, viewDto);
  return data;
};
