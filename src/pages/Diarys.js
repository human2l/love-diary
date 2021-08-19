import { useState, useEffect } from "react";
import { Diary } from "../components/Diary";
import { Deta } from "deta";
import { styled } from "@material-ui/core/styles";

const DiarysContainer = styled("div")({
  paddingBottom: 65,
});

const deta = Deta("c08ztmvr_VzzQTNHLfBGn1r7UYAnYTP4Nd1pCwKXv");
const db = deta.Base("diarys");

export const Diarys = () => {
  const [diarys, setDiarys] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    const fetchAllDiarys = async () => {
      try {
        const { items: allDiarys } = await db.fetch();
        const orderedDiarys = allDiarys.sort((diaryA, diaryB) =>
          diaryA.time < diaryB.time ? 1 : -1
        );
        setDiarys(orderedDiarys);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    fetchAllDiarys();
  }, []);
  return (
    <DiarysContainer>
      {isLoading && <div>正在加载...</div>}
      {diarys.map((diary) => {
        let timeZone = "";
        diary.author === "Dan" ? (timeZone = "中") : (timeZone = "澳");
        const diaryDate = `${timeZone}  ${diary.hour}:${diary.minute}  ${diary.day}/${diary.month}/${diary.year}`;
        return (
          <Diary
            key={diary.key}
            diaryAuthor={diary.author}
            diaryDate={diaryDate}
            diaryContent={diary.content}
          />
        );
      })}
    </DiarysContainer>
  );
};
