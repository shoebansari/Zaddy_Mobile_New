import { useState } from 'react';
import { SafeAreaView, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { postSkincareForm } from '../../redux/slices/SkinInsightSlice';
import { Dropdown } from 'react-native-element-dropdown';
import { RadioButton } from 'react-native-paper';

const SkinCareInsightForm = () => {
  const dispatch = useDispatch();
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
    navigation.navigate('CameraScreen');
    // const newErrors = {};
    // if (!name.trim()) newErrors.name = 'Name is required';
    // if (!age) newErrors.age = 'Please select your age group';
    // if (!gender) newErrors.gender = 'Please select your gender';
    // if (!skintype) newErrors.skintype = 'Please select your skin type';
    // if (skinSensitive === '') newErrors.skinSensitive = 'Please choose sensitivity option';

    // if (Object.keys(newErrors).length > 0) {
    //   setErrors(newErrors);
    //   return;
    // }

    // setErrors({});
    // dispatch(postSkincareForm(formData))
    //   .then(() => {
    //     navigation.navigate('CameraScreen');
    //   });
  };

  return (
    <SafeAreaView style={styles.mainContainer}>      
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.formContainer}>
          <Text style={styles.title}>Skincare Information Form</Text>

          <TextInput
            style={[styles.input, errors.name && styles.inputError]}
            placeholder="Full Name"
            placeholderTextColor="#999"
            value={name}
            onChangeText={setFullName}
          />
          {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

          <Text style={styles.label}>Select Age Group:</Text>
          <Dropdown
            style={[styles.dropdown, errors.age && styles.inputError]}
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
            style={[styles.dropdown, errors.gender && styles.inputError]}
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
            style={[styles.dropdown, errors.skintype && styles.inputError]}
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
                color="#007AFF"
              />
              <Text>Yes</Text>
            </View>
            <View style={styles.radioOption}>
              <RadioButton
                value="No"
                status={skinSensitive === 'No' ? 'checked' : 'unchecked'}
                onPress={() => setIsSensitive('No')}
                color="#007AFF"
              />
              <Text>No</Text>
            </View>
          </View>
          {errors.skinSensitive && <Text style={styles.errorText}>{errors.skinSensitive}</Text>}

          <TouchableOpacity 
            style={styles.button}
            onPress={handleSubmit}
          >
            <Text style={styles.buttonText}>Proceed</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  formContainer: {
    padding: 20,
    width: '100%',
    maxWidth: 500,
    alignSelf: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#222',
    marginTop: 10,
  },
  input: {
    height: 45,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 12,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#333',
  },
  inputError: {
    borderColor: '#ff0000',
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
    marginTop: 12,
    color: '#333',
    fontWeight: '500',
  },
  dropdown: {
    height: 45,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#999',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#333',
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 8,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 30,
  },
  button: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    width: '100%',
    height: 50,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#ff0000',
    fontSize: 14,
    marginBottom: 10,
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