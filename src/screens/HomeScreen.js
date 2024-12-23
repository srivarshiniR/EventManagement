import React, { useCallback, useState } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents } from '../redux/slices/eventSlice';
import { useFocusEffect } from '@react-navigation/native';
import font from '../theme/font/fontsizes';
import Icon from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';

export default function HomeScreen({ navigation }) {
    const dispatch = useDispatch();
    const { events, loading, error } = useSelector((state) => state.events);
    const [searchQuery, setSearchQuery] = useState("");

    useFocusEffect(
        useCallback(() => {
            dispatch(fetchEvents());
        }, [dispatch])
    );

    const handleNavigate = () => {
        navigation.navigate('CreateEditEvent');
    };

    function calculateStatus(eventDate) {
        const currentDate = moment();
        const eventMoment = moment(eventDate, 'DD/MM/YYYY');

        if (eventMoment.isSame(currentDate, 'day')) {
            return 'Ongoing';
        } else if (eventMoment.isBefore(currentDate, 'day')) {
            return 'Completed';
        } else {
            return 'Upcoming';
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.headingContainer}>
                <Text style={styles.heading}>Events List</Text>
                <TouchableOpacity onPress={handleNavigate} style={styles.addBtn}>
                    <Icon name='plus' size={18} color='white' />
                    <Text style={styles.addText}>Add</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.searchContainer}>
                <Icon name='search' size={14} color='gray' />
                <TextInput
                    placeholder="Search events by title & location"
                    placeholderTextColor="gray"
                    value={searchQuery}
                    onChangeText={(text) => setSearchQuery(text)}
                    style={styles.searchBar}
                />
            </View>

            {loading && !events.length ? <Text style={styles.txt}>Loading...</Text> : null}
            {error && <Text style={styles.errorText}>{error}</Text>}

            <FlatList
                data={events.filter((event) =>
                    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    event.location.toLowerCase().includes(searchQuery.toLowerCase())
                )}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => {
                    const status = calculateStatus(item.date);
                    return (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('EventDetails', { eventId: item.id })}
                            style={styles.eventItem}>
                            <View style={styles.titleContainer}>
                                <Text style={styles.eventTitle}>{item.title}</Text>
                                <Text style={[styles.eventStatus, styles[`status${status}`]]}>
                                    {status}
                                </Text>
                            </View>
                            <View style={styles.flex_center}>
                                <Icon name='calendar' size={14} color='#226f54' />
                                <Text style={styles.dateTxt}>{`${item.date} at ${item.time}`}</Text>
                            </View>
                            <View style={styles.flex_center}>
                                <Entypo name='location-pin' size={14} color='#c9184a' />
                                <Text style={styles.txt}>{item.location}</Text>
                            </View>
                            <View style={styles.flex_center}>
                                <Ionicons name='people-sharp' size={14} color='#023e8a' />
                                <Text style={styles.txt}>{item.attendees ? item.attendees : '0'}</Text>
                            </View>
                        </TouchableOpacity>
                    );
                }}
                ListEmptyComponent={!loading && <Text style={styles.txt}>No events found.</Text>}

            />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 20
    },
    heading: {
        color: 'black',
        fontWeight: '500',
        fontSize: font.size.large
    },
    headingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 30,
        paddingHorizontal: 10,
        marginTop: 20,
        marginBottom: 40,
        height: 40
    },
    searchBar: {
        color: 'black',
        marginLeft: 5
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10
    },
    eventItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    eventTitle: {
        fontWeight: '500',
        color: '#14213d',
        fontSize: font.size.medium
    },
    eventStatus: {
        borderRadius: 7,
        paddingHorizontal: 10,
        paddingVertical: 4,
        fontSize: font.size.small,
        backgroundColor: '#fff',
        elevation: 4,
        width: 85,
        textAlign: 'center'
    },
    statusUpcoming: {
        backgroundColor: '#b5e2fa',
        color: 'black',
    },
    statusOngoing: {
        backgroundColor: '#f5fdc6',
        color: 'black',
    },
    statusCompleted: {
        backgroundColor: '#e9eaec',
        color: 'black',
    },
    addBtn: {
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 5,
        backgroundColor: '#023e8a',
        flexDirection: 'row',
        alignItems: 'center'
    },
    addText: {
        fontSize: font.size.medium,
        fontWeight: font.weight.bold,
        color: 'white',
        marginLeft: 10
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginTop: 10,
    },
    txt: {
        color: 'black',
        marginLeft: 5,
    },
    dateTxt: {
        color: 'black',
        marginLeft: 5,
        fontSize: font.size.small
    },
    flex_center: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5
    }
});
