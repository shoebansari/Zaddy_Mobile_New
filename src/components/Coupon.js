
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getAllCoupon } from '../redux/slices/couponSlice'; 
import PropTypes from 'prop-types';

const Coupon = ({ onApplyDiscount, totalAmount, onCouponSelected }) => {
  const dispatch = useDispatch();
  const [showCoupons, setShowCoupons] = useState(true);
  const [appliedCode, setAppliedCode] = useState('');
  const [appliedDiscountAmount, setAppliedDiscountAmount] = useState(0);

  const coupons = useSelector((state) => state.couponSlice.discountData);

  useEffect(() => {
    dispatch(getAllCoupon());
  }, [dispatch]);

  useEffect(() => {
    // If coupon becomes invalid after being applied
    if (appliedCode) {
      const stillValid = coupons?.some(
        (c) => c.code === appliedCode && c.status === 'Active'
      );
      if (!stillValid) {
        setAppliedCode('');
        setAppliedDiscountAmount(0);
      }
    }
  }, [coupons]);

  const handleApplyCoupon = (couponId) => {
    const selectedCoupon = coupons.find((c) => c.couponId === couponId);
    if (!selectedCoupon) return;

    let discount = 0;

    if (selectedCoupon.amountType === 'percent') {
      discount = (totalAmount * selectedCoupon.amount) / 100;
      if (selectedCoupon.maxDiscountAmount) {
        discount = Math.min(discount, selectedCoupon.maxDiscountAmount);
      }
    } else if (selectedCoupon.amountType.toLowerCase() === 'flat') {
      discount = selectedCoupon.amount;
    }

    setAppliedCode(selectedCoupon.code);
    setAppliedDiscountAmount(discount);

    if (onApplyDiscount) onApplyDiscount(discount);
    if (onCouponSelected) onCouponSelected(selectedCoupon.couponId);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.headerContainer}
        onPress={() => setShowCoupons(!showCoupons)}
      >
        <Text style={styles.headerText}>Available Coupons</Text>
        <Icon
          name={showCoupons ? 'chevron-up' : 'chevron-down'}
          size={16}
          color="#000"
        />
      </TouchableOpacity>

      {showCoupons && (
        <ScrollView
          style={styles.couponsContainer}
          contentContainerStyle={{ paddingBottom: 16 }}
        >
          {coupons
            ?.filter((c) => c.status === 'Active')
            .map((c) => {
              const isApplied = appliedCode === c.code;
              return (
                <View key={c.couponId} style={styles.couponCard}>
                  <View style={styles.couponInfo}>
                    <Text style={styles.couponCode}>{c.code}</Text>
                    <Text style={styles.couponDescription}>
                      Flat {c.amount}
                      {c.amountType === 'percent' ? '%' : '₹'} off on cart
                      amount
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => handleApplyCoupon(c.couponId)}
                    style={styles.applyButton}
                    disabled={isApplied}
                  >
                    <Text
                      style={[
                        styles.applyButtonText,
                        isApplied && { color: '#9CA3AF' },
                      ]}
                    >
                      {isApplied ? 'Applied' : 'Apply'}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            })}
        </ScrollView>
      )}

      {appliedCode ? (
        <View style={styles.appliedCouponContainer}>
          <Text style={styles.appliedCouponText}>
            Coupon Applied: {appliedCode} — You saved ₹
            {appliedDiscountAmount.toFixed(2)}
          </Text>
        </View>
      ) : null}
    </View>
  );
};

Coupon.propTypes = {
  onApplyDiscount: PropTypes.func,
  totalAmount: PropTypes.number.isRequired,
  onCouponSelected: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    maxHeight: 400,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
  },
  couponsContainer: {
    maxHeight: 300,
  },
  couponCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  couponInfo: {
    flex: 1,
  },
  couponCode: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  couponDescription: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4B5563',
  },
  applyButton: {
    marginLeft: 12,
  },
  applyButtonText: {
    color: '#000000',
    fontWeight: '500',
    fontSize: 14,
  },
  appliedCouponContainer: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#F0FDF4',
    borderRadius: 8,
  },
  appliedCouponText: {
    color: '#16A34A',
    fontWeight: '600',
    fontSize: 14,
  },
});

export default Coupon;
