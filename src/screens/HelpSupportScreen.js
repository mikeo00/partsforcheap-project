import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Alert,
    Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

export default function HelpSupportScreen({ navigation }) {
    const { theme } = useTheme();
    const [expandedFAQ, setExpandedFAQ] = useState(null);
    const [message, setMessage] = useState('');

    const faqs = [
        {
            id: 1,
            question: 'What payment methods do you accept?',
            answer: 'We accept Wish Money and Cash on Delivery for customers in Lebanon.',
        },
        {
            id: 2,
            question: 'How long does shipping take?',
            answer: 'Shipping typically takes 1-5 business days depending on the part and your location.',
        },
        {
            id: 3,
            question: 'Can I return a part?',
            answer: 'Yes! We offer a 30-day return policy for unused parts in original packaging.',
        },
        {
            id: 4,
            question: 'Do you offer warranties?',
            answer: 'Yes, all parts come with manufacturer warranties. Check individual part details for specific warranty information.',
        },
        {
            id: 5,
            question: 'How do I scan a QR code?',
            answer: 'Use the QR scanner in the search bar or admin panel to scan codes on delivery boxes or retail items.',
        },
    ];

    const handleCall = () => {
        Linking.openURL('tel:+96170123456');
    };

    const handleEmail = () => {
        Linking.openURL('mailto:support@partsforcheap.com');
    };

    const handleSubmit = () => {
        if (!message.trim()) {
            Alert.alert('Error', 'Please enter a message');
            return;
        }
        Alert.alert('Success', 'Your message has been sent. We\'ll get back to you soon!');
        setMessage('');
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <View style={[styles.header, { paddingTop: 40 }]}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Help & Support</Text>
            </View>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* Contact Methods */}
                <View style={[styles.section, { backgroundColor: theme.colors.surface }]}>
                    <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Contact Us</Text>

                    <TouchableOpacity style={styles.contactButton} onPress={handleCall}>
                        <View style={[styles.contactIcon, { backgroundColor: '#4CAF50' }]}>
                            <Ionicons name="call" size={24} color="#fff" />
                        </View>
                        <View style={styles.contactInfo}>
                            <Text style={[styles.contactLabel, { color: theme.colors.text }]}>Phone</Text>
                            <Text style={[styles.contactValue, { color: theme.colors.textSecondary }]}>
                                +961 70 123 456
                            </Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.contactButton} onPress={handleEmail}>
                        <View style={[styles.contactIcon, { backgroundColor: '#2196F3' }]}>
                            <Ionicons name="mail" size={24} color="#fff" />
                        </View>
                        <View style={styles.contactInfo}>
                            <Text style={[styles.contactLabel, { color: theme.colors.text }]}>Email</Text>
                            <Text style={[styles.contactValue, { color: theme.colors.textSecondary }]}>
                                support@partsforcheap.com
                            </Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.contactButton}>
                        <View style={[styles.contactIcon, { backgroundColor: '#FF6B35' }]}>
                            <Ionicons name="chatbubbles" size={24} color="#fff" />
                        </View>
                        <View style={styles.contactInfo}>
                            <Text style={[styles.contactLabel, { color: theme.colors.text }]}>Live Chat</Text>
                            <Text style={[styles.contactValue, { color: theme.colors.textSecondary }]}>
                                Available 9 AM - 6 PM
                            </Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
                    </TouchableOpacity>
                </View>

                {/* FAQ Section */}
                <View style={[styles.section, { backgroundColor: theme.colors.surface }]}>
                    <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                        Frequently Asked Questions
                    </Text>

                    {faqs.map((faq) => (
                        <View key={faq.id} style={styles.faqItem}>
                            <TouchableOpacity
                                style={styles.faqHeader}
                                onPress={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                            >
                                <Text style={[styles.faqQuestion, { color: theme.colors.text }]}>
                                    {faq.question}
                                </Text>
                                <Ionicons
                                    name={expandedFAQ === faq.id ? 'chevron-up' : 'chevron-down'}
                                    size={20}
                                    color={theme.colors.textSecondary}
                                />
                            </TouchableOpacity>
                            {expandedFAQ === faq.id && (
                                <Text style={[styles.faqAnswer, { color: theme.colors.textSecondary }]}>
                                    {faq.answer}
                                </Text>
                            )}
                        </View>
                    ))}
                </View>

                {/* Send Message */}
                <View style={[styles.section, { backgroundColor: theme.colors.surface }]}>
                    <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Send Us a Message</Text>

                    <TextInput
                        style={[styles.messageInput, {
                            backgroundColor: theme.colors.background,
                            color: theme.colors.text,
                            borderColor: theme.colors.border,
                        }]}
                        placeholder="Type your message here..."
                        placeholderTextColor={theme.colors.textSecondary}
                        multiline
                        numberOfLines={6}
                        value={message}
                        onChangeText={setMessage}
                        textAlignVertical="top"
                    />

                    <TouchableOpacity
                        style={[styles.submitButton, { backgroundColor: theme.colors.primary }]}
                        onPress={handleSubmit}
                    >
                        <Text style={styles.submitButtonText}>Send Message</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.1)',
    },
    backButton: {
        marginRight: 16,
        padding: 8,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    scrollView: {
        flex: 1,
    },
    section: {
        marginTop: 16,
        padding: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    contactButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.05)',
    },
    contactIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    contactInfo: {
        flex: 1,
    },
    contactLabel: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 2,
    },
    contactValue: {
        fontSize: 14,
    },
    faqItem: {
        marginBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.05)',
        paddingBottom: 12,
    },
    faqHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    faqQuestion: {
        flex: 1,
        fontSize: 15,
        fontWeight: '600',
        marginRight: 8,
    },
    faqAnswer: {
        fontSize: 14,
        marginTop: 8,
        lineHeight: 20,
    },
    messageInput: {
        borderWidth: 1,
        borderRadius: 12,
        padding: 12,
        marginBottom: 16,
        minHeight: 120,
    },
    submitButton: {
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
