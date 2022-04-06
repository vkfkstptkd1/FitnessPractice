import React, {useState} from 'react';
import {ButtonGroup} from 'react-native-elements';

function Buttongroup() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <>
      <ButtonGroup
        buttons={['전체', '연령대', '성별', '친구']}
        selectedIndex={selectedIndex}
        onPress={value => {
          setSelectedIndex(value);
        }}
        containerStyle={{marginBottom: 10, height: 23, borderRadius: 10}}
        buttonContainerStyle={{
          backgroundColor: 'rgba(48,47,47,2)',
        }}
        textStyle={{color: 'white', fontFamily: 'roboto-regular'}}
      />
    </>
  );
}

export default Buttongroup;
