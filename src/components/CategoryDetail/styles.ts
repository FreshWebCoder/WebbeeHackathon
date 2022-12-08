import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    paddingVertical: 8
  },
  header: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
    paddingBottom: 8,
    marginBottom: 4
  },
  title: {
    flex: 1,
    paddingRight: 4,
  },
  noItemText: {
    width: "100%",
    textAlign: "center",
    paddingVertical: 4,
    color: "#AAA"
  }
});
