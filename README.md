# IoT Logistics Tracking System

A real-time warehouse package tracking system using ESP32 BLE beacons, React, and Firebase.

## Features

- **Real-time Tracking**: Monitor package locations using ESP32 BLE scanners and beacons
- **Multi-Portal Interface**: Separate portals for senders, receivers, and warehouse monitoring
- **Firebase Integration**: Real-time database updates with Firebase Realtime Database
- **Bluetooth Verification**: Verify package presence using Bluetooth scanning
- **Responsive UI**: Modern, responsive interface built with React and Tailwind CSS

## Tech Stack

- **Frontend**: React 19 + Vite
- **Styling**: Tailwind CSS
- **Backend**: Firebase (Realtime Database, Authentication)
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Date Formatting**: date-fns

## Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Layout.jsx
│   │   └── Sidebar.jsx
│   ├── warehouse/
│   │   ├── ScannerStatus.jsx
│   │   ├── DetectionCards.jsx
│   │   └── DetectionHistory.jsx
│   ├── sender/
│   │   ├── ShipmentForm.jsx
│   │   └── ShipmentList.jsx
│   ├── receiver/
│   │   └── ProductList.jsx
│   └── common/
│       └── StatusBadge.jsx
├── pages/
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── WarehouseTracker.jsx
│   ├── SenderPortal.jsx
│   └── ReceiverPortal.jsx
├── hooks/
│   ├── useAuth.js
│   ├── useRealtimeData.js
│   └── useProducts.js
├── firebase/
│   └── config.js
└── utils/
    ├── constants.js
    └── formatters.js
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Firebase project with Realtime Database enabled

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd react+firebase
```

2. Install dependencies
```bash
npm install
```

3. Configure Firebase
   - Firebase configuration is already set in `src/firebase/config.js`
   - Ensure your Firebase Realtime Database rules are configured correctly

4. Start development server
```bash
npm run dev
```

5. Build for production
```bash
npm run build
```

## Firebase Database Structure

```
{
  "warehouse": {
    "scanners": {
      "ESP32_Master_001": {
        "scanner_id": "ESP32_Master_001",
        "status": "active",
        "last_ping": "2024-01-15T10:35:00Z",
        "trigger_scan": false,
        "location": "Warehouse A - Bay 1"
      }
    },
    "detections": {
      "detection_timestamp": {
        "device_name": "ESP32_Slave1",
        "signal_strength": -65,
        "scanner_id": "ESP32_Master_001",
        "detection_time": "2024-01-15T10:30:00Z",
        "is_present": true
      }
    }
  },
  "products": {
    "product_id": {
      "product_name": "Product Name",
      "product_id": "PKG-001",
      "sender_email": "sender@email.com",
      "receiver_email": "receiver@email.com",
      "device_name": "ESP32_Slave1",
      "status": "sent",
      "shipment_date": "2024-01-15T09:00:00Z"
    }
  },
  "users": {
    "user_uid": {
      "email": "user@email.com",
      "full_name": "User Name",
      "role": "sender"
    }
  }
}
```

## Portals

### Home Page
- Landing page with navigation to all portals

### Warehouse Tracker
- **Public Access**: No authentication required
- Real-time display of scanner status
- Live detection cards showing currently detected devices
- Detection history table

### Sender Portal
- **Authentication Required**: Login as sender
- Create new shipments with package details
- View all sent shipments
- Assign ESP32 devices to packages

### Receiver Portal
- **Authentication Required**: Login as receiver
- View incoming products assigned to you
- Bluetooth verification to check package presence
- Mark packages as received

## Status Values

- `sent`: Package shipped but not verified
- `present`: Package detected in warehouse
- `missing`: Package expected but not detected
- `irrelevant`: Package detected but for different receiver
- `received`: Package marked as received by receiver

## ESP32 Integration

The system is designed to work with ESP32 devices:

- **ESP32 Master**: BLE scanner that detects slave devices
- **ESP32 Slave**: BLE beacons attached to packages

Refer to the ESP32 code examples in the documentation for implementation details.

## Firebase Security Rules

Make sure to configure your Firebase Realtime Database rules:

```json
{
  "rules": {
    "warehouse": {
      ".read": true,
      "detections": {
        ".write": true
      },
      "scanners": {
        ".write": true
      }
    },
    "products": {
      ".read": "auth != null",
      "$productId": {
        ".write": "auth != null && (
          !data.exists() || 
          data.child('sender_email').val() == auth.token.email ||
          data.child('receiver_email').val() == auth.token.email
        )"
      }
    },
    "users": {
      "$uid": {
        ".read": "$uid === auth.uid",
        ".write": "$uid === auth.uid"
      }
    }
  }
}
```

## Development

### Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run lint`: Run ESLint

## License

MIT

## Support

For issues and questions, please contact the development team.
