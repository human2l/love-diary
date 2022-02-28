import { Deta } from "deta";
import { useState, useEffect } from 'react';
import Typography from "@material-ui/core/Typography";
import { styled } from "@material-ui/core/styles";

const deta = Deta("c08ztmvr_VzzQTNHLfBGn1r7UYAnYTP4Nd1pCwKXv");
const db = deta.Base("wallet");


const WalletContainer = styled("div")({
  paddingTop: "100px",
  height: "100vh",
  paddingBottom: 65,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const ItemContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-end",
});

export const Wallet = () => {
  const [danMoney, setDanMoney] = useState("");
  const getDanMoney = async () => {
    try {
      const danMoney = await db.get('944ej0cczecy')
      setDanMoney(danMoney.money);
    } catch (error) {
      
    }
  }
  useEffect(() => {
    getDanMoney()
  }, [])
  
  return (
    <WalletContainer>
      <ItemContainer>
      <Typography color="initial" variant="h5">
        蛋蛋账户余额：
      </Typography>
      <Typography color="textPrimary" variant="h5">
          {danMoney}
        </Typography>
        <Typography color="initial" variant="h5">
        刀
      </Typography>
      </ItemContainer>
    </WalletContainer>
  );
};
