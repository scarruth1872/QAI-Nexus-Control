import React from 'react';
import PrinterBay from './PrinterBay';
import CncAndLaserControl from './CncAndLaserControl';
import MaterialInventory from './MaterialInventory';
import { useAppState } from '../../contexts/AppContext.tsx';

const FabricationWorkshopView: React.FC = () => {
    const { arasLabState } = useAppState();
    const fabState = arasLabState.fabrication;

    return (
        <div className="fabrication-grid">
            <div className="fab-printers">
                <PrinterBay printers={fabState.printers} />
            </div>
            <div className="fab-cnc">
                <CncAndLaserControl machine={fabState.cnc} name="CNC Mill" />
            </div>
             <div className="fab-laser">
                <CncAndLaserControl machine={fabState.laserCutter} name="Laser Cutter" />
            </div>
            <div className="fab-inventory">
                <MaterialInventory materials={fabState.materials} />
            </div>
            <div className="fab-safety module-panel">
                <h3>Safety Systems</h3>
                <p>Ventilation: {fabState.safety.ventilation}</p>
                <p>Fire Suppression: {fabState.safety.fireSuppression}</p>
            </div>
        </div>
    );
};

export default FabricationWorkshopView;
