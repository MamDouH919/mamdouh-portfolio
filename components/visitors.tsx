import { supabase } from '@/supabaseClient'
import React, { useEffect, useState } from 'react'

function generateId() {
    return Date.now() + Math.floor(Math.random() * 1000000);
}

export async function trackVisitor({
    ip,
    userAgent,
    language,
    platform,
    screen,
    country,
    countryCode,
}: {
    ip: string;
    userAgent: string;
    language: string;
    platform: string;
    screen: string;
    country?: string;
    countryCode?: string;
}) {
    // 1. Get cookie_id from localStorage
    let cookieId = localStorage.getItem("cookie_id");

    // 2. If not exists, generate and save
    if (!cookieId) {
        cookieId = generateId().toString();
        localStorage.setItem("cookie_id", cookieId);
    }

    // 3. Insert into Supabase
    const { data, error } = await supabase
        .from("visitors")
        .insert([{
            cookie_id: cookieId,
            ip,
            userAgent,
            language,
            platform,
            screen,
            country,
            countryCode,
        }])
        .select();

    return { data, error };
}

async function getVisitorInfo() {
    // call ipapi for IP + country
    const ipRes = await fetch("https://ipapi.co/json/");
    const ipData = await ipRes.json();

    const info = {
        ip: ipData.ip,
        country: ipData.country_name, // e.g. "Egypt"
        countryCode: ipData.country,  // e.g. "EG"
        userAgent: navigator.userAgent,
        language: navigator.language,
        platform: navigator.platform,
        screen: `${window.screen.width}x${window.screen.height}`,
    };

    trackVisitor(info);
}

const Visitors = () => {
    const [visitors, setVisitors] = useState<number>(0)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        let isMounted = true
        const load = async () => {
            const { data, error } = await supabase
                .from("visitors")
                .select("*")

            if (!isMounted) return
            if (!error) {
                setVisitors(data?.length || 0)
            }
            setIsLoading(false)
        }
        load()
        return () => {
            isMounted = false
        }
    }, [])

    useEffect(() => {
        getVisitorInfo();
    }, [])

    return (
        <p className="text-lg sm:text-xl mb-12 text-gray-300 max-w-2xl mx-auto leading-relaxed font-bold">
            {isLoading ? "Loading visitors..." : `+${visitors} Visitors`}
        </p>
    )
}

export default Visitors
