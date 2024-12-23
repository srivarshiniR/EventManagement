import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, TouchableOpacity, Text, Platform, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useDispatch, useSelector } from 'react-redux';
import { createEvent, updateEvent } from '../redux/slices/eventSlice';
import Ionicons from 'react-native-vector-icons/Ionicons';
import font from '../theme/font/fontsizes';

export default function CreateEditEventScreen({ route, navigation }) {
    const { eventId } = route.params || {};
    const dispatch = useDispatch();

    const existingEvent = useSelector((state) =>
        state.events.events.find((e) => e.id === eventId)
    );

    const [eventData, setEventData] = useState({
        title: existingEvent?.title || '',
        description: existingEvent?.description || '',
        date: existingEvent?.date || '',
        time: existingEvent?.time || '',
        location: existingEvent?.location || '',
    });

    const [datePickerVisible, setDatePickerVisible] = useState(false);
    const [timePickerVisible, setTimePickerVisible] = useState(false);

    useEffect(() => {
        if (existingEvent) {
            setEventData(existingEvent);
        }
    }, [existingEvent]);


    const handleBack = () => {
        navigation.goBack();
    }

    const handleInputChange = (field, value) => {
        setEventData((prev) => ({ ...prev, [field]: value }));
    };

    const handleDateChange = (event, selectedDate) => {
        setDatePickerVisible(false);
        if (selectedDate) {
            const formattedDate = selectedDate.toLocaleDateString('en-GB'); // Format as DD/MM/YYYY
            handleInputChange('date', formattedDate);
        }
    };

    const handleTimeChange = (event, selectedTime) => {
        setTimePickerVisible(false);
        if (selectedTime) {
            const formattedTime = selectedTime.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }); // Format as HH:MM
            handleInputChange('time', formattedTime);
        }
    };

    const handleSubmit = () => {
        if (!eventData.title || !eventData.date || !eventData.time || !eventData.location) {
            Alert.alert('Error', 'Please fill in all required fields.');
            return;
        }

        if (existingEvent) {
            const updatedEvent = { ...existingEvent, ...eventData };
            dispatch(updateEvent(updatedEvent));
            Alert.alert('Success', 'Event updated successfully!');
            navigation.navigate('EventDetails', { eventId: updatedEvent.id });
        } else {
            const newEvent = { id: Date.now(), ...eventData };
            dispatch(createEvent(newEvent));
            Alert.alert('Success', 'Event created successfully!');
            navigation.navigate('Home');
        }
    };

    return (
        <ScrollView style={styles.container}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
        >
            <TouchableOpacity style={styles.backContainer} onPress={handleBack}>
                <Ionicons name='arrow-back' size={16} color='black' />
                <Text style={styles.titleTxt}>{existingEvent ? 'Update Event' : 'Create Event'}</Text>
            </TouchableOpacity>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Title</Text>
                <TextInput
                    placeholder="Event Title"
                    placeholderTextColor='gray'
                    value={eventData.title}
                    onChangeText={(text) => handleInputChange('title', text)}
                    style={styles.input}
                />
                <Text style={styles.label}>Description</Text>

                <TextInput
                    placeholder="Description"
                    placeholderTextColor='gray'
                    value={eventData.description}
                    onChangeText={(text) => handleInputChange('description', text)}
                    style={styles.input}
                    multiline
                />
                <Text style={styles.label}>Date</Text>

                <TouchableOpacity
                    style={styles.input}
                    onPress={() => setDatePickerVisible(true)}>
                    <Text style={{ color: eventData.date ? 'black' : 'gray' }}>
                        {eventData.date || 'Select Date (DD/MM/YYYY)'}
                    </Text>
                </TouchableOpacity>
                {datePickerVisible && (
                    <DateTimePicker
                        value={new Date()}
                        mode="date"
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        onChange={handleDateChange}
                    />
                )}

                <Text style={styles.label}>Time</Text>

                <TouchableOpacity
                    style={styles.input}
                    onPress={() => setTimePickerVisible(true)}>
                    <Text style={{ color: eventData.time ? 'black' : 'gray' }}>
                        {eventData.time || 'Select Time (HH:MM)'}
                    </Text>
                </TouchableOpacity>
                {timePickerVisible && (
                    <DateTimePicker
                        value={new Date()}
                        mode="time"
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        onChange={handleTimeChange}
                    />
                )}

                <Text style={styles.label}>Location</Text>

                <TextInput
                    placeholder="Location"
                    placeholderTextColor='gray'
                    value={eventData.location}
                    onChangeText={(text) => handleInputChange('location', text)}
                    style={styles.input}
                />
            </View>

            <TouchableOpacity onPress={handleSubmit} style={styles.submitBtn}>
                <Ionicons name='create' size={18} color='white' />
                <Text style={styles.submitTxt}>
                    {existingEvent ? 'Update Event' : 'Create Event'}
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 20,
        paddingLeft: 8,
        justifyContent: 'center',
        color: 'black'
    },
    inputContainer: {
        marginTop: 30,
        marginBottom: 20
    },
    backContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    titleTxt: {
        fontSize: font.size.large,
        color: 'black',
        fontWeight: font.weight.bold,
        marginLeft: 5
    },
    label: {
        color: 'gray',
        fontSize: font.size.medium,
        marginVertical: 10
    },
    submitBtn: {
        backgroundColor: '#001d3d',
        padding: 10,
        borderRadius: 20,
        marginVertical: 20,
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
    },
    submitTxt: {
        textAlign: 'center',
        color: 'white',
        fontSize: font.size.medium,
        fontWeight: font.weight.bold,
        marginLeft: 5
    },
});
