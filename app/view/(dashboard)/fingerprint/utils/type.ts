export interface FingerprintMachine {
    id: string;
    name: string;
    location: string;
    ipAddress: string;
    status: 'online' | 'offline' | 'maintenance';
    lastSync: string;
    totalUsers: number;
    registeredUsers: number;
    model: string;
    serialNumber: string;
}

