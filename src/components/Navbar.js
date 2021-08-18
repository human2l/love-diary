import { useState } from "react";
import { styled } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import CreateIcon from "@material-ui/icons/Create";
import AssignmentIcon from "@material-ui/icons/Assignment";
import FavoriteIcon from "@material-ui/icons/Favorite";

export const Navbar = () => {
  const Navbar = styled(BottomNavigation)({
    position: "fixed",
    width: "100%",
    left: 0,
    bottom: 0,
    height: "56px",
  });

  const [value, setValue] = useState(0);

  return (
    <Navbar
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
    >
      <BottomNavigationAction label="新的心情" icon={<CreateIcon />} />
      <BottomNavigationAction label="恋爱日记" icon={<AssignmentIcon />} />
      <BottomNavigationAction label="我们" icon={<FavoriteIcon />} />
    </Navbar>
  );
};
