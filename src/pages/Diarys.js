import { useState, useEffect } from "react";
import { Diary } from "../components/Diary";
import { Deta } from "deta";
import { styled } from "@material-ui/core/styles";
import { getTimeString } from "../utils/DateUtils";
const DiarysContainer = styled("div")({
  paddingBottom: 65,
});

const deta = Deta("c08ztmvr_VzzQTNHLfBGn1r7UYAnYTP4Nd1pCwKXv");
const db = deta.Base("diarys");

export const Diarys = () => {
  const [diarys, setDiarys] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const fetchAllDiarys = async () => {
    setIsLoading(true);
    try {
      const { items: allDiarys } = await db.fetch();
      const orderedDiarys = allDiarys.sort((diaryA, diaryB) =>
        diaryA.time < diaryB.time ? 1 : -1
      );
      setDiarys(orderedDiarys);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchAllDiarys();
  }, []);
  return (
    <DiarysContainer>
      {isLoading && <div>正在加载...</div>}
      {diarys.map((diary) => {
        const { author, minute, hour, day, month, year } = diary;
        const diaryDate = getTimeString(author, minute, hour, day, month, year);

        return (
          <Diary
            key={diary.key}
            diaryKey={diary.key}
            diaryAuthor={diary.author}
            diaryDate={diaryDate}
            diaryContent={diary.content}
            diaryReplys={diary.reply}
            fetchAllDiarys={fetchAllDiarys}
          />
        );
      })}
    </DiarysContainer>
  );
};
