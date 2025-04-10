import React from "react";
import { useShowWalletPopup } from "../../context/ShowWalletPopup";
import { useWallet } from "../../context/WalletContext";
import { useWalletAuth } from "../../hooks/useWalletAuth";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import { EIP6963ProviderDetail } from "../../types/wallet.types";

const WalletConnectModal: React.FC = () => {
  const { showWalletPopup, setShowWalletPopup } = useShowWalletPopup();
  const { providers, isWalletConnecting, selectedWallet, userAccount } =
    useWallet();
  const { signinMessage, error, walletConnect } = useWalletAuth();
  const navigate = useNavigate();

  if (!showWalletPopup) {
    return null;
  }

  const hangleSignin = async () => {
    const success = await signinMessage();
    if (success) {
      setShowWalletPopup(false);
      navigate("/home");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-md flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Connect Wallet</h2>
          <button
            onClick={() => setShowWalletPopup(false)}
            className="text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            &times;
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        {isWalletConnecting ? (
          <div className="flex justify-center items-center py-8">
            <LoadingSpinner size="large" text="Connecting wallet..." />
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-gray-600 mb-4">
              Select a wallet to connect to this application:
            </p>

            {providers.length > 0 ? (
              providers.map((provider) => (
                <div
                  key={provider.info.uuid}
                  onClick={() => walletConnect(provider)}
                  className="flex items-center justify-between p-4 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  <div className="flex items-center">
                    <img
                      src={provider.info.icon}
                      alt={provider.info.name}
                      className="w-8 h-8 mr-3"
                    />
                    <span className="font-medium">{provider.info.name}</span>
                  </div>
                  <div className="bg-[#2B2928] px-4 py-2 rounded-sm text-white text-sm">
                    installed
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-4 text-gray-500">
                No wallet providers detected. Please install a wallet extension.
              </div>
            )}

            {userAccount && selectedWallet && (
              <div>
                <div className="h-0.5 bg-gray-300 rounded-full"></div>
                <div className="text-left py-4 text-gray-500">
                  Sign in to continue
                </div>
                <div className="flex items-center justify-between p-4 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-center">
                    <img
                      src={selectedWallet?.info?.icon || ""}
                      alt={selectedWallet?.info?.name || ""}
                      className="w-8 h-8 mr-3"
                    />
                    <span className="font-medium">
                      {selectedWallet?.info?.name || ""}
                    </span>
                  </div>
                  <button
                    className="bg-[#FE0444] px-4 py-2 rounded-sm text-white text-sm cursor-pointer"
                    onClick={() => hangleSignin()}
                  >
                    Sign in
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default WalletConnectModal;
