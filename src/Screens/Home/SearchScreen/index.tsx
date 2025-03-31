import React, {useState} from 'react';
import {View, Text, TouchableOpacity, TextInput, FlatList} from 'react-native';
import {Icon} from 'src/Components';
import {Search, Close, Heart} from 'assets/icons';
import {styles} from './styles';
import {useNavigation} from '@react-navigation/native';

const SearchScreen = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [recentSearches, setRecentSearches] = useState([
    'Blue Shirt',
    'CosmicChic Jacket',
    'EnchantedElegance Dress',
    'WhimsyWhirl Top',
    'Fluffernova Coat',
    'MirageMelody Cape',
    'BlossomBreeze Overalls',
    'EnchantedElegance Dress',
    'Fluffernova Coat',
  ]);

  const handleSearch = () => {
    if (searchText.trim()) {
      setRecentSearches(prevSearches => [
        searchText,
        ...prevSearches.filter(item => item !== searchText),
      ]);
      // TODO: Implement search functionality
    }
  };

  const clearAllSearches = () => {
    setRecentSearches([]);
  };

  const deleteSearch = (searchItem: string) => {
    setRecentSearches(prevSearches =>
      prevSearches.filter(item => item !== searchItem),
    );
  };

  const renderSearchItem = ({item}: {item: string}) => (
    <TouchableOpacity
      style={styles.searchItem}
      onPress={() => setSearchText(item)}>
      <Text style={styles.searchText}>{item}</Text>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteSearch(item)}>
        <Icon name={Close} width={20} height={20} color="#8B4513" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Icon name={Heart} width={24} height={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Search</Text>
      </View>

      <View style={styles.searchContainer}>
        <Icon
          name={Search}
          width={20}
          height={20}
          color="#333333"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
      </View>

      {recentSearches.length > 0 && (
        <View>
          <View style={styles.recentHeader}>
            <Text style={styles.recentTitle}>Recent</Text>
            <TouchableOpacity
              style={styles.clearButton}
              onPress={clearAllSearches}>
              <Text style={styles.clearText}>Clear All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={recentSearches}
            renderItem={renderSearchItem}
            keyExtractor={(item, index) => `${item}-${index}`}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
    </View>
  );
};

export default SearchScreen;
