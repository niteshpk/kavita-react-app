import React from 'react';
import { FileText, MessageSquare, Heart } from 'lucide-react';

export function UserStats() {
    const stats = [
        {
            label: 'Posts',
            value: '12',
            icon: FileText,
            color: 'text-blue-500',
            bgColor: 'bg-blue-500/10',
        },
        {
            label: 'Comments',
            value: '48',
            icon: MessageSquare,
            color: 'text-purple-500',
            bgColor: 'bg-purple-500/10',
        },
        {
            label: 'Likes',
            value: '156',
            icon: Heart,
            color: 'text-pink-500',
            bgColor: 'bg-pink-500/10',
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {stats.map(({ label, value, icon: Icon, color, bgColor }) => (
                <div key={label} className="bg-card rounded-lg p-6 shadow-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">{label}</p>
                            <p className="text-2xl font-bold mt-1">{value}</p>
                        </div>
                        <div className={`p-3 rounded-full ${bgColor}`}>
                            <Icon className={`w-6 h-6 ${color}`} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}