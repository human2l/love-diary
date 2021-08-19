import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { styled } from "@material-ui/core/styles";

const CardContainer = styled(Card)({
  marginTop: 10,
});

const TitleContainer = styled("div")({
  display: "flex",
  justifyContent: "space-between",
});

export const Diary = (props) => {
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
        {props.diaryAuthor === "Dan" ? (
          <CardContent>
            <TitleContainer>
              <Typography variant="h6" color="primary" gutterBottom>
                蛋蛋：
              </Typography>
              <Typography color="textSecondary">{props.diaryDate}</Typography>
            </TitleContainer>
            <Typography color="primary" variant="body2" component="p">
              {content}
            </Typography>
          </CardContent>
        ) : (
          <CardContent>
            <TitleContainer>
              <Typography variant="h6" color="secondary" gutterBottom>
                凯凯：
              </Typography>
              <Typography color="textSecondary">{props.diaryDate}</Typography>
            </TitleContainer>
            <Typography color="secondary" variant="body2" component="p">
              {content}
            </Typography>
          </CardContent>
        )}
      </Card>
    </CardContainer>
  );
};
