import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    padding: 20,
    paddingVertical: 30,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    marginTop: 15,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  countryCode: {
    padding: 10,
    fontSize: 16,
    color: '#888',
  },
  input: {
    flex: 1,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 14,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  createAccountButton: {
    backgroundColor: '#000000',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  signUpText: {
    color: '#888',
    marginBottom: 20,
    textAlign: 'center',
  },
  spacing: {
    marginVertical: 10,
  },
  inputWithoutBorder: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
});

export default styles;