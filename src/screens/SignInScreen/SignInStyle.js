import { StyleSheet, Dimensions } from 'react-native';
const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  innerContainer: {
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    marginTop: 10,
    color: '#444',
  },
  input: {
    width: '100%',
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    color: '#000',
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
    width: '100%',
    alignSelf: 'center',
    marginTop: 25,
    minHeight: 48,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  signInText: {
    color: '#666',
    marginTop: 15,
    textAlign: 'center',
    fontSize: 14,
    padding: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 13,
    marginTop: 4,
    marginBottom: 8,
  },
  authErrorText: {
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 15,
    fontSize: 14,
    color: '#ff0000',
    fontWeight: '500',
  },
});

export default styles;
