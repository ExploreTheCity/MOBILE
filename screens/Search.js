import React, { useRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "./components/colors";
import Header from "./components/Header";
import MenuContainer from "./components/MenuContainer";

const Search = () => {
  const navigation = useNavigation();
  const scrollViewRef = useRef(null);

  const cardData = [
    {
      id: 1,
      title: "Food",
      description:
        "Where can I find good places to eat in different cities? If you think I am looking for restaurant recommendations, voila!",
      image:
        "https://www.foodbusinessnews.net/ext/resources/2020/4/CoupleAtRestaurant_Lead.jpg?height=667&t=1587991293&width=1080",
      screen: "Food",
    },
    {
      id: 2,
      title: "Transportation",
      description:
        "Looking for transportation options across different cities? The best transportation vehicle for ...",
      image:
        "https://nextcity.org/images/made/nyc_subwaypassengers_920_613_80.jpg",
      screen: "Transportation",
    },
    {
      id: 3,
      title: "Travel Hacks",
      description:
        "For those who are just starting to travel... Travel hacks just dropped!",
      image: "https://i.ytimg.com/vi/0DExNkI9b68/maxresdefault.jpg",
      screen: "TravelHacks",
    },
    {
      id: 4,
      title: "With Pools",
      description:
        "Explore top hotels with amazing pool facilities to relax and unwind.",
      image:
        "https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2Ff23b062c-52b8-404e-8d80-fdb5451305e1.jpg?crop=1564%2C880%2C318%2C0&resize=360",
      screen: "",
    },
    {
      id: 5,
      title: "Exclusive",
      description:
        "Discover exclusive hotels that offer unique and luxurious experiences.",
      image:
        "https://images.etstur.com/imgproxy/files/images/hotelImages/TR/50278/l/Alva-Donna-Exclusive-Hotel---Spa-Genel-379911.jpg",
      screen: "",
    },
    {
      id: 6,
      title: "Hostels",
      description:
        "Find affordable and social hostels perfect for backpackers and solo travelers.",
      image:
        "https://cdn.internationalstudent.com/images/stock-images/youth-hostel.jpg",
      screen: "",
    },
    {
      id: 7,
      title: "Vegan Options",
      description:
        "Explore the best restaurants offering delicious vegan dishes across cities.",
      image:
        "https://djn5iqj8vm44t.cloudfront.net/photos/405/wildgroei_628c21cb99130_1200.jpg",
      screen: "",
    },
    {
      id: 8,
      title: "Meat Lovers",
      description:
        "Find top spots that serve the best meat dishes, from steaks to BBQ.",
      image:
        "https://www.opentable.co.uk/blog/wp-content/uploads/sites/110/2019/01/Blacklock1.jpg",
      screen: "",
    },
    {
      id: 9,
      title: "Junk Foods",
      description:
        "Indulge in the best junk food places that offer guilty pleasures.",
      image:
        "https://assets-global.website-files.com/63f501f2fcfc599ea419f99b/658d87324992dbbb7e2ea4a5_iStock-1349097627.jpg",
      screen: "",
    },
    {
      id: 10,
      title: "Amusement Parks",
      description:
        "Find the most exciting amusement parks for thrill-seekers and families.",
      image:
        "https://gttp.imgix.net/418659/x/0/16-must-visit-amusement-parks-theme-parks-and-waterparks-in-the-philippines-13.jpg?auto=compress%2Cformat&ch=Width%2CDPR&dpr=1&ixlib=php-3.3.0&w=883",
      screen: "",
    },
    {
      id: 11,
      title: "Outdoor Sports",
      description:
        "Discover top destinations for outdoor sports and adventure activities.",
      image:
        "https://temeculacreekoptometrist.com/wp-content/uploads/2023/07/Summer-Activities-and-Vision-Swimming-Outdoor-Sports-and-Eye-Safety.png",
      screen: "",
    },
    {
      id: 12,
      title: "Handmade art",
      description: "Made with love.",
      image:
        "https://madeincumbria.co.uk/wp-content/uploads/2023/07/Made-In-Cumbria-Header.jpg",
      screen: "",
    },
  ];

  const handleCardPress = (screen) => {
    navigation.navigate(screen);
  };

  const handleHotelPress = () => {
    scrollToSection("Hotels");
  };

  const handleRestaurantPress = () => {
    scrollToSection("Restaurants");
  };

  const handleActivitiesPress = () => {
    scrollToSection("Activities");
  };

  const scrollToSection = (section) => {
    if (scrollViewRef.current) {
      const yOffset = sectionOffsets[section];
      scrollViewRef.current.scrollTo({ y: yOffset, animated: true });
    }
  };

  const sectionOffsets = {
    Tips: 0,
    Hotels: 320,
    Restaurants: 640,
    Activities: 960,
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />

      <ScrollView
        style={styles.scrollView}
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.searchContainer}>
          <MenuContainer
            onHotelPress={handleHotelPress}
            onRestaurantPress={handleRestaurantPress}
            onActivitiesPress={handleActivitiesPress}
          />
        </View>

        {/* Top Tips */}
        <View
          style={styles.sectionContainer}
          onLayout={(event) =>
            (sectionOffsets.Tips = event.nativeEvent.layout.y)
          }
        >
          <Text style={styles.sectionTitle}>Top Tips</Text>
          <TouchableOpacity
            style={styles.exploreMore}
            onPress={() => handleCardPress("Activities")}
          >
            <Text style={styles.exploreText}>Explore more</Text>
            <Ionicons
              name="arrow-forward-circle-outline"
              color={COLORS.black}
              size={18}
            />
          </TouchableOpacity>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {cardData
              .filter((card) => [1, 2, 3].includes(card.id))
              .map((card) => (
                <TouchableOpacity
                  key={card.id}
                  style={styles.card}
                  onPress={() => handleCardPress(card.screen)}
                >
                  <Image
                    source={{ uri: card.image }}
                    style={styles.cardImage}
                  />
                  <Text style={styles.cardTitle}>{card.title}</Text>
                  <Text style={styles.cardDescription}>{card.description}</Text>
                </TouchableOpacity>
              ))}
          </ScrollView>
        </View>

        {/* Top Hotels */}
        <View
          style={styles.sectionContainer}
          onLayout={(event) =>
            (sectionOffsets.Hotels = event.nativeEvent.layout.y)
          }
        >
          <Text style={styles.sectionTitle}>Top Hotels by Cities</Text>
          <TouchableOpacity
            style={styles.exploreMore}
            onPress={() => handleCardPress("Hotels")}
          >
            <Text style={styles.exploreText}>Explore more</Text>
            <Ionicons
              name="arrow-forward-circle-outline"
              color={COLORS.black}
              size={18}
            />
          </TouchableOpacity>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {cardData
              .filter((card) => [4, 5, 6].includes(card.id))
              .map((card) => (
                <TouchableOpacity
                  key={card.id}
                  style={styles.card}
                  onPress={() => handleCardPress(card.screen)}
                >
                  <Image
                    source={{ uri: card.image }}
                    style={styles.cardImage}
                  />
                  <Text style={styles.cardTitle}>{card.title}</Text>
                  <Text style={styles.cardDescription}>{card.description}</Text>
                </TouchableOpacity>
              ))}
          </ScrollView>
        </View>

        {/* Top Restaurants */}
        <View
          style={styles.sectionContainer}
          onLayout={(event) =>
            (sectionOffsets.Restaurants = event.nativeEvent.layout.y)
          }
        >
          <Text style={styles.sectionTitle}>Top Restaurants by Cities</Text>
          <TouchableOpacity
            style={styles.exploreMore}
            onPress={() => handleCardPress("Restaurants")}
          >
            <Text style={styles.exploreText}>Explore more</Text>
            <Ionicons
              name="arrow-forward-circle-outline"
              color={COLORS.black}
              size={18}
            />
          </TouchableOpacity>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {cardData
              .filter((card) => [7, 8, 9].includes(card.id))
              .map((card) => (
                <TouchableOpacity
                  key={card.id}
                  style={styles.card}
                  onPress={() => handleCardPress(card.screen)}
                >
                  <Image
                    source={{ uri: card.image }}
                    style={styles.cardImage}
                  />
                  <Text style={styles.cardTitle}>{card.title}</Text>
                  <Text style={styles.cardDescription}>{card.description}</Text>
                </TouchableOpacity>
              ))}
          </ScrollView>
        </View>

        {/* Top Activities */}
        <View
          style={styles.sectionContainer}
          onLayout={(event) =>
            (sectionOffsets.Activities = event.nativeEvent.layout.y)
          }
        >
          <Text style={styles.sectionTitle}>Top Activities by Cities</Text>
          <TouchableOpacity
            style={styles.exploreMore}
            onPress={() => handleCardPress("Activities")}
          >
            <Text style={styles.exploreText}>Explore more</Text>
            <Ionicons
              name="arrow-forward-circle-outline"
              color={COLORS.black}
              size={18}
            />
          </TouchableOpacity>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {cardData
              .filter((card) => [10, 11, 12].includes(card.id))
              .map((card) => (
                <TouchableOpacity
                  key={card.id}
                  style={styles.card}
                  onPress={() => handleCardPress(card.screen)}
                >
                  <Image
                    source={{ uri: card.image }}
                    style={styles.cardImage}
                  />
                  <Text style={styles.cardTitle}>{card.title}</Text>
                  <Text style={styles.cardDescription}>{card.description}</Text>
                </TouchableOpacity>
              ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 6,
    backgroundColor: COLORS.background,
    marginBottom: 6,
    columnGap: 24,
  },
  scrollView: {
    flex: 1,
  },
  searchContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  sectionContainer: {
    marginTop: 16,
    paddingHorizontal: 12,
  },
  sectionTitle: {
    fontSize: 24,
    color: COLORS.primary,
    fontWeight: "600",
    marginBottom: 6,
  },
  exploreMore: {
    flexDirection: "row",
    alignItems: "center",
  },
  exploreText: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.gray,
    paddingHorizontal: 4,
    marginBottom: 8,
    color: COLORS.black,
  },
  card: {
    marginRight: 12,
    width: 240,
    borderRadius: 8,
    elevation: 5,
    overflow: "hidden",
    marginBottom: 16,
  },
  cardImage: {
    width: "100%",
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 6,
  },
  cardDescription: {
    fontSize: 14,
    color: COLORS.gray,
  },
});

export default Search;
