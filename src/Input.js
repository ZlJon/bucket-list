import React from "react";
import { Dimensions } from "react-native";
import styled from "styled-components/native";


const InputStyle = styled.TextInput`
  width: ${({width})=>width - 40}px;
  height: 40px;
  background-color: #fff;
  margin: 3px 0; 
  padding: 0 30px;
  border-radius: 10px;
  font-size: 24px;

`;




const Input = ({placeholder, value, onChangeText, onSubmitEditing, onBlur }) => {
  const width = Dimensions.get('window').width;

  return (
    <InputStyle
      width={width}
      maxLength={50}
      placeholder={placeholder}
      autoCapitalize="none"
      autoCorrect={false}
      returnKeyType="done"
      value={value}
      onChangeText={onChangeText}
      onSubmitEditing={onSubmitEditing}
      onBlur={onBlur}
    />
  );
};

export {Input};