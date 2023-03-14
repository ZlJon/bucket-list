import React, { useState } from "react";
import styled from "styled-components/native";
import { IconBtn } from "./IconBtn";
import {images} from "./Image";
import { Input } from "./Input";

const ListInputStyle = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #fff;
  border-radius: 10px;
  margin: 3px 0;
  padding: 0 3px;
  height: 40px;
`;
const Contents = styled.Text`
  flex: 1;
  font-size: 24px;
  color: #000;
  text-decoration-line: ${({completed})=> completed ? 'line-through' : 'none'};
`;

const ListInput = ({item, delText, toggleF, updateF}) => {
  const [isEditing, setIsEditing] = useState(false);
  
  const [text, setText] = useState(item.text);

  const updateBtnPress = () => {
    setIsEditing(true);
  };
  const onSubmitEditingF = () => {
    if(isEditing) {
      const edited = Object.assign({}, item, {text});
      setIsEditing(false);
      updateF(edited);
    }
  };

  const onBlurF = () => {
    if(isEditing) {
      setIsEditing(false);
      setText(item.text);
    }
  };

  return isEditing ? (
  <Input value={text} onChangeText={text=>setText(text)} onSubmitEditing={onSubmitEditingF} onBlur={onBlurF}/>
  ) : (
    <ListInputStyle>
      <IconBtn type={item.ckBox ? images.ckBox : images.ckOut} id={item.id} onPressOut={toggleF} completed={item.ckBox}/>
      <Contents completed={item.ckBox}>{item.text}</Contents>
      {item.ckBox ||(
      <IconBtn type={images.editIcon} onPressOut={updateBtnPress}/>)}
      <IconBtn type={images.delIcon} id={item.id} onPressOut={delText} completed={item.ckBox}/>
    </ListInputStyle>
  );
};

export {ListInput};