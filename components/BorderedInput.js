import React from 'react';
import {StyleSheet, TextInput} from 'react-native';

function BorderedInput({hasMarginBottom, ...rest}, ref) {
  return (
    <TextInput
      style={[styles.input, hasMarginBottom && styles.margin]}
      placeholderTextColor="#bdbdbd"
      {...rest}
      ref={ref} //인풋에 포커스
    />
  );
}

const styles = StyleSheet.create({
  input: {
    //borderColor: ,
    //borderWidth: 1,
    paddingHorizontal: 16,
    borderRadius: 20,
    height: 48,
    backgroundColor: '#4A4A4A',
    color: '#bdbdbd',
  },
  margin: {
    marginBottom: 16,
  },
});

export default React.forwardRef(BorderedInput);
//키보드 리턴 처리
//함수 컴포넌트의 두번째 파라미터에서 ref를 받아와 사용 가능.
//특정 컴포넌트 내부에 있는 또 다른 컴포넌트에 ref를 설정하려면 forwardRef()를 사용해야함.
//추후에 다른 컴포넌트를 사용할 때 이 함수 컴포넌트를 사용하고 ref를 달면 이 함수컴포넌트 내부의 textinput에 ref가 달리게 됨.
//constBorderedInput= React.forwardRef(({hasMarginBottom,...rest}, ref)=> {return (...)}); 이렇게 사용해도 됨.
