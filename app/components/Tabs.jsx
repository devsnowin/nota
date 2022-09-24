import {View, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import tw from 'twrnc';

import TextLight from '../styles/TextLight';

const Tabs = ({dataList, setFilteredNotes}) => {
  const [category, setCategory] = useState('All Notes');

  useEffect(() => {
    if (category !== 'All Notes') {
      if (category === 'Favorites') {
        setFilteredNotes(dataList.filter(note => note.favorite === true));
      } else {
        setFilteredNotes(dataList.filter(note => note.highlight === true));
      }
    } else {
      setFilteredNotes(dataList);
    }
  }, [category]);

  const tabNames = [
    {
      name: 'All Notes',
    },
    {
      name: 'Favorites',
    },
    {
      name: 'Highlights',
    },
  ];

  const activeTab = tw`
    bg-[#121212]
  `;

  return (
    <View style={tw`flex flex-row justify-between items-center`}>
      {tabNames.map((e, i) => (
        <TouchableOpacity
          key={i}
          style={[
            tw`rounded-full border-2 py-2 px-4`,
            category === e.name && activeTab,
          ]}
          onPress={() => setCategory(e.name)}>
          <TextLight
            text={e.name}
            style={category === e.name ? tw`text-white` : tw`text-[#121212]`}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Tabs;
