import { useState } from "react";
import { styled } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const NewDiaryContainer = styled("div")({
  height: "calc(100vh - 56px)",
});

const NewDiaryForm = styled("form")({});

const DiaryTextField = styled(TextField)({
  width: "100%",
});

const ButtonContainer = styled("div")({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  position: "fixed",
  marginLeft: "auto",
  bottom: 60,
});

export const NewDiary = (props) => {
  const [newDiaryContent, setNewDiaryContent] = useState("");

  const handleChange = (event) => {
    setNewDiaryContent(event.target.value);
  };

  const submitDiary = () => {
    props.addNewDiary(newDiaryContent);
    setNewDiaryContent("");
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
          rows={(window.innerHeight - 56) / 23}
        />
        <ButtonContainer>
          <Button variant="contained" color="primary" onClick={submitDiary}>
            写好了
          </Button>
        </ButtonContainer>
      </NewDiaryForm>
    </NewDiaryContainer>
  );
};
