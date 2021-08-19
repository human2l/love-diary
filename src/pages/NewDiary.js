import { Deta } from "deta";
import { useState } from "react";
import { styled } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

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

// const WarningMessageContainer = styled("div")({
//   marginTop: 10,
//   display: "flex",
//   justifyContent: "center",
// });

// const WarningMessage = styled(Typography)({
//   variant: "h3",
//   color: "#ec407a",
// });

const getCurrentDate = () => {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = today.getFullYear();
  let time = today.getTime();
  today = dd + "/" + mm + "/" + yyyy;
  return { day: dd, month: mm, year: yyyy, time };
};

export const NewDiary = () => {
  let defaultDiaryContent = localStorage.getItem("diaryDraft");
  if (defaultDiaryContent === undefined || defaultDiaryContent === null)
    defaultDiaryContent = "";
  const [newDiaryContent, setNewDiaryContent] = useState(defaultDiaryContent);
  const [submitted, setSubmitted] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");

  const handleChange = (event) => {
    localStorage.setItem("diaryDraft", event.target.value);
    setNewDiaryContent(event.target.value);
  };

  const submitDiary = async (author) => {
    const { day, month, year, time } = getCurrentDate();
    setSubmitted(true);
    setWarningMessage("正在保存...");
    try {
      let result = await db.put({
        content: newDiaryContent,
        day,
        month,
        year,
        time,
        author,
      });
      console.log(result);
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
        {/* <WarningMessageContainer>
          <WarningMessage>{warningMessage}</WarningMessage>
        </WarningMessageContainer> */}
        {!submitted && (
          <ControlContainer>
            <Button
              size="large"
              variant="contained"
              color="primary"
              onClick={() => submitDiary("Dan")}
            >
              蛋蛋写好了
            </Button>
            <Button
              size="large"
              variant="contained"
              color="secondary"
              onClick={() => submitDiary("Kai")}
            >
              凯凯写好了
            </Button>
          </ControlContainer>
        )}
      </NewDiaryForm>
    </NewDiaryContainer>
  );
};
