import { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, Switch, Image, Alert, Pressable } from 'react-native';
import { BookModel } from '../models/BookModel';
import { State } from '../models/State';
import { Type } from '../models/Type';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { MaterialIcons } from '@expo/vector-icons';
import { ActionSheetPicker } from './ActionSheetPicker';
import NumericInput from './NumericInput';
import uuid from 'react-native-uuid';

type BookFormData = Partial<BookModel> & { deleted?: boolean };

type Props = {
  initial?: Partial<BookModel>;
  onSubmit: (book: BookFormData) => void;
  submitLabel?: string;
};

export default function BookForm({ initial = {}, onSubmit, submitLabel = 'Save Book' }: Props) {
  const [title, setTitle] = useState<string>(initial.title || '');
  const [type, setType] = useState<Type>(initial.type || Type.LightNovel);
  const [state, setState] = useState<State>(initial.state || State.PlanToRead);
  const [chapter, setChapter] = useState(initial.chapter || 0);
  const [volume, setVolume] = useState(initial.volume || 0);
  const [score, setScore] = useState(initial.score || 1);
  const [nsfw, setNsfw] = useState(initial.nsfw || false);
  const [image, setImage] = useState<string>(initial.image || '');

  const MAX_NUMBER_INPUT = 100_000;
  const TEXT_COLOR = 'text-gray-800';

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

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    let bookUuid = initial?.uuid ?? (uuid.v4() as string);

    let finalImageUri = image;
    if (
      typeof image === 'string' &&
      FileSystem.documentDirectory &&
      !image.startsWith(FileSystem.documentDirectory)
    ) {
      const fileExtension = image.split('.').pop() || 'jpg';
      const newPath = FileSystem.documentDirectory + `${bookUuid}.${fileExtension}`;
      try {
        await FileSystem.copyAsync({
          from: image,
          to: newPath,
        });
        finalImageUri = newPath;
      } catch (ignored: any) {
        //console.error('Error copying image:', ignored);
      }
    }

    onSubmit({
      ...initial,
      uuid: bookUuid,
      title,
      type,
      state,
      chapter,
      volume,
      score,
      nsfw,
      image: finalImageUri,
      lastRead: Date.now(),
    });
  };

  return (
    <View className="relative flex-1 flex-col bg-white">
      <ScrollView className="mb-28 flex-1 p-4">
        <View className="flex-1 flex-row gap-8">
          <View className="mb-6 items-center">
            <Pressable onPress={handlePickImage}>
              {image ? (
                <Image source={{ uri: image }} className="h-44 w-32 rounded bg-gray-200" />
              ) : (
                <View className="h-44 w-32 items-center justify-center rounded bg-gray-200">
                  <Text className="text-gray-500">Tap to add image</Text>
                </View>
              )}
            </Pressable>
          </View>

          {/* 📚 State and Score */}
          <View className="flex-1 gap-2 ">
            <ActionSheetPicker<State>
              label="State"
              value={state}
              onChange={setState}
              options={Object.values(State).map((t) => ({
                label: t,
                value: t,
              }))}
            />

            {/* ⭐ Score */}
            <ActionSheetPicker
              label="Score"
              value={score}
              onChange={setScore}
              options={[...Array(10)]
                .map((_, i) => ({
                  label: (i + 1).toString(),
                  value: i + 1,
                }))
                .reverse()}
            />
          </View>
        </View>

        {/* 📖 Book Details */}
        <Text className="text-inputLabel mb-2 text-lg font-bold">Title</Text>
        <TextInput
          className="border-inputBorder text-inputText bg-inputMain mb-4 rounded border p-2"
          value={title}
          onChangeText={setTitle}
        />

        <View className="mb-4 w-full flex-1 flex-row justify-around gap-8">
          <NumericInput
            label="Chapter"
            value={chapter}
            onChange={setChapter}
            max={MAX_NUMBER_INPUT}
          />
          <NumericInput label="Volume" value={volume} onChange={setVolume} max={MAX_NUMBER_INPUT} />
        </View>

        <ActionSheetPicker<Type>
          label="Type"
          value={type}
          onChange={setType}
          options={Object.values(Type).map((t) => ({
            label: t,
            value: t,
          }))}
        />

        {/* 🔞 NSFW Toggle */}
        <View className="mb-6 mt-2 flex-row items-center justify-between">
          <Text className="text-inputLabel font-semibold">NSFW</Text>
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
            className="h-20 w-20 items-center justify-center rounded-full bg-red-600 shadow-lg">
            <MaterialIcons name="delete" size={38} color="white" />
          </Pressable>
        )}

        {/* Save FAB */}
        <Pressable
          onPress={handleSubmit}
          className="ml-auto h-20 w-20 items-center justify-center rounded-full bg-green-600 shadow-lg">
          <MaterialIcons name="check" size={38} color="white" />
        </Pressable>
      </View>
    </View>
  );
}
