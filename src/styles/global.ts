import {StyleSheet} from "react-native";

export const colors = {
        background: '#1a1a2e',
        text: '#ffffff',
        shift: '#10B981'
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
    marginTop: 50,
    marginLeft: 15
  },
  paragraphs:{
    color: colors.text
  },
  contWithHeader: {
    flex: 1,
    //alignItems: "center",
    backgroundColor: colors.background
  },
  label: {
    
  },
  shift: {
    color: colors.shift,
  }
});