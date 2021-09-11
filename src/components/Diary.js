import { Deta } from "deta";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import MessageIcon from "@material-ui/icons/Message";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
// import { useTheme } from "@material-ui/core/styles";

import { useState } from "react";
import { getCurrentDate, getTimeString } from "../utils/DateUtils";

const deta = Deta("c08ztmvr_VzzQTNHLfBGn1r7UYAnYTP4Nd1pCwKXv");
const db = deta.Base("diarys");

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

export const Diary = (props) => {
  const {
    diaryAuthor,
    diaryContent,
    diaryDate,
    diaryKey,
    diaryReplys,
    fetchAllDiarys,
  } = props;
  const [reply, setReply] = useState(false);
  // const [replyAuthor, setReplyAuthor] = useState("");
  const [replyContent, setReplyContent] = useState("");
  // const [isLoading, setIsLoading] = useState(false);
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
    // setIsLoading(true);
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
      // setIsLoading(false);
      fetchAllDiarys();
    } catch (error) {
      console.error(error);
    }
  };

  const toggleReplyPanel = () => {
    setReply(!reply);
  };

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

          {diaryReplys.map((diaryReply, index) => {
            return (
              <div key={index} style={{ paddingLeft: 10 }}>
                <ContentDivider variant="fullWidth" />
                <TitleContainer>
                  <Typography
                    color={
                      diaryReply.author === "Dan" ? "primary" : "secondary"
                    }
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
          })}

          {reply && (
            <ReplyContainer>
              <TextField
                label="回复："
                multiline
                style={{ width: "100%" }}
                // maxRows={4}
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
          )}
        </CardContent>
      </Card>
    </CardContainer>
  );
};
