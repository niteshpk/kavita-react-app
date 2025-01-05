import React from 'react';
import { User } from '../../../types/auth';
import { formatDate } from '../../../lib/utils';

interface WelcomeMessageProps {
    user: User;
}

export function WelcomeMessage({ user }: WelcomeMessageProps) {
    const getTimeOfDay = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'morning';
        if (hour < 18) return 'afternoon';
        return 'evening';
    };

    return (
        <div className="bg-card rounded-lg p-6 shadow-lg">
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-3xl font-bold mb-2">
                        Good {getTimeOfDay()}, {user.username}!
                    </h1>
                    <p className="text-muted-foreground">
                        Member since {formatDate(user.created_at)}
                    </p>
                </div>
                <div className="flex flex-col items-end">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-lg font-bold text-primary">
                            {user.username[0].toUpperCase()}
                        </span>
                    </div>
                    <div className="mt-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.status === 'active'
                                ? 'bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400'
                                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800/20 dark:text-yellow-400'
                            }`}>
                            {user.status}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}