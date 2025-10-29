import React, { useState } from 'react';
import { PhoneIcon, QrCodeIcon } from '../Icons';

interface PhoneCameraConnectProps {
    onToggle: (isActive: boolean) => void;
    isActive: boolean;
}

const PhoneCameraConnect: React.FC<PhoneCameraConnectProps> = ({ onToggle, isActive }) => {
    const [isConnecting, setIsConnecting] = useState(false);
    const [connectionCode, setConnectionCode] = useState('');

    const handleInitiate = () => {
        setIsConnecting(true);
    };

    const handleConnect = () => {
        if (connectionCode === '123456') { // Mock connection code
            onToggle(true);
            setIsConnecting(false);
        } else {
            alert('Invalid connection code. Use 123456.');
        }
    };

    const handleDisconnect = () => {
        onToggle(false);
        setConnectionCode('');
    };


    if (isActive) {
        return (
            <div className="phone-connect-panel">
                <h4>Remote Vision</h4>
                <div className="status-indicator">
                    <div className="status-dot active"></div>
                    <span>Phone Camera Connected</span>
                </div>
                <button onClick={handleDisconnect} className="disconnect mt-2 w-full">Disconnect</button>
            </div>
        );
    }

    return (
        <div className="phone-connect-panel">
            <h4>Remote Vision</h4>
            {!isConnecting ? (
                 <button onClick={handleInitiate} className="w-full">
                    <PhoneIcon /> Connect Phone Camera
                </button>
            ) : (
                <div className="connection-process">
                    <p>1. Scan the QR code with your device.</p>
                    <div className="qr-placeholder">
                        <QrCodeIcon />
                    </div>
                    <p>2. Enter the 6-digit code.</p>
                     <div className="code-input">
                        <input
                            type="text"
                            value={connectionCode}
                            onChange={(e) => setConnectionCode(e.target.value)}
                            maxLength={6}
                            placeholder="123456"
                         />
                        <button onClick={handleConnect}>Connect</button>
                    </div>
                     <button onClick={() => setIsConnecting(false)} className="cancel-btn mt-2">Cancel</button>
                </div>
            )}
        </div>
    );
};

export default PhoneCameraConnect;