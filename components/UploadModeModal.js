import React from 'react';
import {StyleSheet, Modal, View, Pressable, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

function UploadModeModal({
  visible,
  onClose,
  onLaunchCamera,
  onLaunchImageLibrary,
}) {
  return (
    <Modal
      visible={visible} // 이 컴포넌트를 보여줄 지 숨길 지
      transparent={true} // 배경을 투명하게 (모달 뒤가 보임)
      animationType="fade" // slide : 아래에서 위로 슬라이드,  fade: 서서히 나타나는 효과, none: 아무 효과 x(default)
      onRequestClose={onClose} //안드로이드에서 뒤로가기를 누르면 호출됨. onclose->모달을 닫는 함수, 모달의 검정색 영역을 눌렀을 때 호출.
    >
      <Pressable style={styles.background} onPress={onClose}>
        <View styles={styles.whiteBox}>
          <Pressable
            style={styles.actionButton}
            android_ripple={{color: '#eee'}}
            onPress={() => {
              onLaunchCamera();
              onClose();
            }}>
            <Icon
              name="camera-alt"
              color="#757575"
              size={24}
              style={styles.icon}
            />
            <Text style={styles.actionText}> 카메라로 촬영하기 </Text>
          </Pressable>
          <Pressable
            style={styles.actionButton}
            android_ripple={{color: '#eee'}}
            onPress={() => {
              onLaunchImageLibrary();
              onClose();
            }}>
            <Icon name="photo" color="#757575" size={24} style={styles.icon} />
            <Text style={styles.actionText}> 사진 선택하기 </Text>
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  whiteBox: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 4,
    elevation: 2,
  },
  actionButton: {
    borderRadius: 18,
    backgroundColor: 'white',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 8,
  },
  icon: {
    marginRight: 8,
  },
  text: {
    fontSize: 16,
  },
});
export default UploadModeModal;
