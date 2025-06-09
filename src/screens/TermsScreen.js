import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; 

export default function TermsScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.mainContainer}>
     
      
      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity 
          onPress={() => navigation.navigate('Tab', { screen: 'Account' })} 
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Text style={styles.title}>Terms of Use</Text>
        </View>

        <Text style={styles.paragraph}>
          By accessing and using this website, you agree to the terms and conditions outlined below,
          as well as any additional terms referenced elsewhere on the site. If you do not agree with
          any part of these terms, please discontinue use of the site.
        </Text>

        {/* Rest of your content remains the same */}
        <Text style={styles.heading}>Use at Your Own Risk</Text>
        <Text style={styles.paragraph}>
          Your use of this website and reliance on the information, products, or services offered is
          entirely at your own risk. Zaddy Private Limited (referred to as <Text style={styles.brand}>ZADDY</Text>) makes no guarantees regarding
          the accuracy, reliability, completeness, or timeliness of any content, products, or services
          featured on the site.
        </Text>
        <Text style={styles.paragraph}>
          All content is provided "as is" without warranties of any kind—express or implied—including
          but not limited to implied warranties of merchantability, fitness for a particular purpose,
          title, or non-infringement.
        </Text>

        <Text style={styles.heading}>Legal Disclosures</Text>
        <Text style={styles.paragraph}>
          <Text style={styles.brand}>ZADDY</Text> reserves the right to disclose any personal information, as necessary, to comply with legal
          obligations, regulations, or valid governmental requests. We may also share information with
          law enforcement or government authorities if required by law.
        </Text>

        <Text style={styles.heading}>Content Accuracy & Changes</Text>
        <Text style={styles.paragraph}>
          While we strive to provide current and accurate information, the site may occasionally contain
          errors, outdated content, or inaccuracies. <Text style={styles.brand}>ZADDY</Text> reserves the right to modify or update the website,
          its content, products, or services at any time without notice.
        </Text>

        <Text style={styles.heading}>Intellectual Property</Text>
        <Text style={styles.paragraph}>
          All content on this website—including design, layout, graphics, and text—is the property of
          <Text style={styles.brand}> ZADDY</Text> unless otherwise stated. Unauthorized reproduction or distribution of any material is
          prohibited and may violate copyright laws. Usage must comply with any applicable copyright
          notices displayed on the site.
        </Text>

        <Text style={styles.heading}>Third-Party Links</Text>
        <Text style={styles.paragraph}>
          This website may include links to external websites for your convenience. These third-party
          sites are accessed at your own risk, and <Text style={styles.brand}>ZADDY</Text> is not responsible for their content, accuracy,
          or policies—regardless of any affiliation or partnership.
        </Text>

        <Text style={styles.heading}>Changes to Terms</Text>
        <Text style={styles.paragraph}>
          <Text style={styles.brand}>ZADDY</Text> may revise these Terms of Use at any time without prior notice. Updated terms will be
          posted on the website. Continued use of the site after such changes constitutes your acceptance
          of the revised terms. If you do not agree with the updates, you should stop using the website
          immediately.
        </Text>

        <Text style={styles.heading}>Contact Us</Text>
        <Text style={styles.paragraph}>
          If you have any questions, concerns, or feedback regarding these terms or our website, please
          reach out to us at: <Text style={styles.contact}>help@zaddycare.com</Text>
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    width: '100%',
  },
  scrollContainer: {
    padding: 20,
    paddingTop: 60, 
    paddingBottom: 60,
  },
  titleContainer: {
    marginTop: -10, 
    marginBottom: 15,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#222',
  },
  heading: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 24,
    marginBottom: 8,
    color: '#000',
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 26,
    color: '#333',
    marginBottom: 12,
  },
  brand: {
    fontWeight: 'bold',
    color: '#007AFF',
  },
  contact: {
    color: '#007AFF',
  },
  backButton: {
    position: 'absolute',
    top: 10, // Moved up slightly
    left: 20,
    zIndex: 1,
  }
});