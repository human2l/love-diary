import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { styled } from "@material-ui/core/styles";
import loveImage from "../assets/love_icon.png";
import { red } from "@material-ui/core/colors";

function howLong(time1, time2) {
  time1 = time1.getTime();
  time2 = time2.getTime();
  let cha = time1 > time2 ? time1 - time2 : time2 - time1;
  let day = Math.floor(cha / (24 * 3600 * 1000));
  let hours = Math.floor((cha % (24 * 3600 * 1000)) / (3600 * 1000));
  let minutes = Math.floor(
    ((cha % (24 * 3600 * 1000)) % (3600 * 1000)) / (60 * 1000)
  );
  let seconds = Math.floor(
    (((cha % (24 * 3600 * 1000)) % (3600 * 1000)) % (60 * 1000)) / 1000
  );
  return {
    day: day,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
  };
}

const DashboardContainer = styled("div")({
  marginTop: 50,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

const CounterContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-end",
});

const Image = styled("img")({
  width: "auto",
  height: "auto",
  maxWidth: 100,
  maxHeight: 100,
});

const RedTypography = styled(Typography)({
  color: "#f44336",
});

export const Dashboard = () => {
  let res = howLong(new Date(), new Date("2020-02-14 00:00:00"));
  console.log(
    res.day +
      "天 " +
      res.hours +
      "小时 " +
      res.minutes +
      "分钟 " +
      res.seconds +
      "秒"
  );

  return (
    <DashboardContainer>
      <Image src={loveImage} />
      <Typography color="textPrimary" variant="h5">
        蛋蛋和凯凯
      </Typography>
      <Typography color="textPrimary" variant="h5">
        从2020年2月14日在一起
      </Typography>
      <CounterContainer>
        <Typography color="textPrimary" variant="h5">
          已经
        </Typography>
        <RedTypography color="primary" variant="h3">
          {res.day}
        </RedTypography>
        <Typography color="textPrimary" variant="h5">
          天了
        </Typography>
      </CounterContainer>
    </DashboardContainer>
  );
};
