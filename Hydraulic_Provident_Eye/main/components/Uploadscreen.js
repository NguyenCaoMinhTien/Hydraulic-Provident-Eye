import React, { useState } from 'react';
import { View, Button, Alert, StyleSheet } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import axios from 'axios';

const UploadScreen = () => {
  const [filePath, setFilePath] = useState(null);

  const selectVideo = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'video/*',
        copyToCacheDirectory: true,
      });

      if (result.type === 'success') {
        setFilePath(result.uri);
        Alert.alert('Thành công', `Video đã được chọn:\n${result.uri}`);
      }
    } catch (error) {
      console.error('Lỗi khi chọn file:', error);
    }
  };

  const uploadVideo = async () => {
    if (!filePath) {
      Alert.alert('Lỗi', 'Bạn cần chọn một video trước.');
      return;
    }
  
    const formData = new FormData();
    formData.append('video', {
      uri: filePath,
      name: 'video.mp4',
      type: 'video/mp4',
    });
  
    try {
      const response = await axios.post('http://192.168.1.116:8000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
  
      console.log(response.data);
      Alert.alert('Thành công', `Video đã được tải lên:\n${response.data.filePath}`);
    } catch (error) {
      console.error('Lỗi khi tải video lên:', error);
      Alert.alert('Lỗi', 'Không thể tải video lên server.');
    }
  };
  

  return (
    <View style={styles.screen}>
      <Button title="Chọn Video" onPress={selectVideo} />
      {filePath && <Button title="Tải Video Lên" onPress={uploadVideo} />}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default UploadScreen;
