import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  StatusBar,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import CircleProgress from "../components/CircleProgress";
import { MaterialIcons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");
const CIRCLE_SIZE = 200;

const ProgressGoalScreen = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const products = [
    {
      id: "1",
      name: "iPhone 14 Pro",
      image: require("../../assets/phone.png"), // Replace with actual iPhone image
    },
    {
      id: "2",
      name: "iPad Pro",
      image: require("../../assets/ipad.png"), // Replace with actual iPad image
    },
    {
      id: "3",
      name: "MacBook Air",
      image: require("../../assets/macbook.png"), // Replace with actual MacBook image
    },
  ];

  const renderProduct = ({ item }) => (
    <View style={styles.imageContainer}>
      <Image
        source={item.image}
        style={styles.productImage}
        resizeMode="contain"
      />
    </View>
  );

  const onViewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentImageIndex(viewableItems[0].index);
    }
  };

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.content}>
        <View style={styles.circleWrapper}>
          {/* Progress circle */}
          <View style={styles.progressCircle}>
            <CircleProgress
              size={CIRCLE_SIZE + 30}
              strokeWidth={15}
              percentage={75}
              color="#4CAF50"
            />
          </View>

          {/* Circular mask for images */}
          <View style={styles.circularMask}>
            <FlatList
              data={products}
              renderItem={renderProduct}
              keyExtractor={(item) => item.id}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onViewableItemsChanged={onViewableItemsChanged}
              viewabilityConfig={viewabilityConfig}
            />
          </View>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.productName}>
            {products[currentImageIndex]?.name}
          </Text>
          <View style={styles.statusSection}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>In Progress</Text>
          </View>
        </View>

        {/* Pagination dots */}
        <View style={styles.pagination}>
          {products.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                currentImageIndex === index && styles.paginationDotActive,
              ]}
            />
          ))}
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity style={styles.actionButton}>
            <MaterialIcons
              name="account-balance-wallet"
              size={24}
              color="#6C63FF"
            />
            <Text style={styles.buttonText}>Deposit</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.actionButton, styles.breakButton]}>
            <MaterialIcons
              name="pause-circle-filled"
              size={24}
              color="#EF4444"
            />
            <Text style={[styles.buttonText, styles.breakButtonText]}>
              Break
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: height * 0.1, // Brings circle up
  },
  circleWrapper: {
    width: CIRCLE_SIZE + 30,
    height: CIRCLE_SIZE + 30,
    justifyContent: "center",
    alignItems: "center",
  },
  progressCircle: {
    position: "absolute",
    width: CIRCLE_SIZE + 30,
    height: CIRCLE_SIZE + 30,
    justifyContent: "center",
    alignItems: "center",
  },
  circularMask: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  imageContainer: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  productImage: {
    width: "100%",
    height: "100%",
  },
  textContainer: {
    alignItems: "center",
    marginTop: 30,
  },
  productName: {
    fontSize: 32,
    fontWeight: "500",
    color: "#000000",
    fontFamily: "Inter",
    marginBottom: 15,
  },
  statusSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 50,
    backgroundColor: "#4CAF50",
  },
  statusText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#000000",
    fontFamily: "Inter",
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    gap: 8,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#CACACA",
  },
  paginationDotActive: {
    backgroundColor: "#4CAF50",
  },
  actionButtonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
    marginTop: 40,
    width: "100%",
    paddingHorizontal: 20,
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 28,
    backgroundColor: "#ffffff",
    borderWidth: 2,
    borderColor: "#6C63FF",
    gap: 8,
  },
  breakButton: {
    borderColor: "#EF4444",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#6C63FF",
  },
  breakButtonText: {
    color: "#EF4444",
  },
});

export default ProgressGoalScreen;
