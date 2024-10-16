'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CheckCircle2, AlertCircle, XCircle, Database } from 'lucide-react';
import Image from 'next/image';

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
    <Card className="w-[calc(33.333%-0.75rem)]">
        <CardContent className="flex flex-col items-center justify-center p-6">
            <div className='flex items-start gap-3'>
                <img src={imageSrc} alt={title} className="w-8 h-8 mb-2" />
                <p className="text-[18px] text-muted-foreground">{title}</p>
            </div>
            <CardTitle className={`text-[24px] font-bold ${color}`}>{percentage}</CardTitle>

        </CardContent>
    </Card>
);

export default function Dashboard() {
    return <>
        <div className="p-8">
            <div className="flex justify-between gap-4 mb-8">
                <StatusCard
                    title="Approved"
                    percentage="91.7%"
                    imageSrc="/approvedIcon.png"
                    color="text-green-500"
                />
                <StatusCard
                    title="Pending"
                    percentage="91.7%"
                    imageSrc="/denied.png"
                    color="text-yellow-500"
                />
                <StatusCard
                    title="Denied"
                    percentage="91.7%"
                    imageSrc="/deniedIcon.png"
                    color="text-red-500"
                />
            </div>

            <div className='flex gap-5 justify-center'>
                <Card className="  w-full">
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
                        <div className='flex mb-8'>
                            <Database className="w-10 h-16 mr-4 text-green-500" />
                            <CardTitle className="text-xl font-medium">Total Orders</CardTitle>
                        </div>
                        <div >
                            <p className="text-sm text-muted-foreground mb-1 font-bold">Items: <span className="font-normal text-orange-500 font-bold">37</span></p>
                            <p className="text-sm text-muted-foreground font-bold">Amount: <span className="font-normal text-orange-500 font-bold">200.00 RWF</span></p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    </>

}