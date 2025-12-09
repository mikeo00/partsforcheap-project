import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 32;
const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const carouselItems = [
    {
        title: 'New Arrivals',
        subtitle: 'Latest Brake Systems',
        color: '#22C55E',
        type: 'content',
    },
    {
        type: 'ad', // Ad item
    },
    {
        title: 'Hot Deals',
        subtitle: 'Engine Parts Sale',
        color: '#EF4444',
        type: 'content',
    },
    {
        title: 'Top Rated',
        subtitle: 'Premium Oil Filters',
        color: '#3B82F6',
        type: 'content',
    },
    {
        title: '✨Loyalty Program',
        subtitle: 'Explore the premium experience and give your business a loyalty',
        color: '#FF6B35',
        type: 'content',
    },
];

export default function AutoCarousel({ onOpenLoyalty }) {
    const scrollViewRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const buttonScale = useSharedValue(1);
    const { user } = useAuth();

    // Filter items based on loyalty status
    const items = carouselItems.filter(item => {
        if (item.type === 'ad' && user?.isLoyaltyMember) {
            return false;
        }
        return true;
    });

    const buttonAnimatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: buttonScale.value }],
    }));

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => {
                const nextIndex = (prevIndex + 1) % items.length;
                scrollViewRef.current?.scrollTo({
                    x: nextIndex * (CARD_WIDTH + 16),
                    animated: true,
                });
                return nextIndex;
            });
        }, 4000); // Increased duration to give more time to read ad

        return () => clearInterval(interval);
    }, [items.length]);

    const handleButtonPress = () => {
        buttonScale.value = withSpring(0.9, {}, () => {
            buttonScale.value = withSpring(1);
        });
    };

    return (
        <View style={styles.container}>
            <ScrollView
                ref={scrollViewRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                decelerationRate="fast"
                snapToInterval={CARD_WIDTH + 16}
                contentContainerStyle={styles.scrollContent}
            >
                {items.map((item, index) => {
                    if (item.type === 'ad') {
                        return (
                            <View key={index} style={styles.cardContainer}>
                                <AdBanner
                                    variant="carousel"
                                    style={{ width: CARD_WIDTH, height: 160, marginHorizontal: 0 }}
                                />
                            </View>
                        );
                    }

                    return (
                        <View
                            key={index}
                            style={[styles.card, { backgroundColor: item.color }]}
                        >
                            <Text style={styles.title}>{item.title}</Text>
                            <Text style={styles.subtitle}>{item.subtitle}</Text>
                            <AnimatedTouchable
                                onPress={() => {
                                    handleButtonPress();
                                    if (item.title === '✨Loyalty Program' && onOpenLoyalty) {
                                        onOpenLoyalty();
                                    }
                                }}
                                style={[styles.button, buttonAnimatedStyle]}
                            >
                                <Text style={styles.buttonText}>Explore</Text>
                            </AnimatedTouchable>
                        </View>
                    );
                })}
            </ScrollView>

            <View style={styles.pagination}>
                {items.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.dot,
                            currentIndex === index && styles.activeDot,
                        ]}
                    />
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 16,
    },
    scrollContent: {
        paddingHorizontal: 16,
        gap: 16,
    },
    card: {
        width: CARD_WIDTH,
        height: 160,
        borderRadius: 16,
        padding: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#fff',
        marginBottom: 16,
        opacity: 0.9,
    },
    button: {
        backgroundColor: '#fff',
        paddingHorizontal: 32,
        paddingVertical: 10,
        borderRadius: 20,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 12,
        gap: 8,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#ddd',
    },
    activeDot: {
        backgroundColor: '#666',
        width: 24,
    },
});
