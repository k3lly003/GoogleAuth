'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Database } from 'lucide-react';

const data = [
    { year: '2017', value1: 100, value2: 80 },
    { year: '2018', value1: 180, value2: 170 },
    { year: '2019', value1: 240, value2: 230 },
    { year: '2020', value1: 280, value2: 290 },
    { year: '2021', value1: 300, value2: 280 },
    { year: '2022', value1: 310, value2: 300 },
    { year: '2023', value1: 310, value2: 320 },
    { year: '2024', value1: 320, value2: 330 },
];

const StatusCard = ({ title, percentage, imageSrc, color }) => (
    <Card className="w-full">
        <CardContent className="flex items-center justify-center gap-8 p-6">
            <img src={imageSrc} alt={title} className="w-8 h-8" />
            <div className="flex flex-col items-end">
                <p className="text-[18px] text-muted-foreground">{title}</p>
                <CardTitle className={`text-[24px] font-bold ${color}`}>{percentage}</CardTitle>
            </div>
        </CardContent>
    </Card>
);

export default function Dashboard() {
    const [currentDate, setCurrentDate] = useState('');

    useEffect(() => {
        const updateDate = () => {
            const now = new Date();
            const formattedDate = now.toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
            });
            setCurrentDate(formattedDate);
        };

        updateDate();
        const interval = setInterval(updateDate, 1000); 

        return () => clearInterval(interval); 
    }, []);

    return (
        <div className="p-8">
            <div className="flex justify-between mb-4">
                <h1 className="text-md font-semibold">Equity</h1>
                <p>{currentDate}</p>
            </div>

            <div className="flex justify-between gap-6 mb-8">
                <StatusCard
                    title="Current balance"
                    percentage="90,000,000 RWF"
                    imageSrc="/approvedIcon.png"
                    color="text-green-500"
                />
                <StatusCard
                    title="Forecast"
                    percentage="20,000,000 RWF"
                    imageSrc="/denied.png"
                    color="text-yellow-500"
                />
            </div>

            <div className="flex gap-5 justify-center">
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Financial Transactions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="year" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="value1" fill="#f97316" />
                                <Bar dataKey="value2" fill="#facc15" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="flex flex-col items-start p-6">
                        <div className="flex mb-8">
                            <Database className="w-10 h-16 mr-4 text-green-500" />
                            <CardTitle className="text-xl font-medium">Total Orders</CardTitle>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground mb-1 font-bold">
                                Items: <span className="font-normal text-orange-500 font-bold">37</span>
                            </p>
                            <p className="text-sm text-muted-foreground font-bold">
                                Amount: <span className="font-normal text-orange-500 font-bold">200.00 RWF</span>
                            </p>
                        </div>
                    </CardContent>
                </Card> 
                 
                
            </div>
        </div>
    );
}
