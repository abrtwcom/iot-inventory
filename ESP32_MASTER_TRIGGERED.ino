/*
 * ESP32 Master BLE Warehouse Tracker (with Firebase trigger support)
 * Scans for slave devices when `/warehouse/scanner/trigger_scan/requested` is set to true
 * and writes detections to Firebase. Adds processing lock and resets trigger after scan.
 */

#include <WiFi.h>
#include <FirebaseESP32.h>
#include <BLEDevice.h>
#include <BLEScan.h>
#include <BLEClient.h>
#include <BLEAdvertisedDevice.h>
#include <time.h>

// WiFi credentials
#define WIFI_SSID "nova"  // ← Update with your WiFi network name
#define WIFI_PASSWORD "12345678"  // ← Update with your WiFi password

// Firebase credentials
#define FIREBASE_HOST "iot-logistic-kit-default-rtdb.firebaseio.com"
#define FIREBASE_AUTH "ZJ4HYXmDF04sdDomeICDGNZoz52YvVfoKFtAzLKY"  // ✅ Database Secret Key

// BLE Configuration
#define SERVICE_UUID        "12345678-1234-1234-1234-1234567890ab"
#define CHARACTERISTIC_UUID "abcdefab-1234-5678-1234-abcdefabcdef"

// Slave device names (BLE IDs of packages)
const char* SLAVES[] = {"ESP32_Slave1", "ESP32_Slave2", "ESP32_Slave3"};
const int NUM_SLAVES = 3;
const int SCAN_TIME_SECS = 5;
const int MAX_RETRIES = 3;

BLEClient* pClient = nullptr;
FirebaseData firebaseData;

// Trigger polling and processing lock
bool processingScan = false;
unsigned long lastTriggerPoll = 0;
const unsigned long TRIGGER_POLL_INTERVAL_MS = 1000; // 1s

// --------------------------------------------------------------------
// Scanner heartbeat and simple scan status helpers (to confirm activity in RTDB)
void updateScannerStatus(const char* status) {
  String base = "/warehouse/scanner";
  Firebase.setString(firebaseData, base + "/status", status);
  Firebase.setTimestamp(firebaseData, base + "/last_seen");
}

void writeScanStatus(const char* targetName, int attempt, bool found, int rssi) {
  String base = "/warehouse/scanner/last_scan";
  Firebase.setString(firebaseData, base + "/target", String(targetName));
  Firebase.setInt(firebaseData, base + "/attempt", attempt);
  Firebase.setBool(firebaseData, base + "/found", found);
  Firebase.setInt(firebaseData, base + "/rssi", rssi);
  Firebase.setInt(firebaseData, base + "/at", millis());
}

static unsigned long long fallbackTimestampMillis() {
  time_t now;
  time(&now);
  if (now > 1700000000) {
    return static_cast<unsigned long long>(now) * 1000ULL;
  }
  return static_cast<unsigned long long>(millis());
}

class MyClientCallback : public BLEClientCallbacks {
  void onConnect(BLEClient* client) override {
    Serial.println("Connected to slave.");
  }
  void onDisconnect(BLEClient* client) override {
    Serial.println("Disconnected from slave.");
  }
};

// Connect to WiFi
void connectToWiFi() {
  Serial.print("Connecting to WiFi");
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  
  int attempts = 0;
  const int maxAttempts = 20; // 10 seconds timeout
  
  while (WiFi.status() != WL_CONNECTED && attempts < maxAttempts) {
    delay(500);
    Serial.print(".");
    attempts++;
  }
  
  if (WiFi.status() == WL_CONNECTED) {
    Serial.println();
    Serial.print("Connected! IP address: ");
    Serial.println(WiFi.localIP());
  } else {
    Serial.println();
    Serial.println("WiFi connection failed! Please check credentials.");
    Serial.println("Restarting in 5 seconds...");
    delay(5000);
    ESP.restart();
  }
}

// Initialize Firebase
void initFirebase() {
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);

  // Test Firebase connection
  if (Firebase.ready()) {
    Serial.println("Firebase initialized successfully");
  } else {
    Serial.println("Firebase initialization failed!");
    Serial.println("Error: " + firebaseData.errorReason());
    Serial.println("Restarting in 5 seconds...");
    delay(5000);
    ESP.restart();
  }
}

// Send BLE detection to Firebase
void sendDetectionToFirebase(int slaveIndex, bool detected, int rssi) {
  String path = "/warehouse/detections";
  unsigned long long timestampMs = fallbackTimestampMillis();
  String timestampKey = String(timestampMs) + String(random(1000, 9999)); // Add random to avoid collisions
  
  FirebaseJson json;
  json.set("deviceName", SLAVES[slaveIndex]);
  json.set("slaveIndex", slaveIndex);
  json.set("detected", detected);
  json.set("rssi", rssi);
  json.set("timestamp", String(timestampMs));
  json.set("scannerId", "WAREHOUSE_MASTER_001");
  
  String childPath = path + "/" + timestampKey;
  
  if (Firebase.setJSON(firebaseData, childPath, json)) {
    Serial.println("Detection sent to Firebase: " + String(SLAVES[slaveIndex]));
  } else {
    Serial.println("Failed to send detection: " + firebaseData.errorReason());
  }
  
  // Also update current status
  String statusPath = "/warehouse/current_status/" + String(SLAVES[slaveIndex]);
  Firebase.setBool(firebaseData, statusPath + "/present", detected);
  if (!Firebase.setTimestamp(firebaseData, statusPath + "/last_seen")) {
    Firebase.setDouble(firebaseData, statusPath + "/last_seen", static_cast<double>(fallbackTimestampMillis()));
  }
  Firebase.setInt(firebaseData, statusPath + "/rssi", rssi);
}

