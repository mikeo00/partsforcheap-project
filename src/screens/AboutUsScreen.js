import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons';

export default function AboutUsScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>About Us</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView style={styles.scrollView}>
                <View style={styles.logoSection}>
                    <Image
                        source={require('../../assets/PARTS_FOR_CHEAP.png')}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                    <Text style={styles.appName}>
                        Parts<Text style={styles.appNameOrange}>ForCheap</Text>
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Our Mission</Text>
                    <Text style={styles.text}>
                        We are dedicated to providing high-quality automotive parts at affordable prices.
                        Our mission is to make vehicle maintenance accessible to everyone by offering a
                        wide selection of parts from trusted brands.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Why Choose Us</Text>
                    <View style={styles.feature}>
                        <Ionicons name="checkmark-circle" size={24} color="#22C55E" />
                        <Text style={styles.featureText}>Competitive Prices</Text>
                    </View>
                    <View style={styles.feature}>
                        <Ionicons name="checkmark-circle" size={24} color="#22C55E" />
                        <Text style={styles.featureText}>Fast Shipping</Text>
                    </View>
                    <View style={styles.feature}>
                        <Ionicons name="checkmark-circle" size={24} color="#22C55E" />
                        <Text style={styles.featureText}>Quality Guaranteed</Text>
                    </View>
                    <View style={styles.feature}>
                        <Ionicons name="checkmark-circle" size={24} color="#22C55E" />
                        <Text style={styles.featureText}>Expert Support</Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Our Story</Text>
                    <Text style={styles.text}>
                        Founded in 2025, PartsForCheap has grown from a small local shop to a
                        nationwide provider of automotive parts. We pride ourselves on our commitment
                        to customer satisfaction and our extensive inventory of parts for all major
                        vehicle brands.
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingTop: 40,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    backButton: {
        padding: 4,
        width: 40,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        flex: 1,
        textAlign: 'center',
    },
    scrollView: {
        flex: 1,
    },
    logoSection: {
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingVertical: 40,
        marginBottom: 16,
    },
    logo: {
        width: 100,
        height: 100,
        borderRadius: 50,
        paddingRight: 20,
    },
    appName: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 16,
    },
    appNameOrange: {
        color: '#FF6B35',
    },
    section: {
        backgroundColor: '#fff',
        marginBottom: 16,
        padding: 16,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 12,
    },
    text: {
        fontSize: 15,
        color: '#666',
        lineHeight: 24,
    },
    feature: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    featureText: {
        fontSize: 16,
        color: '#333',
        marginLeft: 12,
        fontWeight: '500',
    },
});
