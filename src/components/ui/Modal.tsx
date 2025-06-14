import type { ReactNode } from 'react';

export const Modal = ({ open, onClose, children }: {
    open: boolean;
    onClose: () => void;
    children: ReactNode;
}) => (
    <div className={`modal ${open ? 'modal-open' : ''}`}>
        <div className="modal-box">
            <div className="text-xl font-bold text-gray-900">
                {children}
            </div>
            <div className="modal-action">
                <button className="btn" onClick={onClose}>閉じる</button>
            </div>
        </div>
        <div className="modal-backdrop" onClick={onClose}></div>
    </div>
);
