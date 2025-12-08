import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';

export default function ContactUsScreen({ navigation }) {

    const handleEmailPress = () => {
        const subject = 'Support Request';
        const body = 'Hi, I need help with...';
        const mailtoUrl = `mailto:support@partsforcheap.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        Linking.openURL(mailtoUrl).catch(err => console.error('Error opening email client:', err));
    };
    const openWhatsapp = () => {
  const phoneNumber = "96171909690";
  const message = "Hi, I need help";
  const encodedMessage = encodeURIComponent(message);
  const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  Linking.canOpenURL(url)
    .then((supported) => {
      if (!supported) {
        alert('WhatsApp is not installed on your device');
      } else {
        return Linking.openURL(url);
      }
    })
    .catch((err) => console.error('An error occurred', err));
};

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Contact Us</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView style={styles.scrollView}>
                <View style={styles.infoSection}>
                    {/* Email */}
                    
                        <View style={styles.infoItem}>
                            <Ionicons name="mail" size={24} color="#FF6B35" />
                            <View style={styles.infoText}>
                                <Text style={styles.infoTitle}>Email</Text>
                                <Text style={styles.infoSubtitle}>support@partsforcheap.com</Text>
                            </View>
                            <TouchableOpacity onPress={handleEmailPress} style={styles.btn}>
                                <Text>Email us!</Text>
                            </TouchableOpacity>
                        </View>

                    {/* Phone */}
                    <View style={styles.infoItem}>
                        <Ionicons name="call" size={24} color="#FF6B35" />
                        <View style={styles.infoText}>
                            <Text style={styles.infoTitle}>Whatsapp</Text>
                            <Text style={styles.infoSubtitle}>+961 71/909/690</Text>
                        </View>
                    <TouchableOpacity onPress={openWhatsapp} style={styles.btn}>
                        <Text>Send a message!</Text>
                    </TouchableOpacity>
                    </View>

                    {/* Address */}
                    <View style={styles.infoItem}>
                        <Ionicons name="location" size={24} color="#FF6B35" />
                        <View style={styles.infoText}>
                            <Text style={styles.infoTitle}>Address</Text>
                            <Text style={styles.infoSubtitle}>Industrial City/Zahle/Lebanon:Garage Fadi Abou Haidar</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 33.826056,
          longitude: 35.928250,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={{ latitude: 33.826056,longitude: 35.928250, }}
          title="Garage Fadi Abou Haidar"
          description="Industrial City, Zahle, Lebanon"
        />
      </MapView>
    </View>
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
    infoSection: {
        backgroundColor: '#fff',
        marginTop: 16,
        marginBottom: 16,
        padding: 16,
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    infoText: {
        marginLeft: 16,
        flex: 1,
    },
    infoTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
    },
    infoSubtitle: {
        fontSize: 14,
        color: '#666',
    },
    btn:{
        width:"auto",
        height:20,
        borderWidth:1,
        borderColor:"orange",
        backgroundColor:"white",
        alignItems:"center"
    }
});

