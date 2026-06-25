import {StyleSheet} from "react-native";

export const colors = {
        background: '#1a1a2e',
        text: '#ffffff'
};

export const globalStyles = StyleSheet.create({
    container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textDecorationLine: "underline",
    color: colors.text,
    marginTop: 50
  },
  paragraphs:{
    color: colors.text
  },
  contWithHeader: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.background
  },
  label: {
    alignSelf: 'center',
  }
});