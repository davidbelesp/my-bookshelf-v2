import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  Switch,
  Image,
  Alert,
  Pressable,
} from 'react-native';
import { BookModel } from '../models/BookModel';
import { State } from '../models/State';
import { Type } from '../models/Type';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { MaterialIcons } from '@expo/vector-icons';
import { loadBooks, saveBooks } from 'storage/bookStorage';

type BookFormData = Partial<BookModel> & { deleted?: boolean };

type Props = {
  initial?: Partial<BookModel>;
  onSubmit: (book: BookFormData) => void;
  submitLabel?: string;
};

export default function BookForm({ initial = {}, onSubmit, submitLabel = 'Save Book' }: Props) {
  const [title, setTitle] = useState(initial.title || '');
  const [type, setType] = useState<Type>(initial.type || Type.LightNovel);
  const [state, setState] = useState<State>(initial.state || State.PlanToRead);
  const [chapter, setChapter] = useState(initial.chapter || 0);
  const [volume, setVolume] = useState(initial.volume || 0);
  const [score, setScore] = useState(initial.score || 1);
  const [nsfw, setNsfw] = useState(initial.nsfw || false);
  const [image, setImage] = useState(initial.image || '');

  // 🔍 Try to load existing image from file system
  useEffect(() => {
    if (initial?.uuid) {
      const path = FileSystem.documentDirectory + `${initial.uuid}.png`;
      FileSystem.getInfoAsync(path).then((info) => {
        if (info.exists) {
          setImage(path);
        }
      });
    }
  }, [initial?.uuid]);

  // 📸 Handle selecting + saving image
  const handlePickImage = async () => {
    if (!initial?.uuid) {
      Alert.alert('You must save the book first before setting the cover image.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled && result.assets.length > 0) {
      const localUri = result.assets[0].uri;
      const newPath = FileSystem.documentDirectory + `${initial.uuid}.png`;

      try {
        await FileSystem.copyAsync({
          from: localUri,
          to: newPath,
        });
        setImage(newPath);
      } catch (err: any) {
        Alert.alert('Error saving image', err.message);
      }
    }
  };

  const handleSubmit = () => {
    onSubmit({
      ...initial,
      title,
      type,
      state,
      chapter,
      volume,
      score,
      nsfw,
      image,
      lastRead: Date.now(),
    });
  };

  return (
    <View className="flex-1 bg-white relative flex-col">
      <ScrollView className="flex-1 bg-white p-4">
        {/* 📸 Cover Image Picker */}
        <View className="mb-6 items-center">
          <Pressable onPress={handlePickImage}>
            {image ? (
              <Image source={{ uri: image }} className="h-32 w-32 rounded bg-gray-200" />
            ) : (
              <View className="h-32 w-32 items-center justify-center rounded bg-gray-200">
                <Text className="text-gray-500">Tap to add image</Text>
              </View>
            )}
          </Pressable>
        </View>

        {/* 📖 Book Details */}
        <Text className="mb-2 text-lg font-bold">Title</Text>
        <TextInput
          className="mb-4 rounded border border-gray-300 p-2"
          value={title}
          onChangeText={setTitle}
        />

        {/* 📚 Type and State */}
        <View className="mb-4 flex-row items-center gap-4">
          <View className="flex-1">
            <Text className="mb-1 font-semibold">Type</Text>
            <View className="mb-4 rounded border border-gray-300">
              <Picker selectedValue={type} onValueChange={(itemValue) => setType(itemValue as Type)}>
                {(Object.values(Type) as Type[]).map((s) => (
                  <Picker.Item label={s} value={s} key={s} />
                ))}
              </Picker>
            </View>
          </View>

          <View className="flex-1">
            <Text className="mb-1 font-semibold">State</Text>
            <View className="mb-4 rounded border border-gray-300">
              <Picker
                selectedValue={state}
                onValueChange={(itemValue) => setState(itemValue as State)}>
                {(Object.values(State) as State[]).map((s) => (
                  <Picker.Item label={s} value={s} key={s} />
                ))}
              </Picker>
            </View>
          </View>
        </View>

        {/* 📖 Chapter */}
        <Text className="font-semibold">Chapter</Text>
        <TextInput
          className="mb-4 rounded border border-gray-300 p-2"
          keyboardType="numeric"
          value={chapter.toString()}
          onChangeText={(v) => setChapter(parseInt(v) || 0)}
        />

        {/* 📖 Volume */}
        <Text className="font-semibold">Volume</Text>
        <TextInput
          className="mb-4 rounded border border-gray-300 p-2"
          keyboardType="numeric"
          value={volume.toString()}
          onChangeText={(v) => setVolume(parseInt(v) || 0)}
        />

        {/* ⭐ Score */}
        <Text className="mb-1 font-semibold">Score</Text>
        <View className="mb-4 rounded border border-gray-300">
          <Picker selectedValue={score} onValueChange={(value) => setScore(value)}>
            {[...Array(10)].map((_, i) => (
              <Picker.Item label={(i + 1).toString()} value={i + 1} key={i + 1} />
            ))}
          </Picker>
        </View>

        {/* 🔞 NSFW Toggle */}
        <View className="mb-6 flex-row items-center justify-between">
          <Text className="font-semibold">NSFW</Text>
          <Switch value={nsfw} onValueChange={setNsfw} />
        </View>
      </ScrollView>

      {/* 🗑️ Delete and Save FAB */}
      <View className="absolute bottom-10 w-full flex-row justify-between px-10">
        {/* Delete FAB */}
        {initial?.uuid && (
          <Pressable
            onPress={() => {
              Alert.alert('Delete Book', 'Are you sure?', [
                { text: 'Cancel', style: 'cancel' },
                {
                  text: 'Delete',
                  style: 'destructive',
                  onPress: () => onSubmit({ uuid: initial?.uuid, deleted: true }),
                },
              ]);
            }}
            className="h-14 w-14 items-center justify-center rounded-full bg-red-600 shadow-lg">
            <MaterialIcons name="delete" size={32} color="white" />
          </Pressable>
        )}

        {/* Save FAB */}
        <Pressable
          onPress={handleSubmit}
          className="ml-auto h-14 w-14 items-center justify-center rounded-full bg-green-600 shadow-lg">
          <MaterialIcons name="check" size={32} color="white" />
        </Pressable>
      </View>
    </View>
  );
}
