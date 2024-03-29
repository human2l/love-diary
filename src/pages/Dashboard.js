import { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import { styled } from "@material-ui/core/styles";
import loveImage from "../assets/love_icon.png";
import { getDetaDB } from "../utils/deta";

const db = getDetaDB("diarys");

const howLong = (time1, time2) => {
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
};

const DashboardContainer = styled("div")({
  height: "100vh",
  paddingBottom: 65,
  display: "flex",
  flexDirection: "column",
  //   justifyContent: "center",
  alignItems: "center",
  //   backgroundImage:
  //     "url('https://i.pinimg.com/564x/be/dc/52/bedc522cdab3546780880b53096e4caa.jpg')",
  //   backgroundSize: "cover",
});

const DaysCounterContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-end",
  marginBottom: 20,
});

const DiaryCounterContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
});

const Image = styled("img")({
  marginTop: 50,
  width: "auto",
  height: "auto",
  maxWidth: 100,
  maxHeight: 100,
});

const RedTypography = styled(Typography)({
  color: "#f44336",
});

const getDiaryCountByUser = async (user) => {
  try {
    const diarys = await db.fetch([{ author: user }]);
    return diarys.count;
  } catch (error) {
    console.log(error);
  }
};

export const Dashboard = () => {
  const [kaiDiaryCount, setKaiDiaryCount] = useState(0);
  const [danDiaryCount, setDanDiaryCount] = useState(0);
  useEffect(() => {
    const updateDiaryCount = async () => {
      setKaiDiaryCount(await getDiaryCountByUser("Kai"));
      setDanDiaryCount(await getDiaryCountByUser("Dan"));
    };
    updateDiaryCount();
  }, []);

  let res = howLong(new Date(), new Date("2020-02-14 00:00:00"));
  // console.log(
  //   res.day +
  //     "天 " +
  //     res.hours +
  //     "小时 " +
  //     res.minutes +
  //     "分钟 " +
  //     res.seconds +
  //     "秒"
  // );

  return (
    <DashboardContainer>
      <Image src={loveImage} />
      <Typography color="textPrimary" variant="h5">
        蛋蛋和凯凯
      </Typography>
      <Typography color="textPrimary" variant="h5">
        从2020年2月14日在一起
      </Typography>
      <DaysCounterContainer>
        <Typography color="textPrimary" variant="h5">
          已经
        </Typography>
        <RedTypography color="primary" variant="h3">
          {res.day}
        </RedTypography>
        <Typography color="textPrimary" variant="h5">
          天了
        </Typography>
      </DaysCounterContainer>
      <DiaryCounterContainer>
        <Typography color="primary" variant="h5">
          蛋蛋写了
          {Math.floor((danDiaryCount / (danDiaryCount + kaiDiaryCount)) * 100)}%
          的日记
          <Typography color="primary" variant="h5">
            一共
            {danDiaryCount}篇
          </Typography>
        </Typography>
        <Typography color="secondary" variant="h5">
          凯凯写了
          {Math.floor((kaiDiaryCount / (danDiaryCount + kaiDiaryCount)) * 100)}%
          的日记
          <Typography color="secondary" variant="h5">
            一共
            {kaiDiaryCount}篇
          </Typography>
        </Typography>
      </DiaryCounterContainer>
    </DashboardContainer>
  );
};
