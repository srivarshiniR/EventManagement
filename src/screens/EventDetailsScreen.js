import React, { useState,useEffect } from 'react';
import { View, Text, ScrollView, Alert, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { updateAttendees } from '../redux/slices/eventSlice';
import Swiper from 'react-native-swiper';
import font from '../theme/font/fontsizes';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function EventDetailsScreen({ route, navigation }) {
    const { eventId } = route.params;
    const dispatch = useDispatch();

    const event = useSelector((state) =>
        state.events.events.find((e) => e.id === eventId)
    );

    const [isRegistered, setIsRegistered] = useState(false);
    const [imageLoading, setImageLoading] = useState([]);

    useEffect(() => {
        if (!event) {
            navigation.goBack(); 
        }
    }, [event, navigation]);


    const handleImageLoad = (index) => {
        setImageLoading((prevState) => {
            const newState = [...prevState];
            newState[index] = true;
            return newState;
        });
    };

    const handleRegister = () => {
        Alert.alert('Success', 'You have registered for the event!');
        setIsRegistered(true);
        dispatch(updateAttendees({ eventId, attendees: event.attendees + 1 }));

    };

    const handleNavigateToEdit = () => {
        navigation.navigate('CreateEditEvent', { eventId });
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>{event.title}</Text>

            {/* Image Slider */}
            {event.images && event.images.length > 0 ? (
                <Swiper
                    style={styles.swiper}
                    autoplay
                    loop
                    dotStyle={styles.dot}
                    activeDotStyle={styles.activeDot}
                >
                    {event.images.map((image, index) => (
                        <View key={index} style={styles.slide}>
                            {!imageLoading[index] && (
                                <View style={styles.placeholder}>
                                    <Text style={styles.placeholderText}>Loading...</Text>
                                </View>
                            )}
                            <Image
                                source={{ uri: image }}
                                style={styles.image}
                                onLoad={() => handleImageLoad(index)}
                                onLoadEnd={() => handleImageLoad(index)}
                            />
                        </View>
                    ))}

                </Swiper>
            ) : (
                <View style={styles.noImg}>
                    <Image
                        source={{ uri: 'https://tse4.mm.bing.net/th?id=OIP.F00dCf4bXxX0J-qEEf4qIQHaD6&pid=Api&P=0&h=220' }}
                        style={styles.image}
                    />
                </View>
            )}

            {/* Event Details */}
            <TouchableOpacity onPress={handleNavigateToEdit}>
                <Text style={styles.description}>{event.description || 'No description available.'}</Text>
                <Text style={styles.label}>Venue</Text>

                <View style={styles.flex}>
                    <View>
                        <Text style={styles.txt}>{`Location: ${event.location}`}</Text>
                        <Text style={styles.txt}>{`Attendees: ${event.attendees || 'None'}`}</Text>
                    </View>
                    <View>
                        <Text style={styles.txt}>{`Date: ${event.date}`}</Text>
                        <Text style={styles.txt}>{`Time: ${event.time}`}</Text>
                    </View>
                </View>

                <Text style={styles.label}>Event Organizer</Text>

                {event.organizer ? (
                    <View style={styles.organizerContainer}>
                        <Text style={styles.txt}>{event.organizer.name}</Text>
                        <View style={styles.flex_center}>
                            <Icon name="phone" size={14} color="blue" style={styles.icon} />
                            <Text style={styles.txt}>{event.organizer.contact}</Text>
                        </View>
                    </View>
                ) : (
                    <Text style={styles.txt}>Organizer details are not available.</Text>
                )}
            </TouchableOpacity>

            <TouchableOpacity
                onPress={!isRegistered ? handleRegister : null}
                style={[styles.regBtn, isRegistered && styles.disabledBtn]}
            >
                <Ionicons
                    name={isRegistered ? 'checkmark' : 'checkmark-done'}
                    size={18}
                    color="white"
                    style={styles.icon}
                />
                <Text style={styles.regTxt}>
                    {isRegistered ? 'Registered' : 'Register for Event'}
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
    swiper: {
        height: 150,
        marginBottom: 20,
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noImg: {
        height: 150,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    dot: {
        backgroundColor: 'rgba(0,0,0,.2)',
        width: 8,
        height: 8,
        borderRadius: 4,
        margin: 3,
    },
    activeDot: {
        backgroundColor: '#FFEE58',
        width: 8,
        height: 8,
        borderRadius: 4,
        margin: 3,
    },
    title: {
        fontSize: font.size.large,
        fontWeight: '500',
        color: 'black',
        marginBottom: 20,
        textAlign: 'center',
    },
    txt: {
        color: 'black',
        marginBottom: 5,
    },
    label: {
        color: 'black',
        borderBottomWidth: 0.5,
        borderColor: 'gray',
        paddingVertical: 10,
        marginBottom: 15,
        fontSize: font.size.medium,
        fontWeight: font.weight.bold,
    },
    description: {
        color: 'black',
        fontSize: font.size.medium,
        marginVertical: 20,
    },
    flex: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    flex_center: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginRight: 5,
    },
    organizerContainer: {
        marginBottom: 20,
    },
    regBtn: {
        backgroundColor: '#001d3d',
        padding: 10,
        borderRadius: 20,
        marginVertical: 20,
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
    },
    regTxt: {
        textAlign: 'center',
        color: 'white',
        fontSize: font.size.medium,
        fontWeight: font.weight.bold,
    },
    disabledBtn: {
        backgroundColor: '#6c757d',
    },
    placeholder: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        textAlign: 'center'
    },
    placeholderText: {
        color: 'gray',
        paddingVertical: 10
    },
});
