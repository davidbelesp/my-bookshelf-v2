import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  Switch,
  Alert,
} from 'react-native';
import uuid from 'react-native-uuid';
import { saveBooks, loadBooks } from '../storage/bookStorage';
import { BookModel } from '../models/BookModel';
import { Type } from '../models/Type';
import { State } from '../models/State';

export default function AddBookScreen({ navigation }: any) {
  const [title, setTitle] = useState('');
  const [type, setType] = useState<Type>(Type.LightNovel);
  const [state, setState] = useState<State>(State.PlanToRead);
  const [chapter, setChapter] = useState(0);
  const [volume, setVolume] = useState(0);
  const [score, setScore] = useState(0);
  const [nsfw, setNsfw] = useState(false);
  const [image, setImage] = useState('');

  const handleSave = async () => {
    if (!title.trim()) {
      Alert.alert('Title is required');
      return;
    }

    const newBook: BookModel = {
      uuid: uuid.v4() as string,
      title,
      type,
      state,
      chapter,
      volume,
      score,
      nsfw,
      image,
      comments: [],
      lastRead: Date.now(),
    };

    const books = await loadBooks();
    await saveBooks([newBook, ...books]);
    navigation.navigate('Books');
  };

  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Text className="text-lg font-bold mb-2">Title</Text>
      <TextInput
        className="border border-gray-300 rounded p-2 mb-4"
        value={title}
        onChangeText={setTitle}
      />

      <Text className="font-semibold">Type: {type}</Text>
      <ScrollView horizontal className="flex-row mb-4">
        {(Object.values(Type) as Type[]).map((t) => (
          <Button key={t} title={t} onPress={() => setType(t)} />
        ))}
      </ScrollView>

      <Text className="font-semibold">State: {state}</Text>
      <ScrollView horizontal className="flex-row mb-4">
        {(Object.values(State) as State[]).map((s) => (
          <Button key={s} title={s} onPress={() => setState(s)} />
        ))}
      </ScrollView>

      <Text className="font-semibold">Chapter</Text>
      <TextInput
        className="border border-gray-300 rounded p-2 mb-4"
        keyboardType="numeric"
        value={chapter.toString()}
        onChangeText={(v) => setChapter(parseInt(v) || 0)}
      />

      <Text className="font-semibold">Volume</Text>
      <TextInput
        className="border border-gray-300 rounded p-2 mb-4"
        keyboardType="numeric"
        value={volume.toString()}
        onChangeText={(v) => setVolume(parseInt(v) || 0)}
      />

      <Text className="font-semibold">Score</Text>
      <TextInput
        className="border border-gray-300 rounded p-2 mb-4"
        keyboardType="numeric"
        value={score.toString()}
        onChangeText={(v) => setScore(parseInt(v) || 0)}
      />

      <Text className="font-semibold mb-1">Image URL (optional)</Text>
      <TextInput
        className="border border-gray-300 rounded p-2 mb-4"
        value={image}
        onChangeText={setImage}
      />

      <View className="flex-row items-center justify-between mb-6">
        <Text className="font-semibold">NSFW</Text>
        <Switch value={nsfw} onValueChange={setNsfw} />
      </View>

      <Button title="Save Book" onPress={handleSave} />
    </ScrollView>
  );
}
