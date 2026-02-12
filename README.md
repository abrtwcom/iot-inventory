🏭 IoT Warehouse Automation System
https://iot-inventory-87709788-95492.web.app/

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-19.1-61dafb?logo=react)](https://reactjs.org/)
[![Firebase](https://img.shields.io/badge/Firebase-12.8-ffca28?logo=firebase)](https://firebase.google.com/)
[![Vite](https://img.shields.io/badge/Vite-7.1-646cff?logo=vite)](https://vitejs.dev/)

A real-time warehouse package tracking system powered by ESP32 BLE beacons, React, and Firebase. Track packages in real-time, verify deliveries with Bluetooth scanning, and manage your logistics operations through an intuitive multi-portal interface.

📖 **[Read the full blog post](https://medium.com/@amitbartwal008/warehouse-automation-how-iot-real-time-tracking-are-transforming-logistics-669beeb8fb8a)** to learn more about the technology behind this project.

 ✨ Features

- **📍 Real-time Tracking**: Monitor package locations using ESP32 BLE scanners and beacons
- **🔄 Multi-Portal Interface**: Separate portals for senders, receivers, and warehouse monitoring
- **🔥 Firebase Integration**: Real-time database updates with automatic synchronization
- **📡 Bluetooth Verification**: Verify package presence using BLE scanning
- **🎨 Modern UI**: Responsive, professional interface built with React and Tailwind CSS
- **⚡ Live Updates**: Watch package status change in real-time as devices are detected
- **📊 Analytics Dashboard**: Track shipments, delivery status, and warehouse activity

🖼️ Screenshots

 Home Page
Landing page with navigation to all portals and system overview.

<img width="1910" height="782" alt="Screenshot From 2026-01-21 14-26-57" src="https://github.com/user-attachments/assets/987286dd-f998-46e9-b412-5b1518e9a629" />

Sender Portal
Create new shipments, assign ESP32 devices to packages, and view all sent shipments.

<img width="1904" height="924" alt="Screenshot From 2026-01-19 19-56-42" src="https://github.com/user-attachments/assets/56a1f6e0-3cc1-493b-b498-130d4244f99a" />

Receiver Portal
View incoming products, verify package presence with Bluetooth, and mark items as received.

<img width="1904" height="924" alt="Screenshot From 2026-01-19 19-57-05" src="https://github.com/user-attachments/assets/7ac858f9-3d53-4c95-a3a7-feac0d6989ec" />

🛠️ Tech Stack

- **Frontend**: React 19 + Vite
- **Styling**: Tailwind CSS 3.4
- **Backend**: Firebase (Realtime Database, Authentication)
- **Routing**: React Router DOM 7
- **Icons**: Lucide React
- **Hardware**: ESP32 (Master and Slave devices)
- **Communication Protocol**: Bluetooth Low Energy (BLE)

 🚀 Getting Started

Prerequisites

- **Node.js** v18 or higher
- **npm** or **yarn**
- **Firebase project** with Realtime Database and Authentication enabled
- (Optional) ESP32 devices for hardware integration

Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/abrtwcom/warehose-automation.git
   cd warehose-automation
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Firebase**
   
   Copy the example environment file and add your Firebase credentials:
   ```bash
   cp .env.example .env
   ```

   Edit `.env` and fill in your Firebase configuration:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key_here
   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
   VITE_FIREBASE_APP_ID=1:123456789:web:abc123
   ```

   > **Note**: You can get these values from your Firebase Console → Project Settings → General → Your apps → Firebase SDK snippet → Config

4. **Start development server**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173`

5. **Build for production**
   ```bash
   npm run build
   ```

   The production-ready files will be in the `dist/` directory.

📁 Project Structure

```
warehose-automation/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Layout.jsx         # Main layout wrapper
│   │   │   └── Sidebar.jsx        # Navigation sidebar
│   │   ├── warehouse/
│   │   │   ├── DetectionCards.jsx # Live device detection display
│   │   │   ├── DetectionHistory.jsx # Historical detection log
│   │   │   ├── ScannerStatus.jsx  # Scanner connectivity status
│   │   │   └── Orders.jsx         # Order management table
│   │   ├── sender/
│   │   │   ├── ShipmentForm.jsx   # Create new shipment form
│   │   │   └── ShipmentList.jsx   # List of sent shipments
│   │   ├── receiver/
│   │   │   └── ProductList.jsx    # Incoming package list
│   │   └── common/
│   │       └── StatusBadge.jsx    # Reusable status indicator
│   ├── pages/
│   │   ├── Home.jsx               # Landing page
│   │   ├── Login.jsx              # Authentication page
│   │   ├── WarehouseTracker.jsx   # Warehouse monitoring
│   │   ├── SenderPortal.jsx       # Package sender interface
│   │   └── ReceiverPortal.jsx     # Package receiver interface
│   ├── hooks/
│   │   ├── useAuth.js             # Authentication state management
│   │   ├── useRealtimeData.js     # Firebase real-time data subscription
│   │   └── useProducts.js         # Product/package CRUD operations
│   ├── firebase/
│   │   └── config.js              # Firebase initialization
│   ├── utilities/
│   │   ├── constants.js           # App-wide constants
│   │   └── formatters.js          # Date/time formatting utilities
│   ├── App.jsx                    # Main app component with routing
│   ├── main.jsx                   # Application entry point
│   └── index.css                  # Global styles and design system
├── ESP32_MASTER_TRIGGERED.ino     # ESP32 Master device firmware
├── ESP32_TRIGGER_UPDATE.md        # ESP32 implementation docs
├── .env.example                   # Environment variable template
└── README.md                      # This file
```

🔌 ESP32 Integration

The system uses ESP32 devices for Bluetooth Low Energy (BLE) communication:

- **ESP32 Master**: Acts as a BLE scanner that detects all slave devices in range
- **ESP32 Slaves**: BLE beacons attached to physical packages/products

How it works:

1. Master ESP32 continuously scans for BLE devices
2. When slaves are detected, Master updates Firebase with device presence
3. React frontend subscribes to Firebase for real-time updates
4. Package status automatically updates based on device detection

See [`ESP32_MASTER_TRIGGERED.ino`](ESP32_MASTER_TRIGGERED.ino) and [`ESP32_TRIGGER_UPDATE.md`](ESP32_TRIGGER_UPDATE.md) for detailed implementation instructions.

📱 Application Features

### 🏠 Home Page
- Landing page with overview of the system
- Quick navigation to all portals
- Feature highlights and system capabilities

### 📦 Warehouse Tracker
- **Real-time scanner status**: Monitor ESP32 Master connectivity
- **Live detection cards**: See currently detected BLE devices
- **Detection history**: Complete log of all device detections with timestamps

### 📤 Sender Portal
- **Create shipments**: Add package details, assign receivers, and associate ESP32 devices
- **Track shipments**: View all sent packages and their current status
- **Device assignment**: Link ESP32 slave beacons to specific packages

### 📥 Receiver Portal
- **View incoming packages**: See all products assigned to you
- **Bluetooth verification**: Trigger BLE scan to verify package presence
- **Mark as received**: Confirm delivery and update package status
- **Real-time status**: Automatic updates as packages move through the warehouse

## 🔐 Firebase Database Structure

```
firebase-database/
├── products/
│   └── {productId}/
│       ├── name: "Package Name"
│       ├── sender_email: "sender@example.com"
│       ├── receiver_email: "receiver@example.com"
│       ├── device_name: "ESP32_SLAVE_01"
│       ├── status: "present" | "missing" | "received"
│       ├── created_date: "2024-01-20T10:00:00Z"
│       └── updated_date: "2024-01-20T15:30:00Z"
├── warehouse/
│   ├── scanner/
│   │   ├── status: "online" | "scanning" | "offline"
│   │   └── last_seen: "2024-01-20T15:30:00Z"
│   ├── current_status/
│   │   └── {deviceName}/
│   │       ├── present: true | false
│   │       └── last_seen: timestamp
│   └── detections/
│       └── {detectionId}/
│           ├── device_name: "ESP32_SLAVE_01"
│           ├── rssi: -45
│           └── timestamp: 1234567890
```

### Security Rules

Configure your Firebase Realtime Database rules according to your security requirements. For development:

```json
{
  "rules": {
    ".read": "auth != null",
    ".write": "auth != null"
  }
}
```

For production, implement more granular rules based on user roles and data ownership.

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details on how to:
- Report bugs
- Suggest features
- Submit pull requests
- Follow our code style

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Amit Bartwal**
- Blog: [Medium Article](https://medium.com/@amitbartwal008/warehouse-automation-how-iot-real-time-tracking-are-transforming-logistics-669beeb8fb8a)
- GitHub: [@abrtwcom](https://github.com/abrtwcom)

## 🙏 Acknowledgments

- Firebase for real-time database infrastructure
- React community for excellent tooling
- ESP32 community for BLE documentation
- All contributors who have helped improve this project

## 📞 Support

If you encounter any issues or have questions:
- Open an [issue](https://github.com/abrtwcom/warehose-automation/issues)
- Read the [documentation](https://github.com/abrtwcom/warehose-automation/wiki)
- Check existing issues for solutions

---

**⭐ If you find this project useful, please consider giving it a star!**
