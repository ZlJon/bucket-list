import React from "react";
import { Dimensions, Pressable } from "react-native";
import styled from "styled-components/native";

const AllDelBtn = styled.Text`
  font-size: 30px;
  font-weight: 600;
  color: #eeee;
  background-color: #555;
  height: 40px;
  width: ${({width})=>width - 40}px;
  margin: 5px;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: 5px;

`;

const IsAllDelBtn = ({item, type, onPressOut, id}) => {
  const width = Dimensions.get('window').width;
  const AllDelBtnF = () => {
    // onPressOut(id)
  };
  return (
    <Pressable onPressOut={AllDelBtnF}>
      <AllDelBtn width={width} source={type}>완료항목 전체삭제</AllDelBtn>
    </Pressable>
  );
};

export {IsAllDelBtn};
