import React, { useState } from "react";
import { View, Modal, Text, StyleSheet, Pressable } from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";

const infoModal = (props) => {
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={props.showModal}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
      onDismiss={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalView}>
          <View style={styles.modalRow}>
            <Text style={styles.modalRowText}>Påtropp</Text>
            <Pressable onPress={() => setPaatropp(!paatropp)}>
              <Ionicons
                name={paatropp ? "checkbox" : "square-outline"}
                size={35}
                color={Colors.secondary}
              />
            </Pressable>
          </View>
          <View style={styles.modalRow}>
            <Text style={styles.modalRowText}>Avtropp</Text>
            <Pressable onPress={() => setAvtropp(!avtropp)}>
              <Ionicons
                name={avtropp ? "checkbox" : "square-outline"}
                size={35}
                color={Colors.secondary}
              />
            </Pressable>
          </View>
          <View style={styles.modalRow}>
            <Text style={styles.modalRowText}>Rutine</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>

              <Text style={styles.modalRowText}>min</Text>
            </View>
            <Pressable onPress={() => setRutine(!rutine)}>
              <Ionicons
                name={rutine ? "checkbox" : "square-outline"}
                size={35}
                color={Colors.secondary}
              />
            </Pressable>
          </View>
          <Pressable
            style={styles.modalBtn}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text style={styles.modalBtnText}>Lagre</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({});

export default infoModal;
