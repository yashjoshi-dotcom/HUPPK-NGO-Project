import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const StreakContext = createContext();

export const useStreak = () => useContext(StreakContext);

const POINTS_KEY = 'pointsStreak';
const DAYS_KEY = 'daysStreak';
const LAST_LOGIN_KEY = 'lastLoginDate';

export const StreakProvider = ({ children }) => {
    const [pointsStreak, setPointsStreak] = useState( 0);
    const [daysStreak, setDaysStreak] = useState( 0);
    const [lastLoginDate, setLastLoginDate] = useState(null);

    // Load streaks from AsyncStorage on mount
    useEffect(() => {
        const loadStreaks = async () => {
            const points = await AsyncStorage?.getItem?.(POINTS_KEY);
            const days = await AsyncStorage?.getItem?.(DAYS_KEY);
            const lastLogin = await AsyncStorage?.getItem?.(LAST_LOGIN_KEY);
            if (points !== null) setPointsStreak(Number(points));
            if (days !== null) setDaysStreak(Number(days));
            if (lastLogin !== null) setLastLoginDate(new Date(lastLogin));
        };
        loadStreaks?.();
    }, []);

    const incrementPointsStreak = (points = 1) => {
        console.log('Incrementing pointsStreak by:', points);
        setPointsStreak?.(prev => prev + points);
        AsyncStorage?.setItem?.(POINTS_KEY, (pointsStreak + points)?.toString?.());
    };

    const resetStorage = () => {
        setPointsStreak?.(0);
        setDaysStreak?.(0);
        setLastLoginDate?.(null);
        AsyncStorage?.setItem?.(POINTS_KEY, null);
        AsyncStorage?.setItem?.(DAYS_KEY, null);
        AsyncStorage?.setItem?.(LAST_LOGIN_KEY, 'null');
    };

    const incrementDaysStreak = () => {
        console.log('Incrementing daysStreak');
        setDaysStreak?.(prev => prev + 1);
        AsyncStorage?.setItem?.(DAYS_KEY, (daysStreak + 1)?.toString?.());
    };

    const updateLastLoginDate = () => {
        const today = new Date();
        setLastLoginDate?.(today);
        AsyncStorage?.setItem?.(LAST_LOGIN_KEY, today?.toString?.());
    };

    return (
        <StreakContext.Provider
            value={{
                pointsStreak,
                daysStreak,
                lastLoginDate,
                incrementPointsStreak,
                resetStorage,
                incrementDaysStreak,
                updateLastLoginDate,
            }}
        >
            {children}
        </StreakContext.Provider>
    );
};