import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function PrivacyPolicyScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Privacy Policy</Text>

        <Text style={styles.paragraph}>
          At <Text style={styles.brand}>Zaddy</Text>, your privacy matters. This Privacy Policy explains how we collect, use, and protect the personal information you share when visiting our website.
        </Text>

        <Text style={styles.heading}>Our Commitment to You</Text>
        <Text style={styles.paragraph}>
          <Text style={styles.brand}>Zaddy</Text> is dedicated to safeguarding your personal data. Any information you provide to identify yourself will be used strictly in line with this Privacy Policy.
        </Text>

        <Text style={styles.paragraph}>
          <Text style={styles.note}>Note:</Text> We may update this policy periodically without prior notice. Please check back from time to time to stay informed of any changes.
        </Text>

        <Text style={styles.heading}>What We Collect</Text>
        <Text style={styles.paragraph}>
          We collect only the information necessary to deliver our products and services effectively. This may include:
        </Text>
        <Text style={styles.bullet}>• Name and job title</Text>
        <Text style={styles.bullet}>• Contact information (email address, phone number)</Text>
        <Text style={styles.bullet}>• Demographic details (postal code, preferences, interests)</Text>
        <Text style={styles.bullet}>• Feedback and survey responses</Text>

        <Text style={styles.paragraph}>
          We make every effort to collect this information directly from you—via our website, over the phone, or in person. When collecting data, we'll inform you of:
        </Text>
        <Text style={styles.bullet}>• What information is being collected</Text>
        <Text style={styles.bullet}>• Why we're collecting it</Text>
        <Text style={styles.bullet}>• Your rights to access, correct, or opt out of its use</Text>

        <Text style={[styles.note, {marginTop: 10}]}>
          Please Note: If you choose not to share certain details, we may not be able to provide some services or support.
        </Text>

        <Text style={styles.heading}>How We Use Your Information</Text>
        <Text style={styles.bullet}>• Maintain internal records and analytics</Text>
        <Text style={styles.bullet}>• Enhance product offerings and customer service</Text>
        <Text style={styles.bullet}>• Share promotional updates (with your consent)</Text>

        <Text style={styles.paragraph}>
          Your personal data is never sold, rented, or traded. However, we may share your information with trusted service partners who help operate our website or deliver services—always under strict confidentiality agreements.
        </Text>
        <Text style={styles.paragraph}>
          We may also disclose your data when required by law or to protect the rights and safety of <Text style={styles.brand}>Zaddy</Text>, our users, or others. Non-personal, aggregated data may be used for research, analytics, or marketing.
        </Text>

        <Text style={styles.heading}>Data Security</Text>
        <Text style={styles.paragraph}>
          We implement robust physical, digital, and managerial safeguards to protect your personal information from unauthorized access, disclosure, or misuse.
        </Text>

        <Text style={styles.heading}>Cookies</Text>
        <Text style={styles.paragraph}>
          Cookies are small files that improve your browsing experience. With your permission, they help us:
        </Text>
        <Text style={styles.bullet}>• Analyze web traffic</Text>
        <Text style={styles.bullet}>• Understand user behavior</Text>
        <Text style={styles.bullet}>• Remember your preferences</Text>

        <Text style={styles.paragraph}>
          Cookies do not give us access to your device or data beyond what you voluntarily share. You can manage or disable cookies through your browser settings, though this may affect website functionality.
        </Text>

        <Text style={styles.heading}>Third-Party Links</Text>
        <Text style={styles.paragraph}>
          Our site may include links to external websites. <Text style={styles.brand}>Zaddy</Text> is not responsible for the privacy policies or practices of these third parties. We recommend reviewing their policies before sharing any information.
        </Text>

        <Text style={styles.heading}>Your Consent</Text>
        <Text style={styles.paragraph}>
          By using our website, you agree to the terms of this Privacy Policy and consent to the collection and use of your data as outlined. Continued use of the site following updates constitutes your acceptance of any changes.
        </Text>

        <Text style={styles.heading}>Grievance Redressal</Text>
        <Text style={styles.paragraph}>
          If you have questions or concerns about our privacy practices, please contact:
        </Text>
        <Text style={styles.contact}>Zaddy Pvt Ltd</Text>
        <Text style={styles.contact}>Nodal Office: Zaddy</Text>
        <Text style={styles.contact}>Grievance Officer: Zaddy</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    padding: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#222',
  },
  heading: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 24,
    marginBottom: 12,
    color: '#333',
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
    marginBottom: 16,
  },
  bullet: {
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
    marginLeft: 16,
    marginBottom: 6,
  },
  brand: {
    fontWeight: 'bold',
    color: '#007AFF',
  },
  note: {
    fontWeight: '600',
    color: '#333',
  },
  contact: {
    fontSize: 16,
    color: '#333',
    marginTop: 4,
  },
});
