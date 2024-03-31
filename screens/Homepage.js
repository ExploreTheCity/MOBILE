import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TextInput } from 'react-native';

const citiesData = [
  { id: 1, name: 'Adana', image: 'https://api.dokay.com.tr/storage/1476/63280f8b1e3bc7.40466361.jpg', description: 'Description of Adana' },
  { id: 2, name: 'Adıyaman', image: 'https://api.dokay.com.tr/storage/1476/63280f8b1e3bc7.40466361.jpg', description: 'Description of AdÄ±yaman' },
  { id: 3, name: 'Afyonkarahisar', image: 'https://api.dokay.com.tr/storage/1476/63280f8b1e3bc7.40466361.jpg', description: 'Description of Afyonkarahisar' },
  { id: 4, name: 'AÄŸrÄ±', image: 'https://api.dokay.com.tr/storage/1476/63280f8b1e3bc7.40466361.jpg', description: 'Description of AÄŸrÄ±' },
  { id: 5, name: 'Amasya', image: 'https://api.dokay.com.tr/storage/1476/63280f8b1e3bc7.40466361.jpg', description: 'Description of Amasya' },
  { id: 6, name: 'Ankara', image: 'https://api.dokay.com.tr/storage/1476/63280f8b1e3bc7.40466361.jpg', description: 'Description of Ankara' },
  { id: 7, name: 'Antalya', image: 'https://api.dokay.com.tr/storage/1476/63280f8b1e3bc7.40466361.jpg', description: 'Description of Antalya' },
  { id: 8, name: 'Artvin', image: 'https://api.dokay.com.tr/storage/1476/63280f8b1e3bc7.40466361.jpg', description: 'Description of Artvin' },
  { id: 9, name: 'AydÄ±n', image: 'https://api.dokay.com.tr/storage/1476/63280f8b1e3bc7.40466361.jpg', description: 'Description of AydÄ±n' },
  { id: 10, name: 'BalÄ±kesir', image: 'https://api.dokay.com.tr/storage/1476/63280f8b1e3bc7.40466361.jpg', description: 'Description of BalÄ±kesir' },
  { id: 11, name: 'Bilecik', image: 'https://api.dokay.com.tr/storage/1476/63280f8b1e3bc7.40466361.jpg', description: 'Description of Bilecik' },
  { id: 12, name: 'BingÃ¶l', image: 'https://api.dokay.com.tr/storage/1476/63280f8b1e3bc7.40466361.jpg', description: 'Description of BingÃ¶l' },
  { id: 13, name: 'Bitlis', image: 'https://api.dokay.com.tr/storage/1476/63280f8b1e3bc7.40466361.jpg', description: 'Description of Bitlis' },
  { id: 14, name: 'Bolu', image: 'https://api.dokay.com.tr/storage/1476/63280f8b1e3bc7.40466361.jpg', description: 'Description of Bolu' },
  { id: 15, name: 'Burdur', image: 'https://api.dokay.com.tr/storage/1476/63280f8b1e3bc7.40466361.jpg', description: 'Description of Burdur' },
  { id: 16, name: 'Bursa', image: 'https://api.dokay.com.tr/storage/1476/63280f8b1e3bc7.40466361.jpg', description: 'Description of Bursa' },
  { id: 17, name: 'Çanakkale', image: 'https://api.dokay.com.tr/storage/1476/63280f8b1e3bc7.40466361.jpg', description: 'Description of Ã‡anakkale' },
  { id: 18, name: 'Ã‡ankÄ±rÄ±', image: 'https://api.dokay.com.tr/storage/1476/63280f8b1e3bc7.40466361.jpg', description: 'Description of Ã‡ankÄ±rÄ±' },
  { id: 19, name: 'Ã‡orum', image: 'https://api.dokay.com.tr/storage/1476/63280f8b1e3bc7.40466361.jpg', description: 'Description of Ã‡orum' },
  { id: 20, name: 'Denizli', image: 'https://api.dokay.com.tr/storage/1476/63280f8b1e3bc7.40466361.jpg', description: 'Description of Denizli' },
  { id: 21, name: 'DiyarbakÄ±r', image: 'https://api.dokay.com.tr/storage/1476/63280f8b1e3bc7.40466361.jpg', description: 'Description of DiyarbakÄ±r' },
  { id: 22, name: 'Edirne', image: 'https://api.dokay.com.tr/storage/1476/63280f8b1e3bc7.40466361.jpg', description: 'Description of Edirne' },
  { id: 23, name: 'ElazÄ±ÄŸ', image: 'https://api.dokay.com.tr/storage/1476/63280f8b1e3bc7.40466361.jpg', description: 'Description of ElazÄ±ÄŸ' },
  { id: 24, name: 'Erzincan', image: 'https://api.dokay.com.tr/storage/1476/63280f8b1e3bc7.40466361.jpg', description: 'Description of Erzincan' },
  { id: 25, name: 'Erzurum', image: 'https://api.dokay.com.tr/storage/1476/63280f8b1e3bc7.40466361.jpg', description: 'Description of Erzurum' },
  { id: 26, name: 'EskiÅŸehir', image: 'https://api.dokay.com.tr/storage/1476/63280f8b1e3bc7.40466361.jpg', description: 'Description of EskiÅŸehir' },
  { id: 27, name: 'Gaziantep', image: 'https://api.dokay.com.tr/storage/1476/63280f8b1e3bc7.40466361.jpg', description: 'Description of Gaziantep' },
  { id: 28, name: 'Giresun', image: 'https://api.dokay.com.tr/storage/1476/63280f8b1e3bc7.40466361.jpg', description: 'Description of Giresun' },
  { id: 29, name: 'GÃ¼mÃ¼ÅŸhane', image: 'https://api.dokay.com.tr/storage/1476/63280f8b1e3bc7.40466361.jpg', description: 'Description of GÃ¼mÃ¼ÅŸhane' },
  { id: 30, name: 'Hakkari', image: 'https://api.dokay.com.tr/storage/1476/63280f8b1e3bc7.40466361.jpg', description: 'Description of Hakkari' },
  { id: 31, name: 'Hatay', image: 'https://api.dokay.com.tr/storage/1476/63280f8b1e3bc7.40466361.jpg', description: 'Description of Hatay' },
  { id: 32, name: 'Isparta', image: 'https://api.dokay.com.tr/storage/1476/63280f8b1e3bc7.40466361.jpg', description: 'Description of Isparta' },
  { id: 33, name: 'Mersin', image: 'https://api.dokay.com.tr/storage/1476/63280f8b1e3bc7.40466361.jpg', description: 'Description of Mersin' },
  { id: 34, name: 'İstanbul', image: 'https://api.dokay.com.tr/storage/1476/63280f8b1e3bc7.40466361.jpg', description: 'Description of Ä°stanbul' },
  { id: 35, name: 'İzmir', image: 'https://api.dokay.com.tr/storage/1476/63280f8b1e3bc7.40466361.jpg', description: 'Description of Ä°zmir' },
  { id: 36, name: 'Kars', image: 'https://api.dokay.com.tr/storage/1476/63280f8b1e3bc7.40466361.jpg', description: 'Description of Kars' },
  { id: 37, name: 'Kastamonu', image: 'https://api.dokay.com.tr/storage/1476/63280f8b1e3bc7.40466361.jpg', description: 'Description of Kastamonu' },
  { id: 38, name: 'Kayseri', image: 'https://api.dokay.com.tr/storage/1476/63280f8b1e3bc7.40466361.jpg', description: 'Description of Kayseri' },
  { id: 39, name: 'Kırklareli', image: 'https://api.dokay.com.tr/storage/1476/63280f8b1e3bc7.40466361.jpg', description: 'Description of KÄ±rklareli' },
  { id: 40, name: 'KÄ±rÅŸehir', image: 'https://api.dokay.com.tr/storage/1476/63280f8b1e3bc7.40466361.jpg', description: 'Description of KÄ±rÅŸehir' },
  { id: 41, name: 'Kocaeli', image: 'https://api.dokay.com.tr/storage/1476/63280f8b1e3bc7.40466361.jpg', description: 'Description of Kocaeli' },
  { id: 42, name: 'Konya', image: 'https://api.dokay.com.tr/storage/1476/63280f8b1e3bc7.40466361.jpg', description: 'Description of Konya' },
  { id: 43, name: 'Kütahya', image: 'https://api.dokay.com.tr/storage/1476/63280f8b1e3bc7.40466361.jpg', description: 'Description of KÃ¼tahya' },
  { id: 44, name: 'Malatya', image: 'https://api.dokay.com.tr/storage/1476/63280f8b1e3bc7.40466361.jpg', description: 'Description of Malatya' },
  { id: 45, name: 'Manisa', image: 'https://api.dokay.com.tr/storage/1476/63280f8b1e3bc7.40466361.jpg', description: 'Description of Manisa' },
  { id: 46, name: 'KahramanmaraÅŸ', image: 'https://api.dokay.com.tr/storage/1476/63280f8b1e3bc7.40466361.jpg', description: 'Description of KahramanmaraÅŸ' },
  { id: 47, name: 'Mardin', image: 'https://api.dokay.com.tr/storage/1476/63280f8b1e3bc7.40466361.jpg', description: 'Description of Mardin' },
];

