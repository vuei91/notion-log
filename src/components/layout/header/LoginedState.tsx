import AvartarL from "@/components/common/AvartarL";
import { GoogleUser } from "@/types";
import { insertNotion, logoutGoogle, removeNotion } from "@/utils/supabase";
import axios from "axios";

const LoginedState = ({ user }: { user: GoogleUser }) => {
  const logout = async () => {
    const { isSuccess, message } = await logoutGoogle();
    if (isSuccess) {
      window.location.reload();
    } else {
      alert("로그아웃 실패");
      console.error(message);
    }
  };
  const validateLink = (link: string | null) => {
    if (!link) {
      alert("링크가 존재하지 않습니다");
      return false;
    }
    if (!link.includes(".notion.site")) {
      alert("노션 링크가 아닙니다");
      return false;
    }
    return true;
  };

  const handleElasticsearch = async (id: number, link: string) => {
    try {
      const { data } = await axios.post("/api/elasticsearch", {
        id,
        url: link,
      });
      if (!data.isSuccess || data.error) {
        throw new Error(data?.error || "Elasticsearch 등록 실패");
      }
      return true;
    } catch (error: Error | any) {
      console.error("Elasticsearch 등록 실패:", error.message);
      return false;
    }
  };

  const rollbackNotion = async (id: number) => {
    const { isSuccess } = await removeNotion({ id, userId: user.id });
    if (isSuccess) {
      alert("링크 등록 실패");
    }
  };

  const addNotionLink = async () => {
    const link = prompt("노션의 링크를 넣어주세요");
    if (!validateLink(link)) return;

    const { isSuccess, message, id } = await insertNotion({
      user_id: user.id,
      url: link!,
    });
    if (!isSuccess || !id) {
      alert("링크 등록 실패");
      console.error("Database 등록 실패:", message);
      return window.location.reload();
    }

    const isElasticsearchSuccess = await handleElasticsearch(id, link!);
    if (!isElasticsearchSuccess) {
      await rollbackNotion(id);
      return window.location.reload();
    }

    alert("링크 등록 완료");
    window.location.reload();
  };

  return (
    <div className="flex items-center gap-[10px]">
      <button
        className="box-border h-[48px] w-[124px] rounded-md bg-[#0066FF] text-white"
        onClick={addNotionLink}
      >
        링크 등록하기
      </button>
      <div className="group relative flex gap-[5px]">
        <AvartarL url={user.user_metadata.picture} />
        <div className="invisible absolute right-0 top-[50px] z-[201] box-border w-[80px] rounded-lg border-[1px] border-[#D9D9D9] bg-white p-[10px] text-center delay-200 hover:visible group-hover:visible">
          <button onClick={logout}>로그아웃</button>
        </div>
      </div>
    </div>
  );
};

export default LoginedState;