bool tryConnectToAdvertisedDevice(BLEAdvertisedDevice* advDev) {
  BLEAddress addr = advDev->getAddress();
  Serial.print("Attempting connect to: ");
  Serial.println(addr.toString().c_str());

  if (pClient->connect(addr)) {
    return true;
  } else {
    Serial.println("Connect failed.");
    return false;
  }
}

void syncTime() {
  configTime(0, 0, "pool.ntp.org", "time.nist.gov");
  Serial.print("Synchronizing time");
  for (int i = 0; i < 30; i++) {
    time_t now;
    time(&now);
    if (now > 1700000000) {
      Serial.println(" - done");
      return;
    }
    Serial.print(".");
    delay(500);
  }
  Serial.println(" - failed, using millis fallback");
}

void scanAndDetectSlave(const char* targetName, int slaveIndex) {
  BLEScan* pBLEScan = BLEDevice::getScan();
  pBLEScan->setActiveScan(true);

  bool found = false;
  int rssi = -100;

  for (int attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    Serial.printf("Scanning for %s (try %d/%d)...\n", targetName, attempt, MAX_RETRIES);
    writeScanStatus(targetName, attempt, false, -100);
    BLEScanResults results = pBLEScan->start(SCAN_TIME_SECS, false);
    int count = results.getCount();

    for (int i = 0; i < count; i++) {
      BLEAdvertisedDevice adv = results.getDevice(i);
      // adv.getName() returns an Arduino String; avoid converting to std::string
      String name = adv.getName();
      if (name.length() > 0 && name == String(targetName)) {
        Serial.printf("Target %s found!\n", targetName);
        found = true;
        rssi = adv.getRSSI();
        
        writeScanStatus(targetName, attempt, true, rssi);
        
        // Try to connect
        if (tryConnectToAdvertisedDevice(&adv)) {
          Serial.println(String(slaveIndex + 1));  // print 1/2/3
          delay(5000); // connected for 5s
          pClient->disconnect();
        }
        break;
      }
    }

    if (!found) {
      Serial.println("Not found in this scan, retrying...");
      writeScanStatus(targetName, attempt, false, -100);
    } 

    pBLEScan->clearResults();
    
    if (found) {
      Serial.println("Slave found, moving to next target...");
      break;
    }
    
    delay(1000);
  }
  
  // Send final detection result (only once per scan cycle)
  Serial.printf("Final result for %s: %s (RSSI: %d)\n", targetName, found ? "FOUND" : "MISSING", rssi);
  sendDetectionToFirebase(slaveIndex, found, rssi);
}

// Check Firebase trigger path /warehouse/scanner/trigger_scan/requested
bool checkTriggerScan() {
  String path = "/warehouse/scanner/trigger_scan/requested";
  if (Firebase.getBool(firebaseData, path)) {
    if (firebaseData.boolData()) {
      Serial.println("=== SCAN TRIGGERED BY RECEIVER ===");
      return true;
    }
  }
  return false;
}

void performFullScanCycle() {
  // Set processing lock in DB (optional but helpful)
  Firebase.setBool(firebaseData, "/warehouse/scanner/trigger_scan/processing", true);
  updateScannerStatus("scanning");

  // Iterate slaves and run normal scan routine
  for (int i = 0; i < NUM_SLAVES; i++) {
    scanAndDetectSlave(SLAVES[i], i);
    delay(2000);
    updateScannerStatus("scanning");
  }

  // Reset trigger and processing flags
  Firebase.setBool(firebaseData, "/warehouse/scanner/trigger_scan/requested", false);
  Firebase.setBool(firebaseData, "/warehouse/scanner/trigger_scan/processing", false);
  updateScannerStatus("online");
}

void setup() {
  Serial.begin(115200);
  delay(2000); // Give time for serial to initialize
  
  Serial.println();
  Serial.println("========================================");
  Serial.println("ESP32 BLE Master - Warehouse Tracker");
  Serial.println("========================================");
  Serial.println("Starting initialization...");
  
  // Initialize BLE
  BLEDevice::init("ESP32_Master");
  pClient = BLEDevice::createClient();
  pClient->setClientCallbacks(new MyClientCallback());
  
  // Connect to WiFi
  connectToWiFi();
  
  // Initialize Firebase
  initFirebase();
  syncTime();
  updateScannerStatus("online");
  
  Serial.println("Master initialized and ready!");
  Serial.println("========================================");
}

void loop() {
  // Keep scanner heartbeat
  updateScannerStatus("online");

  // Poll trigger path periodically
  if (millis() - lastTriggerPoll >= TRIGGER_POLL_INTERVAL_MS) {
    lastTriggerPoll = millis();
    // Only start if not already processing
    if (!processingScan && checkTriggerScan()) {
      processingScan = true;
      performFullScanCycle();
      processingScan = false;
    }
  }

  // Existing behavior: also perform periodic full scan (optional)
  static unsigned long lastAutoScan = 0;
  const unsigned long AUTO_SCAN_INTERVAL = 60UL * 1000UL; // 1 minute
  if (millis() - lastAutoScan > AUTO_SCAN_INTERVAL && !processingScan) {
    lastAutoScan = millis();
    Serial.println("Auto-scan triggered (periodic)");
    performFullScanCycle();
  }

  // Optional: Check WiFi connection periodically
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("WiFi disconnected! Attempting reconnection...");
    connectToWiFi();
  }

  delay(10);
}