const popularCities = citiesData.slice(0, 6); 

const Homepage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCities, setFilteredCities] = useState(popularCities);
  const handleSearch = (text) => {
    setSearchQuery(text);
    const filtered = citiesData.filter(city =>
      city.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredCities(filtered);
  };

  return (
    <ScrollView>

      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for places or events in Turkey"
          placeholderTextColor="#999999"
          onChangeText={handleSearch}
          value={searchQuery}
        />
      </View>


      <View style={styles.header}>
        <Text style={styles.headerText}>Turkey Guide</Text>
      </View>


      <View style={styles.content}>

        {filteredCities.map(city => (
          <View style={styles.card} key={city.id}>
            <Image
              source={{ uri: city.image }}
              style={styles.cardImage}
            />
            <Text style={styles.cardTitle}>{city.name}</Text>
            <Text style={styles.cardDescription}>{city.description}</Text>
          </View>
        ))}
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Turkey Guide Â© 2024</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    alignItems: 'center',
  },
  searchInput: {
    width: '100%',
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    fontSize: 16,
  },
  header: {
    padding: 20,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    padding: 20,
  },
  card: {
    width: '45%',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  cardImage: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    marginLeft: 10,
  },
  cardDescription: {
    fontSize: 14,
    marginLeft: 10,
    marginBottom: 10,
  },
  footer: {
    backgroundColor: '#ffffff',
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#999999',
  },
});

export default Homepage;