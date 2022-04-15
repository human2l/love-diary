import { useState, useEffect } from "react";
import { Diary } from "../components/Diary";
import { Deta } from "deta";
import { styled } from "@material-ui/core/styles";
import { getTimeString } from "../utils/DateUtils";
import CircularProgress from "@material-ui/core/CircularProgress";

const DiarysContainer = styled("div")({
  paddingBottom: 65,
  display: "flex",
  flexDirection: "column",
});

const deta = Deta("c08ztmvr_6jWPJ2XjugHwifu3WkYscye7GP4gCgom");
const db = deta.Base("diarys");

const setNumOfCachedPhotos = (diarys, n) => {
  let cachePhotoCounter = 0;
      const configuredDiarys = diarys.map((diary) => {
        if(diary.photos.length === 0 || cachePhotoCounter >= n){
          diary.cachePhoto = false
        }else{
          diary.cachePhoto = true;
          cachePhotoCounter++;
        }
        return diary
      })
  return configuredDiarys;
}

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

      const cachedPhotosDiarys = setNumOfCachedPhotos(orderedDiarys, 3);

      setDiarys(cachedPhotosDiarys);
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
      {isLoading && (
        <CircularProgress color="secondary" style={{ margin: "auto" }} />
      )}
      {diarys.map((diary) => {
        const {
          key,
          author,
          content,
          minute,
          hour,
          day,
          month,
          year,
          reply,
          photos,
          cachePhoto,
        } = diary;
        const diaryDate = getTimeString(author, minute, hour, day, month, year);

        return (
          <Diary
            key={key}
            diaryKey={key}
            diaryAuthor={author}
            diaryDate={diaryDate}
            diaryContent={content}
            diaryReplys={reply}
            diaryPhotos={photos}
            cachePhoto = {cachePhoto}
            fetchAllDiarys={fetchAllDiarys}
          />
        );
      })}
    </DiarysContainer>
  );
};
