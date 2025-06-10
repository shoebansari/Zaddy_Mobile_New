import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { postSkincareForm } from '../../redux/slices/SkinInsightSlice';
import Header from '../header/Header';
import { Dropdown } from 'react-native-element-dropdown';
import { RadioButton } from 'react-native-paper';

const SkinCareInsightForm = () => {
  const dispatch = useDispatch();
 // const { loading, error } = useSelector(state => state.SkinInsightSlice);
  const navigation = useNavigation();

  const [name, setFullName] = useState('');
  const [age, setAgeGroup] = useState(null);
  const [gender, setGender] = useState(null);
  const [skintype, setSkinType] = useState(null);
  const [skinSensitive, setIsSensitive] = useState('');
  const [errors, setErrors] = useState({});

  const ageGroups = [
    { label: 'Below 18', value: 'Below 18' },
    { label: '18 to 24', value: '18 to 24' },
    { label: '25 to 30', value: '25 to 30' },
    { label: '31 to 34', value: '31 to 34' },
    { label: '35 to 40', value: '35 to 40' },
    { label: 'Above 40', value: 'Above 40' },
  ];

  const genders = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
    { label: 'Other', value: 'Other' },
  ];

  const skinTypes = [
    { label: 'Oily', value: 'Oily' },
    { label: 'Dry', value: 'Dry' },
    { label: 'Combination', value: 'Combination' },
    { label: 'Normal', value: 'Normal' },
  ];

  const formData = {
    name,
    age: age?.value,
    gender: gender?.value,
    skintype: skintype?.value,
    skinSensitive,
  };

  const handleSubmit = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!age) newErrors.age = 'Please select your age group';
    if (!gender) newErrors.gender = 'Please select your gender';
    if (!skintype) newErrors.skintype = 'Please select your skin type';
    if (skinSensitive === '') newErrors.skinSensitive = 'Please choose sensitivity option';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    dispatch(postSkincareForm(formData))
      .then(() => {
        navigation.navigate('CameraScreen');
      });
  };

  return (
    <View style={styles.mainContainer}>      
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.formContainer}>
          <TouchableOpacity 
            onPress={() => navigation.goBack()} 
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>

          <Text style={styles.title}>Skincare Information Form</Text>

          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={name}
            onChangeText={setFullName}
          />
          {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

          <Text style={styles.label}>Select Age Group:</Text>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            data={ageGroups}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Select Age Group"
            searchPlaceholder="Search..."
            value={age}
            onChange={item => {
              setAgeGroup(item);
            }}
          />
          {errors.age && <Text style={styles.errorText}>{errors.age}</Text>}

          <Text style={styles.label}>Select Gender:</Text>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            data={genders}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Select Gender"
            searchPlaceholder="Search..."
            value={gender}
            onChange={item => {
              setGender(item);
            }}
          />
          {errors.gender && <Text style={styles.errorText}>{errors.gender}</Text>}

          <Text style={styles.label}>Select Skin Type:</Text>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            data={skinTypes}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Select Skin Type"
            searchPlaceholder="Search..."
            value={skintype}
            onChange={item => {
              setSkinType(item);
            }}
          />
          {errors.skintype && <Text style={styles.errorText}>{errors.skintype}</Text>}

          <Text style={styles.label}>Is Your Skin Sensitive?</Text>
          <View style={styles.radioContainer}>
            <View style={styles.radioOption}>
              <RadioButton
                value="Yes"
                status={skinSensitive === 'Yes' ? 'checked' : 'unchecked'}
                onPress={() => setIsSensitive('Yes')}
              />
              <Text>Yes</Text>
            </View>
            <View style={styles.radioOption}>
              <RadioButton
                value="No"
                status={skinSensitive === 'No' ? 'checked' : 'unchecked'}
                onPress={() => setIsSensitive('No')}
              />
              <Text>No</Text>
            </View>
          </View>
          {errors.skinSensitive && <Text style={styles.errorText}>{errors.skinSensitive}</Text>}

          {/* <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Proceed</Text>
            )}
          </TouchableOpacity>

          {error && <Text style={styles.errorText}>{error}</Text>} */}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
    paddingTop: 20, // Added padding at the top
  },
  formContainer: {
    padding: 20,
    width: '100%',
    maxWidth: 500,
    alignSelf: 'center',
    position: 'relative', // Added for back button positioning
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    marginTop: 30, // Added margin to account for back button
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 5,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    marginTop: 10,
    color: '#333',
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 5,
    backgroundColor: '#fff',
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'gray',
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  button: {
    backgroundColor: '#333333',
    padding: 15,
    borderRadius: 7,
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    fontSize: 14,
  },
  backButton: {
    position: 'absolute',
    top: 0,
    left: 10,
    zIndex: 10,
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
  },
});

export default SkinCareInsightForm;