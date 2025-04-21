#include <ArduinoBLE.h>

//All the pins that are used
const int buttonPin = 4;
const int lightPin = A0;

//Ultrasonic sensor pins
const int trigPin = 9;
const int echoPin = 10;

//Button logic
int oldButtonState = LOW;

//Globals for distance and light
byte distance;
byte light;

void setup() {
  Serial.begin(9600);
  while (!Serial);

  // configure the button pin as input
  pinMode(buttonPin, INPUT);
  pinMode(trigPin, OUTPUT); // Sets the trigPin as an Output
  pinMode(echoPin, INPUT); // Sets the echoPin as an Input

  // initialize the Bluetooth® Low Energy hardware
  BLE.begin();

  Serial.println("BLE Add: " + BLE.address());

  Serial.println("Bluetooth® Low Energy Central - LED control");

  // start scanning for peripherals
  BLE.scanForUuid("4f0c973c-4a93-4949-b1bc-58940bb33b45");
}

void loop() {
  // check if a peripheral has been discovered
  BLEDevice peripheral = BLE.available();

  if (peripheral) {
    // discovered a peripheral, print out address, local name, and advertised service
    Serial.print("Found ");
    Serial.print(peripheral.address());
    Serial.print(" '");
    Serial.print(peripheral.localName());
    Serial.print("' ");
    Serial.print(peripheral.advertisedServiceUuid());
    Serial.println();

    if (peripheral.localName() != "LED") {
      return;
    }

    // stop scanning
    BLE.stopScan();

    controlLed(peripheral);

    // peripheral disconnected, start scanning again
    BLE.scanForUuid("4f0c973c-4a93-4949-b1bc-58940bb33b45");
  }
}

void controlLed(BLEDevice peripheral) {
  // connect to the peripheral
  Serial.println("Connecting ...");

  if (peripheral.connect()) {
    Serial.println("Connected");
  } else {
    Serial.println("Failed to connect!");
    return;
  }

  // discover peripheral attributes
  Serial.println("Discovering attributes ...");
  if (peripheral.discoverAttributes()) {
    Serial.println("Attributes discovered");
  } else {
    Serial.println("Attribute discovery failed!");
    peripheral.disconnect();
    return;
  }

  // retrieve the LED characteristic
  BLECharacteristic ledCharacteristic = peripheral.characteristic("2A50");
  BLECharacteristic distanceCharacteristic = peripheral.characteristic("2A57");
  BLECharacteristic lightCharacteristic = peripheral.characteristic("2A60");


  //Check if all characteristics are available
  if (!ledCharacteristic) {
    Serial.println("Peripheral does not have LED characteristic!");
    peripheral.disconnect();
    return;
  } else if (!ledCharacteristic.canWrite()) {
    Serial.println("Peripheral does not have a writable LED characteristic!");
    peripheral.disconnect();
    return;
  }

  if (!distanceCharacteristic) {
    Serial.println("Peripheral does not have Distance characteristic!");
    peripheral.disconnect();
    return;
  } else if (!distanceCharacteristic.canWrite()) {
    Serial.println("Peripheral does not have a writable Distance characteristic!");
    peripheral.disconnect();
    return;
  }

    if (!lightCharacteristic) {
    Serial.println("Peripheral does not have Light characteristic!");
    peripheral.disconnect();
    return;
  } else if (!lightCharacteristic.canWrite()) {
    Serial.println("Peripheral does not have a writable Light characteristic!");
    peripheral.disconnect();
    return;
  }


  while (peripheral.connected()) {
    // while the peripheral is connected
    measureDistance();
    measureLight();

    // read the button pin
    int buttonState = digitalRead(buttonPin);

    if (oldButtonState != buttonState) {
      // button changed
      oldButtonState = buttonState;

      if (buttonState) {
        Serial.println("button pressed");

        // button is pressed, write 0x01 to turn the LED on
        ledCharacteristic.writeValue((byte)0x01);
      } else {
        Serial.println("button released");

        // button is released, write 0x00 to turn the LED off
        ledCharacteristic.writeValue((byte)0x00);
      }
    }
    
    distanceCharacteristic.writeValue(distance);
    lightCharacteristic.writeValue(light);
    delay(500);
  }

  Serial.println("Peripheral disconnected");
}

//Measure distance and post it to serial and convert it to byte
void measureDistance(){
  long duration;
  // Clears the trigPin
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  // Sets the trigPin on HIGH state for 10 micro seconds
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  // Reads the echoPin, returns the sound wave travel time in microseconds
  duration = pulseIn(echoPin, HIGH);
  // Calculating the distance
  const float tempDistance = (duration * 0.034 / 2);
  distance = (byte)tempDistance;
  // Prints the distance on the Serial Monitor
  Serial.print("Temp Distance: ");
  Serial.println(tempDistance);

  Serial.print("Distance: ");
  Serial.println(distance);
}

//Measure light and post it to serial 
//and convert it to byte by scaling it down by 10
void measureLight(){
  int analogValue = analogRead(lightPin);

  light = (byte)(analogValue/10);

  Serial.print("Analog Light: ");
  Serial.println(analogValue);
  Serial.print("Light: ");
  Serial.println(light);
}