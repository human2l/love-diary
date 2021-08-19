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
  return (
    <CardContainer>
      <Card>
        <CardContent>
          <TitleContainer>
            <Typography variant="h6" color="textPrimary" gutterBottom>
              {props.diaryAuthor}
            </Typography>
            <Typography color="textSecondary">{props.diaryDate}</Typography>
          </TitleContainer>
          <Typography variant="body2" component="p">
            {props.diaryContent}
          </Typography>
        </CardContent>
      </Card>
    </CardContainer>
  );
};
