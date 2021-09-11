import { Deta } from "deta";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import MessageIcon from "@material-ui/icons/Message";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import CardMedia from "@material-ui/core/CardMedia";
import CardActionArea from "@material-ui/core/CardActionArea";
import CircularProgress from "@material-ui/core/CircularProgress";

// import { useTheme } from "@material-ui/core/styles";

import { useState, useEffect } from "react";
import { getCurrentDate, getTimeString } from "../utils/DateUtils";

const deta = Deta("c08ztmvr_VzzQTNHLfBGn1r7UYAnYTP4Nd1pCwKXv");
const db = deta.Base("diarys");
const diaryPhotosDB = deta.Drive("diary_photos");

const CardContainer = styled(Card)({
  marginTop: 10,
});

const TitleContainer = styled("div")({
  display: "flex",
  justifyContent: "space-between",
});

const DiaryMetaContainer = styled("div")({
  display: "flex",
});

const ReplyContainer = styled("div")({
  display: "flex",
});

const ContentDivider = styled(Divider)({});

const PhotoContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
});

export const Diary = (props) => {
  const {
    diaryAuthor,
    diaryContent,
    diaryDate,
    diaryKey,
    diaryReplys,
    diaryPhotos,
    fetchAllDiarys,
  } = props;

  const [reply, setReply] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [photo, setPhoto] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (diaryPhotos.length > 0) {
      setIsLoading(true);
      const fetchPhotos = async () => {
        try {
          const photoBlobData = await diaryPhotosDB.get(diaryPhotos[0]);
          let reader = new FileReader();
          reader.readAsDataURL(photoBlobData);
          reader.onload = () => {
            setPhoto(reader.result);
          };
          setIsLoading(false);
        } catch (error) {
          console.error(error);
        }
      };
      fetchPhotos();
    }

    // return () => {

    // }
  }, [diaryPhotos]);
  // const theme = useTheme();

  const convertToParagraph = (text) => {
    return text.split("\n").map((line, index) => {
      return (
        <span key={line + index}>
          {line}
          <br />
        </span>
      );
    });
  };

  const editReply = (event) => {
    setReplyContent(event.target.value);
  };

  const submitReply = async (author) => {
    setReply(false);
    const { minute, hour, day, month, year, time } = getCurrentDate();
    try {
      await db.update(
        {
          reply: [
            ...diaryReplys,
            {
              author,
              content: replyContent,
              minute,
              hour,
              day,
              month,
              year,
              time,
            },
          ],
        },
        diaryKey
      );

      fetchAllDiarys();
    } catch (error) {
      console.error(error);
    }
  };

  const toggleReplyPanel = () => {
    // console.log(photo);
    setReply(!reply);
  };

  const diaryReplysView = diaryReplys.map((diaryReply, index) => {
    return (
      <div key={index} style={{ paddingLeft: 10 }}>
        <ContentDivider variant="fullWidth" />
        <TitleContainer>
          <Typography
            color={diaryReply.author === "Dan" ? "primary" : "secondary"}
            gutterBottom
          >
            {diaryReply.author === "Dan" ? "蛋蛋：" : "凯凯："}
          </Typography>
          <DiaryMetaContainer>
            <Typography color="textSecondary">
              {getTimeString(
                diaryReply.author,
                diaryReply.minute,
                diaryReply.hour,
                diaryReply.day,
                diaryReply.month,
                diaryReply.year
              )}
            </Typography>
          </DiaryMetaContainer>
        </TitleContainer>
        <Typography
          color={diaryReply.author === "Dan" ? "primary" : "secondary"}
          variant="body2"
          component="p"
          gutterBottom
        >
          {convertToParagraph(diaryReply.content)}
        </Typography>
      </div>
    );
  });

  const replyControlsView = (
    <ReplyContainer>
      <TextField
        label="回复："
        multiline
        style={{ width: "100%" }}
        value={replyContent}
        onChange={editReply}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() => submitReply("Dan")}
        style={{ width: "100px", height: "40px", whiteSpace: "nowrap" }}
      >
        蛋蛋回复
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => submitReply("Kai")}
        style={{
          width: "100px",
          height: "40px",
          marginLeft: 5,
          whiteSpace: "nowrap",
        }}
      >
        凯凯回复
      </Button>
    </ReplyContainer>
  );

  return (
    <CardContainer>
      <Card>
        <CardContent>
          <TitleContainer>
            <Typography
              variant="h6"
              color={diaryAuthor === "Dan" ? "primary" : "secondary"}
              gutterBottom
            >
              {diaryAuthor === "Dan" ? "蛋蛋：" : "凯凯："}
            </Typography>
            <DiaryMetaContainer>
              <Typography color="textSecondary">{diaryDate}</Typography>
              <MessageIcon color="secondary" onClick={toggleReplyPanel} />
            </DiaryMetaContainer>
          </TitleContainer>
          <Typography
            color={diaryAuthor === "Dan" ? "primary" : "secondary"}
            variant="body2"
            component="p"
            gutterBottom
          >
            {convertToParagraph(diaryContent)}
          </Typography>
          <PhotoContainer>
            {isLoading && (
              <CircularProgress color="secondary" style={{ margin: "auto" }} />
            )}
            {diaryPhotos.length > 0 && (
              <div>
                <Card>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      image={photo}
                      style={{ height: "auto", width: "100%" }}
                    />
                  </CardActionArea>
                </Card>
              </div>
            )}
          </PhotoContainer>

          {diaryReplysView}

          {reply && replyControlsView}
        </CardContent>
      </Card>
    </CardContainer>
  );
};
