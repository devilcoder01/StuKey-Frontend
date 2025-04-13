import { BrowserRouter as Router } from "react-router-dom";
import { WalletProvider } from "./context/WalletContext";
import Navbar from "./components/layout/Navbar";
import { ShowWalletPopupProvider } from "./context/ShowWalletPopup";
import { ToastProvider } from "./context/ToastContext";
import AppRoutes from "./routes";
import ToastContainer from "./components/common/ToastContainer";
import { UserInormationProvider } from "./context/userInformation";
import WalletConnectModal from "./components/common/WalletConnectModal";
import AppInitializer from "./components/common/AppInitializer";
import { AppInstructorProvider } from "./context/AppInstuctor";
function App() {
  return (
    <AppInstructorProvider>
        <WalletProvider>
          <ShowWalletPopupProvider>
            <ToastProvider>
              <UserInormationProvider>
                <Router>
                  <AppInitializer>
                    <div className="flex flex-col min-h-screen">
                      <Navbar />
                      <main className="flex-grow">
                        <AppRoutes />
                      </main>
                      <WalletConnectModal />
                      <ToastContainer />
                    </div>
                  </AppInitializer>
                </Router>
              </UserInormationProvider>
            </ToastProvider>
          </ShowWalletPopupProvider>
        </WalletProvider>
    </AppInstructorProvider>
  );
}

export default App;
