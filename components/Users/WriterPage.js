import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Icon from 'react-native-vector-icons/FontAwesome';
import {
    TouchableOpacity,
    StyleSheet,
    Text,
    View,
    Image,
} from "react-native";

export default function AuthorPage ({backSearch}) {

    return (
        <View style={styles.container}>
            <Text>
                Writer Page </Text>
                <Icon name="angle-double-left" size={30} color="black" style={styles.backIcon} onPress={backSearch} />
            
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex: 1
    },
})