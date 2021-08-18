import { Deta } from "deta";
import { Navbar } from "./components/Navbar";
import { NewDiary } from "./pages/NewDiary";
import { styled } from "@material-ui/core/styles";

const deta = Deta("c08ztmvr_VzzQTNHLfBGn1r7UYAnYTP4Nd1pCwKXv");
const db = deta.Base("diarys");

const Container = styled("div")({
  height: "100vh",
});

function App() {
  async function submitNewDiary(newDiary) {
    const result = await db.put({
      content: newDiary,
    });
    console.log(result);
  }

  return (
    <Container>
      <NewDiary
        addNewDiary={(newDiary) => {
          submitNewDiary(newDiary);
        }}
      />
      <Navbar />
    </Container>
  );
}

export default App;
