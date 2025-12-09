import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { supabase } from '../lib/supabase';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

function BrandCard({ brand, theme, index, navigation }) {
    const scale = useSharedValue(1);
    const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

    const handlePressIn = () => scale.value = withSpring(0.95);
    const handlePressOut = () => scale.value = withSpring(1);
    const handlePress = () => navigation.navigate('YearSelection', { brand });

    const isThirdItem = (index + 1) % 3 === 0;

    return (
        <AnimatedTouchable
            style={[
                styles.brandCard,
                { backgroundColor: theme.colors.surface, marginRight: isThirdItem ? 0 : '3.5%' },
                animatedStyle
            ]}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={handlePress}
        >
            <View style={styles.iconContainer}>
                {brand.is_image ? (
                    <Image source={{ uri: brand.icon_url }} style={styles.brandImage} resizeMode="contain" />
                ) : (
                    <Ionicons name={brand.icon || 'car'} size={40} color={theme.colors.text} />
                )}
            </View>
            <Text style={[styles.brandName, { color: theme.colors.text }]}>{brand.name}</Text>
        </AnimatedTouchable>
    );
}

export default function BrandGrid({ navigation }) {
    const { theme } = useTheme();
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBrands();
    }, []);

    const fetchBrands = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('brand')
                .select('*')
                .order('name', { ascending: true });

            if (error) throw error;
            setBrands(data || []);
        } catch (err) {
            console.error('Failed to fetch brands:', err);
        } finally {
            setLoading(false);
        }
    };

    const categories = ['Japanese', 'American', 'German'];

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#FF6B35" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Shop by Brand</Text>

            {categories.map((cat) => {
                const catBrands = brands.filter((b) => b.category === cat);
                if (catBrands.length === 0) return null;

                return (
                    <View key={cat} style={[styles.categorySection, { backgroundColor: theme.colors.surface }]}>
                        <View style={styles.categoryHeader}>
                            <Text style={[styles.categoryTitle, { color: theme.colors.text }]}>
                                {cat === 'Japanese' ? '🇯🇵 ' : cat === 'American' ? '🇺🇸 ' : '🇩🇪 '} {cat} Brands
                            </Text>
                        </View>
                        <View style={styles.grid}>
                            {catBrands.map((brand, index) => (
                                <BrandCard key={brand.id} brand={brand} theme={theme} index={index} navigation={navigation} />
                            ))}
                        </View>
                    </View>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { paddingHorizontal: 16, paddingVertical: 8 },
    sectionTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
    categorySection: { borderRadius: 12, padding: 16, marginBottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
    categoryHeader: { marginBottom: 12 },
    categoryTitle: { fontSize: 16, fontWeight: '600' },
    grid: { flexDirection: 'row', flexWrap: 'wrap' },
    brandCard: { width: '31%', aspectRatio: 1, borderRadius: 12, padding: 12, justifyContent: 'center', alignItems: 'center', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3, marginBottom: 12 },
    iconContainer: { marginBottom: 8 },
    brandImage: { width: 70, height: 70 },
    brandName: { fontSize: 12, fontWeight: '600', textAlign: 'center' },
});
