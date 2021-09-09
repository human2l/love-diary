import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import MessageIcon from "@material-ui/icons/Message";
import TextField from "@material-ui/core/TextField";
// import Divider from "@material-ui/core/Divider";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
// import { useTheme } from "@material-ui/core/styles";
import { useState } from "react";

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

// const ContentDivider = styled(Divider)({});

export const Diary = (props) => {
  const [reply, setReply] = useState(false);
  // const theme = useTheme();
  const content = props.diaryContent.split("\n").map((line, index) => {
    return (
      <span key={line + index}>
        {line}
        <br />
      </span>
    );
  });

  return (
    <CardContainer>
      <Card>
        <CardContent>
          <TitleContainer>
            <Typography
              variant="h6"
              color={props.diaryAuthor === "Dan" ? "primary" : "secondary"}
              gutterBottom
            >
              {props.diaryAuthor === "Dan" ? "蛋蛋：" : "凯凯："}
            </Typography>
            <DiaryMetaContainer>
              <Typography color="textSecondary">{props.diaryDate}</Typography>
              <MessageIcon color="secondary" onClick={() => setReply(!reply)} />
            </DiaryMetaContainer>
          </TitleContainer>
          <Typography
            color={props.diaryAuthor === "Dan" ? "primary" : "secondary"}
            variant="body2"
            component="p"
            gutterBottom
          >
            {content}
          </Typography>
          {/* <ContentDivider variant="fullWidth" />
          <Typography
            color={props.diaryAuthor === "Dan" ? "primary" : "secondary"}
            variant="body2"
            component="p"
            gutterBottom
          >
            {content}
          </Typography> */}
          {reply && (
            <ReplyContainer>
              <TextField
                label="回复："
                multiline
                style={{ width: "100%" }}
                // maxRows={4}
                // value={value}
                // onChange={handleChange}
              />
              <Button
                variant="contained"
                color="primary"
                style={{ width: "100px", height: "40px", whiteSpace: "nowrap" }}
              >
                蛋蛋回复
              </Button>
              <Button
                variant="contained"
                color="secondary"
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
