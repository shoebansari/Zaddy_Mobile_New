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
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2ecc71',
    marginBottom: 16,
    textAlign: 'center',
  },
  successMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  goHomeButton: {
    backgroundColor: '#2ecc71',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 25,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  goHomeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },

  passwordWrapper: {
    position: 'relative',
  },

  eyeIconWrapper: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{ translateY: -12 }], // To align the icon vertically
  },

  eyeIcon: {
    fontSize: 24,
    color: '#777',
  },
});

export default styles;
