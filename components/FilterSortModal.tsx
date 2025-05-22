import { Modal, Pressable, View, Text, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SortBy, StateOrAll, TypeOrAll } from 'types/FilterTypes';
import { useEffect, useRef } from 'react';

type FilterSortModalProps = {
  visible: boolean;
  onClose: () => void;
  allStates: StateOrAll[];
  stateFilter: StateOrAll;
  setStateFilter: (val: StateOrAll) => void;
  allTypes: TypeOrAll[];
  typeFilter: TypeOrAll;
  setTypeFilter: (val: TypeOrAll | 'All') => void;
  sortOptions: { label: string; value: SortBy }[];
  sortBy: SortBy;
  setSortBy: (val: SortBy) => void;
};

export default function FilterSortModal({
  visible,
  onClose,
  allStates,
  stateFilter,
  setStateFilter,
  allTypes,
  typeFilter,
  setTypeFilter,
  sortOptions,
  sortBy,
  setSortBy,
}: FilterSortModalProps) {
  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <Pressable
        className="flex-1"
        onPress={onClose}
        style={{ position: 'relative', width: '100%', height: '100%', top: 10 }}>
        
        <LinearGradient
          colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0)', 'rgba(0,0,0,0.1)', 'rgba(0,0,0,0.2)']}
          locations={[0, 0.1, 0.8, 1]}
          style={{ flex: 1 }}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        />

      </Pressable>
      <View className="rounded-t-2xl bg-white p-6">
        <Text className="mb-4 text-lg font-bold">Filter by State</Text>
        <View className="flex-row flex-wrap">
          {allStates.map((state) => (
            <Pressable
              key={state}
              className={`m-1 rounded px-3 py-2 ${
                stateFilter === state ? 'bg-blue-100' : 'bg-gray-100'
              }`}
              onPress={() => setStateFilter(state)}>
              <Text className={stateFilter === state ? 'font-bold text-blue-600' : 'text-gray-600'}>
                {state}
              </Text>
            </Pressable>
          ))}
        </View>
        <Text className="mb-4 mt-6 text-lg font-bold">Filter by Type</Text>
        <View className="flex-row flex-wrap">
          {allTypes.map((type) => (
            <Pressable
              key={type}
              className={`m-1 rounded px-3 py-2 ${
                typeFilter === type ? 'bg-blue-100' : 'bg-gray-100'
              }`}
              onPress={() => setTypeFilter(type)}>
              <Text className={typeFilter === type ? 'font-bold text-blue-600' : 'text-gray-600'}>
                {type}
              </Text>
            </Pressable>
          ))}
        </View>
        <Text className="mb-4 mt-6 text-lg font-bold">Order By</Text>
        <View className="flex-row items-center justify-between ">
          {sortOptions.map((order) => (
            <Pressable
              key={order.value}
              className={`m-1 rounded px-3 py-2 ${
                sortBy === order.value ? 'bg-blue-100' : 'bg-gray-100'
              }`}
              onPress={() => setSortBy(order.value)}>
              <Text
                className={sortBy === order.value ? 'font-bold text-blue-600' : 'text-gray-600'}>
                {order.label}
              </Text>
            </Pressable>
          ))}
        </View>
        <Pressable className="mt-6 items-center py-2" onPress={onClose}>
          <Text className="text-lg text-gray-500 rounded bg-gray-100 px-4 py-2 mb-4">Done</Text>
        </Pressable>
      </View>
    </Modal>
  );
}
