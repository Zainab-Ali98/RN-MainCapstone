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
  Alert,
} from "react-native";
import * as Progress from "react-native-progress";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");
const CIRCLE_SIZE = 200;

const ProgressGoalScreen = () => {
  const navigation = useNavigation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [savedAmount, setSavedAmount] = useState(150); // Initial saved amount

  const products = [
    {
      id: "1",
      name: "iPhone 14 Pro",
      price: 399.99,
      saved: 150,
      image: require("../../assets/phone.png"),
    },
    {
      id: "2",
      name: "iPad Pro",
      price: 799.99,
      saved: 150,
      image: require("../../assets/ipad.png"),
    },
    {
      id: "3",
      name: "MacBook Air",
      price: 999.99,
      saved: 150,
      image: require("../../assets/macbook.png"),
    },
  ];

  const currentProduct = products[currentImageIndex];
  const progress = Math.min(savedAmount / currentProduct.price, 1); // Progress value between 0 and 1

  const handleDeposit = () => {
    const depositAmount = 50;
    const newSavedAmount = savedAmount + depositAmount;

    if (newSavedAmount >= currentProduct.price) {
      Alert.alert(
        "Congratulations!",
        "You've saved enough to buy your " + currentProduct.name + "!",
        [{ text: "OK" }]
      );
    }

    setSavedAmount(newSavedAmount);
  };

  const handleBreak = () => {
    Alert.alert(
      "Break Goal",
      "Are you sure you want to break this saving goal? You'll lose your progress.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Break",
          style: "destructive",
          onPress: () => setSavedAmount(0),
        },
      ]
    );
  };

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
        <View style={styles.priceContainer}>
          <Text style={styles.savedAmount}>{savedAmount.toFixed(2)} KWD</Text>
          <Text style={styles.targetAmount}>
            / {currentProduct.price.toFixed(2)} KWD
          </Text>
        </View>

        <View style={styles.circleWrapper}>
          <View style={styles.progressCircle}>
            <Progress.Circle
              size={CIRCLE_SIZE + 30}
              progress={progress}
              thickness={15}
              color="#4CAF50"
              unfilledColor="#E5E7EB"
              borderWidth={0}
              showsText={false}
            />
          </View>

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
          <Text style={styles.productName}>{currentProduct.name}</Text>
          <View style={styles.statusSection}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>
              {progress >= 1 ? "Ready to Purchase!" : "In Progress"}
            </Text>
          </View>
        </View>

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

        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate("ChildDepositScreen")}
          >
            <MaterialIcons
              name="account-balance-wallet"
              size={24}
              color="#6C63FF"
            />
            <Text style={styles.buttonText}>Deposit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.breakButton]}
            onPress={handleBreak}
          >
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
    marginTop: height * 0.1,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 20,
  },
  savedAmount: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  targetAmount: {
    fontSize: 18,
    color: "#6B7280",
    marginLeft: 4,
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
