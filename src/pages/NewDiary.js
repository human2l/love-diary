import { Deta } from "deta";
import { useState } from "react";
import { styled } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const deta = Deta("c08ztmvr_VzzQTNHLfBGn1r7UYAnYTP4Nd1pCwKXv");
const db = deta.Base("diarys");

const NewDiaryContainer = styled("div")({
  height: "calc(100vh - 56px)",
});

const NewDiaryForm = styled("form")({});

const DiaryTextField = styled(TextField)({
  width: "100%",
});

const ButtonContainer = styled("div")({
  left: 0,
  width: "100%",
  display: "flex",
  justifyContent: "center",
  position: "fixed",
  marginLeft: "auto",
  bottom: 60,
});

const WarningMessageContainer = styled("div")({
  marginTop: 10,
  display: "flex",
  justifyContent: "center",
});

const WarningMessage = styled(Typography)({
  variant: "h3",
  color: "#ec407a",
});

export const NewDiary = () => {
  const [newDiaryContent, setNewDiaryContent] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");

  const handleChange = (event) => {
    setNewDiaryContent(event.target.value);
  };

  const submitDiary = async () => {
    setSubmitted(true);
    setWarningMessage("正在保存...");
    try {
      let result = await db.put({
        content: newDiaryContent,
      });
      console.log(result);
      setWarningMessage("已保存");
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
          variant="filled"
          maxRows={(window.innerHeight - 56) / 23}
          value={newDiaryContent}
        />
        <WarningMessageContainer>
          <WarningMessage>{warningMessage}</WarningMessage>
        </WarningMessageContainer>
        {!submitted && (
          <ButtonContainer>
            <Button
              size="large"
              variant="contained"
              color="primary"
              onClick={submitDiary}
            >
              写好了
            </Button>
          </ButtonContainer>
        )}
      </NewDiaryForm>
    </NewDiaryContainer>
  );
};
