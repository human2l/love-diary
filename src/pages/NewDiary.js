import { Deta } from "deta";
import { useState } from "react";
import { styled } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Typography from "@material-ui/core/Typography";
import { getCurrentDate } from "../utils/DateUtils";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardActionArea from "@material-ui/core/CardActionArea";

const deta = Deta("c08ztmvr_VzzQTNHLfBGn1r7UYAnYTP4Nd1pCwKXv");
const db = deta.Base("diarys");

const NewDiaryContainer = styled("div")({
  paddingTop: 20,
  paddingBottom: 65,
});

const NewDiaryForm = styled("form")({});

const DiaryTextField = styled(TextField)({
  width: "100%",
});

const ControlContainer = styled("div")({
  left: 0,
  width: "100%",
  display: "flex",
  justifyContent: "space-around",
  position: "fixed",
  marginLeft: "auto",
  bottom: 60,
});

const SubmissionAlertModalContent = styled("div")({
  padding: 20,
  marginTop: 50,
  width: "70%",
  margin: "auto",
  background: "rgba(255,255,255,0.6)",
  borderRadius: "10px",
  border: "1px solid rgba(255,255,255,0.2)",
});

const ImageControlContainer = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  paddingTop: "10px",
  paddingBottom: "10px",
});

export const NewDiary = () => {
  let defaultDiaryContent = localStorage.getItem("diaryDraft");
  if (defaultDiaryContent === undefined || defaultDiaryContent === null)
    defaultDiaryContent = "";
  const [newDiaryContent, setNewDiaryContent] = useState(defaultDiaryContent);
  const [submitted, setSubmitted] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");
  const [submissionAlertState, setSubmissionAlertState] = useState(false);
  const [author, setAuthor] = useState("");
  const [imageData, setImageData] = useState({
    file: null,
    imagePreviewUrl: "",
  });

  const handleChange = (event) => {
    localStorage.setItem("diaryDraft", event.target.value);
    setNewDiaryContent(event.target.value);
  };

  const showSubmissionAlert = () => {
    setSubmissionAlertState(true);
  };

  const hideSubmissionAlert = () => {
    setSubmissionAlertState(false);
  };

  const selectImageFile = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      setImageData({ file, imagePreviewUrl: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const clearImage = () => {
    setImageData({});
  };

  const submitDiary = async () => {
    const { minute, hour, day, month, year, time } = getCurrentDate();
    setSubmitted(true);
    setWarningMessage("正在保存...");
    try {
      await db.put({
        content: newDiaryContent,
        minute,
        hour,
        day,
        month,
        year,
        time,
        author,
        reply: [],
      });

      setWarningMessage("已保存");
      localStorage.removeItem("diaryDraft");
    } catch (error) {
      setWarningMessage("保存失败，原因：" + error);
    }
  };
  return (
    <NewDiaryContainer>
      <NewDiaryForm noValidate autoComplete="off">
        <DiaryTextField
          onChange={handleChange}
          label="新的心情"
          placeholder="写点什么好呢"
          multiline
          variant="outlined"
          maxRows={(window.innerHeight - 56) / 23}
          value={newDiaryContent}
          helperText={warningMessage}
        />
        <ImageControlContainer>
          <Button
            component="label"
            size="small"
            variant="contained"
            color="primary"
          >
            <input
              hidden
              type="file"
              onChange={(e) => {
                selectImageFile(e);
              }}
            />
            添加图片
          </Button>
          <Button
            size="small"
            variant="outlined"
            color="primary"
            onClick={clearImage}
          >
            清除图片
          </Button>
        </ImageControlContainer>

        {imageData.imagePreviewUrl && (
          <Card>
            <CardActionArea>
              <CardMedia component="img" image={imageData.imagePreviewUrl} />
            </CardActionArea>
          </Card>
        )}
        {!submitted && (
          <ControlContainer>
            <Button
              size="large"
              variant="contained"
              color="primary"
              onClick={() => {
                setAuthor("Dan");
                showSubmissionAlert();
              }}
            >
              蛋蛋写好了
            </Button>
            <Button
              size="large"
              variant="contained"
              color="secondary"
              onClick={() => {
                setAuthor("Kai");
                showSubmissionAlert();
              }}
            >
              凯凯写好了
            </Button>
          </ControlContainer>
        )}
      </NewDiaryForm>
      <Modal
        open={submissionAlertState}
        onClose={hideSubmissionAlert}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <SubmissionAlertModalContent>
          <Typography
            color={author === "Dan" ? "textPrimary" : "secondary"}
            variant="h5"
            id="simple-modal-title"
          >
            {author === "Dan" ? "蛋蛋" : "凯凯"}，
          </Typography>
          <Typography color="textSecondary" id="simple-modal-description">
            你确定写好了吗？
          </Typography>
          <div
            style={{
              marginTop: "10px",
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <Button
              size="medium"
              variant="contained"
              color="default"
              onClick={hideSubmissionAlert}
            >
              取消
            </Button>
            <Button
              size="medium"
              variant="contained"
              color={author === "Dan" ? "primary" : "secondary"}
              onClick={() => {
                hideSubmissionAlert();
                submitDiary();
              }}
            >
              确定
            </Button>
          </div>
        </SubmissionAlertModalContent>
      </Modal>
    </NewDiaryContainer>
  );
};
