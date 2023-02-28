import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getTheme } from "../../lib/constants/theme";
import { getBasket } from "../../store/basket/basketSlice";
import { uiActions } from "../../store/ui/uiSlice";
import { BasketButton } from "../basket/BasketButton";
import { styled as styledMui } from "@mui/system";
import { styled as styleMuiMaterial } from "@mui/material";
export const Header = ({ onShowBasket, ...rest }) => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.basket.items);
  const theme = useSelector((state) => state.ui.themeMode);
  const [animationClass, setAnimationClass] = useState("");
  useEffect(() => {
    dispatch(getBasket());
  }, [dispatch]);
  const calculateSumAmout = () => {
    const sum = items.reduce((s, item) => {
      return s + item.amount;
    }, 0);
    return sum;
  };

  useEffect(() => {
    setAnimationClass("bump");

    const id = setTimeout(() => {
      setAnimationClass("");
    }, 300);

    return () => {
      clearTimeout(id);
    };
  }, [items]);

  const themeChangeHandler = () => {
    const themeMode = theme === "light" ? "dark" : "light";
    dispatch(uiActions.changeTheme(themeMode));
  };
  return (
    <Container {...rest}>
      <Logo>ReactMeals</Logo>
      <BasketContainer>
        <BasketButton
          className={animationClass}
          onClick={onShowBasket}
          count={calculateSumAmout()}
        />
        <StyledMuiButton onClick={themeChangeHandler} variant="contained">
          {theme === "light" ? "Turn dark mode" : "Turn light mode"}
        </StyledMuiButton>
      </BasketContainer>
    </Container>
  );
};
const BasketContainer = styled.div`
  display: flex;
  align-items: center;
`;
const Container = styleMuiMaterial("header")(({ theme }) => ({
  position: "fixed",
  zIndex: 1,
  top: 0,
  width: "100%",
  height: "101px",
  display: " flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: " 0px 120px",
  backgroundColor: theme.palette.primary.main,
  ".bump ": {
    animation: "bump 300ms ease-out",
  },

  " @keyframes bump": {
    "0% ": {
      transform: "scale(1)",
    },
    "10% ": {
      transform: "scale(0.9)",
    },
    " 30% ": {
      transform: "scale(1.1)",
    },
    "50%": {
      transform: " scale(1.15)",
    },
    " 100%": {
      transform: "scale(1)",
    },
  },
}));

const Logo = styled.p`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 38px;
  line-height: 57px;
  color: #ffffff;
`;
const StyledMuiButton = styleMuiMaterial(Button)(({ theme }) => ({
  fontSize: "10px",
  background: theme.palette.primary.light,
  marginLeft: "10px",
}));
