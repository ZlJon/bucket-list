import React from "react";
import {Pressable } from "react-native";
import styled from "styled-components/native";
import PropTypes from 'prop-types';
import { images } from "./Image";

const Icon = styled.Image`
  width: 30px;
  height: 30px;
`;




const IconBtn =({type, onPressOut, id }) => {
  const onPressOutF =()=>{
    onPressOut(id);
  };

  return (
    <Pressable onPressOut={onPressOutF}>
      <Icon source={type}/>
    </Pressable>
  );
};



IconBtn.defaultProps = {
  onPressOut: ()=>{},
};



export {IconBtn};