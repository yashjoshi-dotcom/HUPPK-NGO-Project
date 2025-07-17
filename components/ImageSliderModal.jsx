import React, { useRef } from "react";
import { Dimensions, Image, View } from "react-native";
import { Modal, Portal, Text, Button, IconButton } from "react-native-paper";
import Carousel from "react-native-reanimated-carousel";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
const screenWidth = Dimensions.get("window").width;
const modalWidth = screenWidth * 0.9;

const images = [
  {
    uri: "https://cdn.pixabay.com/photo/2020/05/20/08/27/cat-5195431_1280.jpg",
  },
  {
    uri: "https://cdn.pixabay.com/photo/2020/05/20/08/27/cat-5195431_1280.jpg",
  },
];

const ImageSliderModal = ({ visible, onDismissed }) => {
  const carouselRef = useRef(null);

  const renderItem = ({ item }) => (
    <View
      style={{
        flex:1,
        alignItems: "center",
        justifyContent: "center",
        width: modalWidth,
      }}
    >
      <View>
      <Text variant="titleMedium" style={{ color: "black" }}>Image Slider</Text>
      </View>
      <View>
      <Image
        source={{ uri: item.uri }}
        style={{ width: modalWidth, height: 200, borderRadius: 10 }}
        resizeMode="cover"
      />
      </View>
    </View>
  );

  return (
    <Portal>
      <Modal visible={visible} onDismiss={onDismissed} contentContainerStyle={{flex:1,width:modalWidth,margin:'auto',justifyContent: "center",
            alignItems: "center"}}>
        <View>
          <View
            style={{
              backgroundColor: "white",
              padding: 20,
              borderRadius: 10,
              width: modalWidth,
            }}
          >
            <Text variant="titleMedium" style={{ color: "black" }}>Image Slider</Text>

            <View style={{ height: 250, marginVertical: 20, overflow: "hidden" }}>
              <Carousel
                ref={carouselRef}
                loop
                width={modalWidth}
                height={240}
                autoPlay={false}
                data={images}
                scrollAnimationDuration={800}
                renderItem={renderItem}
              />
            </View>

            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <IconButton
                icon={({ size, color }) => (
                  <MaterialCommunityIcons
                    name="chevron-left"
                    size={size}
                    color={"rgb(66 6 223)"}
                  />
                )}
                onPress={() => carouselRef.current?.prev()}
              />

              <IconButton
                icon={({ size, color }) => (
                  <MaterialCommunityIcons
                    name="chevron-right"
                    size={size}
                    color={"rgb(66 6 223)"}
                  />
                )}
                onPress={() => carouselRef.current?.next()}
              />
            </View>

            <Button mode="outlined" labelStyle={{fontWeight:19}} onPress={onDismissed} textColor="rgb(66 6 223)">Close</Button>
          </View>
        </View>
      </Modal>
    </Portal>
  );
};

export default ImageSliderModal;
