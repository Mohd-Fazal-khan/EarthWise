import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Colors } from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";
import { getLatestReading, saveReading } from "@/firebase/firebaseApi";
import NetInfo from "@react-native-community/netinfo";

const { width, height } = Dimensions.get("window");

const wp = (percentage) => (width * percentage) / 100; // width percentage
const hp = (percentage) => (height * percentage) / 100; // height percentage
const fs = (size) => Math.round(size * (width / 375));

const Home = () => {
  const router = useRouter();
  const [reading, setReading] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(true);

  const testSoil = async () => {
    setLoading(true);
    setError(null);
    try {
      await saveReading();
      await fetchReading();
    } catch (err: any) {
      setError(err.message || "Failed to save or fetch reading.");
      console.log("TestSoil error:", err);
    }
    setLoading(false);
  };

  const fetchReading = async () => {
    setLoading(true);
    setError(null);
    try {
      const latest = await getLatestReading();
      setReading(latest);
    } catch (err: any) {
      setError(err.message || "Failed to fetch reading.");
      console.log("FetchReading error:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchReading();
  }, []);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    return () => unsubscribe(); // cleanup
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
  
      <View style={styles.header}>
        <Text style={styles.title}>EarthWise Monitor</Text>
        <Text style={styles.subtext}>Smart soil monitoring made simple</Text>
      </View>

     
      <View style={styles.buttonGroup}>
        <TouchableOpacity onPress={testSoil} style={styles.button}>
          <LinearGradient
            colors={["#235c36", "#9b6c4b"]}
            style={styles.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <MaterialCommunityIcons
              name="test-tube-empty"
              size={24}
              color="white"
            />
            <Text style={styles.buttonText}>Test</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push('/reports')}
          style={styles.button}
        >
          <LinearGradient
            colors={["#235c36", "#9b6c4b"]}
            style={styles.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <MaterialCommunityIcons
              name="file-chart-outline"
              size={24}
              color="white"
            />
            <Text style={styles.buttonText}>View Reports</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

   
      <View style={styles.body}>
        <Text style={styles.bodyTitle}>Latest Reading</Text>
        <View style={styles.bodyContainer}>
          {loading ? (
            <Text style={styles.label}>Loading...</Text>
          ) : error ? (
            <Text style={[styles.label, { color: "red" }]}>{error}</Text>
          ) : reading ? (
            <>
              <View style={styles.readingRow}>
             
                <View style={styles.readingItem}>
                  <View style={styles.iconContainer}>
                    <FontAwesome6
                      name="temperature-empty"
                      size={24}
                      color={Colors.green}
                    />
                  </View>
                  <View style={styles.bodyContentText}>
                    <Text style={styles.label}>Temperature</Text>
                    <Text style={[styles.valueText, { color: Colors.green }]}>
                      {reading.temperature}°C
                    </Text>
                  </View>
                </View>

              
                <View style={styles.readingItem}>
                  <View style={styles.iconContainer}>
                    <Feather name="droplet" size={24} color={Colors.blue} />
                  </View>
                  <View style={styles.bodyContentText}>
                    <Text style={styles.label}>Moisture</Text>
                    <Text style={[styles.valueText, { color: Colors.blue }]}>
                      {reading.moisture}%
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.divider}></View>
              <Text style={styles.time}>
                {reading.timestamp ? reading.timestamp.toLocaleString() : ""}
              </Text>
            </>
          ) : (
            <Text style={styles.label}>No reading available yet.</Text>
          )}
        </View>
      </View>

     
      <View style={styles.statusContainer}>
        <Text style={[styles.online, { color: isConnected ? Colors.green : Colors.red }]}>
        {isConnected ? "Online" : "Offline"}
      </Text>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    padding: wp(4),
    backgroundColor:Colors.white,
  },
  header: {
    alignItems: "center",
    marginBottom: hp(3),
  },
  title: {
    fontWeight: "bold",
    fontSize: fs(26),
    color: Colors.text,
  },
  subtext: {
    fontSize: fs(16),
    color: Colors.tabinactive,
    marginTop: hp(0.5),
  },
  buttonGroup: {
    marginBottom: hp(4),
  },
  button: {
    marginVertical: hp(1),
    borderRadius: wp(3),
    overflow: "hidden",
  },
  gradient: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: hp(2),
    paddingHorizontal: wp(5),
  },
  buttonText: {
    color: "white",
    fontSize: fs(16),
    fontWeight: "bold",
    marginLeft: wp(2),
  },
  body: {
    marginBottom: hp(4),
  },
  bodyTitle: {
    fontSize: fs(20),
    fontWeight: "600",
    color: Colors.text,
    marginBottom: hp(2),
    marginLeft: wp(1),
  },
  bodyContainer: {
    backgroundColor: Colors.body,
    borderRadius: wp(3),
    paddingVertical: hp(2),
    paddingHorizontal: wp(3),
  },
  readingRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: hp(2),
  },
  readingItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: wp(12),
    height: wp(12),
    borderRadius: wp(6),
    borderWidth: 2,
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.white,
  },
  bodyContentText: {
    marginLeft: wp(3),
  },
  label: {
    fontSize: fs(16),
    fontWeight: "700",
    color: Colors.tabinactive,
  },
  valueText: {
    fontSize: fs(18),
    fontWeight: "900",
    marginTop: hp(0.3),
  },
  divider: {
    borderWidth: 0.4,
    borderColor: Colors.tabinactive,
    width: "90%",
    alignSelf: "center",
    marginVertical: hp(1),
  },
  time: {
    textAlign: "center",
    fontSize: fs(14),
    color: Colors.tabinactive,
  },
  statusContainer: {
    alignItems: "center",
  },
  online: {
    backgroundColor: Colors.body,
    fontWeight: "600",
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(6),
    borderRadius: wp(10),
    textAlign: "center",
  },
});
