import { useState } from 'react';
import {Alert, Dimensions, StatusBar} from 'react-native';
import styled from 'styled-components/native';
import { IsAllDelBtn } from './AllDelbtn';
import { Input } from './Input';
import { ListInput } from './ListInput';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';

const Container = styled.View`
  flex: 1;
  background-color: gray;
  align-items: center;
  justify-content: flex-start;
`;

const Title = styled.Text`
  font-size: 30px;
  font-weight: 600;
  color: #eeee;
  background-color: #555;
  margin: 5px;
  justify-content: center;
  align-items: center;
  width: ${({width})=>width - 40}px;
  border-radius: 5px;
`;
const List = styled.ScrollView`
  flex: 1;
  width: ${({width})=>width - 40}px;
`;


export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [texts, setTexts] = useState({

  });
  const saveTasks = async tasks => {
    try {
      await AsyncStorage.setItem('texts', JSON.stringify(tasks));
      setTexts(tasks);
    } catch{console.error;}
  };
  
  const loadTasksF = async () => {
    const loadTask = await AsyncStorage.getItem('texts');
    setTexts(JSON.parse(loadTask || '{}'));
  } 
  const width = Dimensions.get('window').width;
  const [newText, setNewText] = useState('');

  
 
  /*텍스트 입력 기능 */
  const add = () => {
    const Id = Date.now().toString();
    const newTextObj = {
      [Id]: {id: Id, text: newText, ckBox: false},
    };
    setNewText('');
    saveTasks({...texts, ...newTextObj})
  };

  const del = (id) => {
    const currentTexts = ({...texts});
    Alert.alert('','삭제하시겠습니까?', [
      {
        text: 'No',
        onPress() {
          console.log('No!')
        }
      },
      {
        text: 'Yes',
        onPress() {
          console.log('Yes!!')
          delete currentTexts[id];
          saveTasks(currentTexts);
        }
      }
    ])
  };

  const allDel = (id) => {
    const currentTexts = ({...texts})
    delete currentTexts[id];
    setTexts(currentTexts);
  }

  const toggle = id => {
    const currentTexts = ({...texts});
    currentTexts[id]['ckBox'] = !currentTexts[id]['ckBox'];
    saveTasks(currentTexts);
  };

  const update = item => {
    const currentTexts = ({...texts});
    currentTexts[item.id] = item;
    saveTasks(currentTexts);
  };



  const TextChange = text => {
    setNewText(text);
  };

  const onBlurF = () => {
    setNewText('');
  };
  


  return isReady ? (
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor={'#fff'}/>
      <Title width={width}>버킷 리스트</Title>
      <Input placeholder='+항목추가' value={newText} onChangeText={TextChange} onSubmitEditing={add} onBlur={onBlurF} />
      <List width={width}>
        {Object.values(texts).reverse().map(item=>(<ListInput key={item.id} item={item} delText={del} toggleF={toggle} updateF={update}/>
        ))}
      </List>
      <IsAllDelBtn/>
    </Container>
  ) : (
  <AppLoading startAsync={loadTasksF} onFinish={()=>setIsReady(true)} onError={console.error}/> 
  );
}

