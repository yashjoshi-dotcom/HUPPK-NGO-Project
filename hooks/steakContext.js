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
    const loadStreaks = async () => {
            const points = await AsyncStorage?.getItem?.(POINTS_KEY);
            // console.log('Loading streaks from AsyncStorage', points);
            const days = await AsyncStorage?.getItem?.(DAYS_KEY);
            const lastLogin = await AsyncStorage?.getItem?.(LAST_LOGIN_KEY);
            if (points !== null) setPointsStreak(Number(points));
            if (days !== null) setDaysStreak(Number(days));
            if (lastLogin !== null) setLastLoginDate(new Date(lastLogin));
        };
    useEffect(() => {
        // console.log('Loading streaks from AsyncStorage');
       
        loadStreaks?.();
    }, []);

    const incrementPointsStreak = async (points = 1) => {
        // console.log('Incrementing pointsStreak by:', points);
        const pointsInLocal = await AsyncStorage?.getItem?.(POINTS_KEY);
        let currentPoints = 0;
        if(pointsInLocal != null)
        {
            currentPoints = Number(pointsInLocal);
        }
        await AsyncStorage?.setItem?.(POINTS_KEY, (currentPoints + points)?.toString?.());
        await  loadStreaks?.();
        setPointsStreak?.(prev => currentPoints + points);
    };

    const resetStorage = async () => {
       
        await AsyncStorage?.setItem?.(POINTS_KEY, null);
        await AsyncStorage?.setItem?.(DAYS_KEY, null);
        await AsyncStorage?.setItem?.(LAST_LOGIN_KEY, 'null');
        setPointsStreak?.(0);
        setDaysStreak?.(0);
        setLastLoginDate?.(null);
    };

    const resetDaysStreak= ()=>{
        // console.log('Resetting daysStreak');
        setDaysStreak?.(0);
        AsyncStorage?.setItem?.(DAYS_KEY, '0');
    }
    
    const incrementDaysStreak = async () => {
        // console.log('Incrementing daysStreak');
        const today = new Date().toDateString();
        // console.log(today);
        const lastLoginStored = await AsyncStorage?.getItem?.(LAST_LOGIN_KEY);
        // console.log('Last login date is today, not incrementing daysStreak.', lastLoginStored, today);
        if(lastLoginStored  && new Date(lastLoginStored)?.toDateString() === today )
        {
            // console.log('Last login date is today, not incrementing daysStreak.');
            return;
        }
        else
        {
            await AsyncStorage?.setItem?.(DAYS_KEY, (daysStreak + 1)?.toString?.());
            setDaysStreak?.(prev => prev + 1);
            incrementPointsStreak(100);
        }
    };

    const updateLastLoginDate = async () => {
        const today = new Date();
        await AsyncStorage?.setItem?.(LAST_LOGIN_KEY, today?.toString?.());
        setLastLoginDate?.(today);
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
                resetDaysStreak
            }}
        >
            {children}
        </StreakContext.Provider>
    );
};