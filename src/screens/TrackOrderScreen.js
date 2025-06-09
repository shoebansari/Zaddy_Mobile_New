import { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrackOrder, clearTrackOrder } from '../redux/slices/TrackOrderSlice';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/header/Header';
import { FontAwesome } from '@expo/vector-icons';

export default function TrackOrderScreen() {
  const navigation = useNavigation();
  const [OrderNo, setOrderNumber] = useState('');
  const [showStatus, setShowStatus] = useState(false);
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.trackOrderSlice);

  const handleTrackOrder = () => {
    setShowStatus(false);
    dispatch(fetchTrackOrder(OrderNo));
  };

  useEffect(() => {
    if (data && Array.isArray(data) && data.length > 0) {
      setShowStatus(true);
    }
    if (error) {
      Alert.alert('Error', error);
    }
  }, [data, error]);

  const renderStatusTimeline = (order) => {
    const {
      shippedDate,
      status,
      arrivedDate,
      deliveryDate,
      shippedFrom,
      arrivedTo,
      billingAddress,
      createdDate = new Date().toISOString(),
    } = order;

    const processedOrderData = {
      createdDate: createdDate || "",
      shippedDate: shippedDate || "",
      arrivedAtHubDate: arrivedDate || "",
      deliveredDate: deliveryDate || "",
      locations: {
        warehouse: shippedFrom || "Warehouse",
        transit: "Delhi Hub",
        localFacility: arrivedTo || "Local Facility",
        destination: billingAddress || "Your Address",
      },
      currentStatus: status || "",
    };

    const currentStatusLower = processedOrderData.currentStatus.toLowerCase();

    const statusSteps = [
      {
        id: "1",
        title: "Order Placed",
        icon: <FontAwesome name="cube" size={20} />,
        date: processedOrderData.createdDate,
        completed: true,
      },
      {
        id: "2",
        title: "Shipped",
        icon: <FontAwesome name="truck" size={20} />,
        date: processedOrderData.shippedDate,
        location: processedOrderData.locations.warehouse,
        completed: ["arrivedto", "shippedfrom", "delivery successfull", "delivered"].includes(currentStatusLower),
      },
      {
        id: "3",
        title: "Arrived",
        icon: <FontAwesome name="truck" size={20} />,
        date: processedOrderData.arrivedAtHubDate,
        location: processedOrderData.locations.localFacility,
        completed: ["arrivedto", "delivered", "delivery successfull", "return"].includes(currentStatusLower),
      },
      {
        id: "4",
        title: "Delivered",
        icon: <FontAwesome name="home" size={20} />,
        date: processedOrderData.deliveredDate,
        location: processedOrderData.locations.destination,
        completed: ["delivered", "delivery successfull", "return", "arrived"].includes(currentStatusLower),
      },
    ];

    return (
      <View style={styles.timelineContainer}>
        <View style={styles.timelineHeader}>
          <Text style={styles.timelineTitle}>Order Journey</Text>
          <TouchableOpacity onPress={() => {
            setShowStatus(false);
            dispatch(clearTrackOrder());
          }}>
            <Text style={styles.closeButton}>Close</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.stepsContainer}>
          {statusSteps.map((step, index) => {
            const isCompleted = step.completed;
            const isLast = index === statusSteps.length - 1;
            const nextStepCompleted = statusSteps[index + 1]?.completed;

            return (
              <View key={step.id} style={styles.stepContainer}>
                {!isLast && (
                  <View style={[
                    styles.connectorLine,
                    nextStepCompleted ? styles.completedLine : styles.pendingLine
                  ]} />
                )}

                <View style={[
                  styles.iconContainer,
                  isCompleted ? styles.completedIcon : styles.pendingIcon
                ]}>
                  {step.icon}
                </View>

                <View style={[
                  styles.stepContent,
                  isCompleted ? styles.completedContent : styles.pendingContent
                ]}>
                  <View style={styles.stepHeader}>
                    <Text style={[
                      styles.stepTitle,
                      isCompleted ? styles.completedText : styles.pendingText
                    ]}>
                      {step.title}
                    </Text>
                    {isCompleted && <FontAwesome name="check-circle" size={20} color="#4CAF50" />}
                  </View>

                  {step.location && (
                    <Text style={styles.stepLocation}>{step.location}</Text>
                  )}

                  {isCompleted && step.date && (
                    <Text style={styles.stepDate}>
                      {new Date(step.date).toLocaleDateString()}
                    </Text>
                  )}
                </View>
              </View>
            );
          })}
        </View>
      </View>
    );
  };

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

        {!showStatus ? (
          <View style={styles.contentContainer}>
            <Text style={styles.title}>Track Your Order</Text>

            <Text style={styles.label}>Enter your order number below:</Text>

            <TextInput
              style={styles.input}
              placeholder="e.g., ORD6b83199a"
              value={OrderNo}
              onChangeText={setOrderNumber}
              keyboardType="default"
            />

            <TouchableOpacity
              style={styles.button}
              onPress={handleTrackOrder}
              disabled={loading}
            >
              <Text style={styles.buttonText}>
                {loading ? 'Tracking...' : 'Track Order'}
              </Text>
            </TouchableOpacity>

            {loading && <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 20 }} />}
          </View>
        ) : (
          data && data.length > 0 && renderStatusTimeline(data[0])
        )}
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
    flexGrow: 1,
    padding: 24,
    paddingTop: 70,
  },
  contentContainer: {
    justifyContent: 'flex-start',
    marginTop: 20,

  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#000000',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
  timelineContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginTop: 20,
  },
  timelineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  timelineTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    color: 'red',
    fontWeight: '600',
  },
  stepsContainer: {
    marginLeft: 12,
  },
  stepContainer: {
    marginBottom: 24,
    flexDirection: 'row',
  },
  connectorLine: {
    position: 'absolute',
    left: 20,
    top: 40,
    bottom: -24,
    width: 2,
  },
  completedLine: {
    backgroundColor: '#4CAF50',
  },
  pendingLine: {
    backgroundColor: '#E0E0E0',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    borderWidth: 2,
  },
  completedIcon: {
    backgroundColor: '#E8F5E9',
    borderColor: '#4CAF50',
  },
  pendingIcon: {
    backgroundColor: '#FAFAFA',
    borderColor: '#9E9E9E',
  },
  stepContent: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    marginTop: 4,
  },
  completedContent: {
    backgroundColor: '#E8F5E9',
    borderColor: '#C8E6C9',
  },
  pendingContent: {
    backgroundColor: '#FAFAFA',
    borderColor: '#F5F5F5',
  },
  stepHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  completedText: {
    color: '#2E7D32',
  },
  pendingText: {
    color: '#616161',
  },
  stepLocation: {
    fontSize: 14,
    color: '#424242',
    marginBottom: 4,
  },
  stepDate: {
    fontSize: 12,
    color: '#757575',
  },
});