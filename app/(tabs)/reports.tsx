import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Touchable,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "@/constants/Colors";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Feather from "@expo/vector-icons/Feather";
import { getLast7DaysData, getRecentReadings } from "@/firebase/firebaseApi";
import { LineChart } from "react-native-chart-kit";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");

// Helper functions
const wp = (percentage) => (width * percentage) / 100; // width percentage
const hp = (percentage) => (height * percentage) / 100; // height percentage
const fs = (size) => Math.round(size * (width / 375));

const Reports = () => {
  const router = useRouter();
  const [recent, setRecent] = useState<any[]>([]);
  const [avg, setAvg] = useState({ avgTemp: 0, avgMoisture: 0 });
  const [last7Readings, setLast7Readings] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const recentData = await getRecentReadings();
      const { avgTemp, avgMoisture, last7Readings } = await getLast7DaysData();
      setRecent(recentData);
      setAvg({ avgTemp, avgMoisture });
      setLast7Readings(last7Readings);
    };
    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={()=>router.push('/home')}>
            <Ionicons name="arrow-back-outline" size={24} color={Colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerText}>Reports</Text>
        </View>

        <View style={styles.row}>
          <View style={styles.container}>
            <FontAwesome6
              name="temperature-empty"
              size={28}
              color={Colors.green}
            />
            <Text style={styles.label}>Avg Temperature</Text>
            <Text style={[styles.valueText, { color: Colors.green }]}>
              {avg.avgTemp}°C
            </Text>
          </View>

          <View style={[styles.container, { marginLeft: 15 }]}>
            <Feather name="droplet" size={28} color={Colors.blue} />
            <Text style={styles.label}>Avg Moisture</Text>
            <Text style={[styles.valueText, { color: Colors.blue }]}>
              {avg.avgMoisture}%
            </Text>
          </View>
        </View>

        {last7Readings.length > 0 && (
          <View
            style={[
              styles.chartContainer,
              { padding: wp(4), borderRadius: wp(3) },
            ]}
          >
            <Text
              style={[
                styles.chartTitle,
                { fontSize: fs(18), marginBottom: hp(1.5) },
              ]}
            >
              Last 7 Readings
            </Text>

            <View style={[styles.legendRow, { marginBottom: hp(1.5) }]}>
              <View
                style={[
                  styles.legendColor,
                  {
                    width: wp(4),
                    height: wp(4),
                    borderRadius: wp(1),
                    backgroundColor: Colors.green,
                  },
                ]}
              />
              <Text
                style={[
                  styles.legendText,
                  { fontSize: fs(14), marginLeft: wp(1.5) },
                ]}
              >
                Temperature (°C)
              </Text>

              <View
                style={[
                  styles.legendColor,
                  {
                    width: wp(4),
                    height: wp(4),
                    borderRadius: wp(1),
                    backgroundColor: Colors.blue,
                    marginLeft: wp(4),
                  },
                ]}
              />
              <Text
                style={[
                  styles.legendText,
                  { fontSize: fs(14), marginLeft: wp(1.5) },
                ]}
              >
                Moisture (%)
              </Text>
            </View>

            <LineChart
              data={{
                labels: last7Readings.map((_, i) => `R ${i + 1}`),
                datasets: [
                  {
                    data: last7Readings.map((r) => r.temperature),
                    color: () => Colors.green,
                    strokeWidth: 3,
                  },
                  {
                    data: last7Readings.map((r) => r.moisture),
                    color: () => Colors.blue,
                    strokeWidth: 3,
                  },
                ],
              }}
              width={wp(90)}
              height={hp(30)}
              yAxisSuffix=""
              fromZero
              bezier
              chartConfig={{
                backgroundColor: Colors.body,
                backgroundGradientFrom: Colors.body,
                backgroundGradientTo: Colors.body,
                decimalPlaces: 1,
                color: (opacity = 1) => `rgba(0,0,0,${opacity})`,
                labelColor: () => Colors.text,
                style: { borderRadius: wp(3) },
                propsForDots: { r: "4", strokeWidth: "2", stroke: "#fff" },
              }}
              style={{ marginVertical: hp(1.5), borderRadius: wp(3) }}
            />
          </View>
        )}

        <View style={styles.body}>
          <Text style={styles.bodyTitle}>Recent 3 Readings</Text>
          {recent.map((r, i) => (
            <View key={i} style={styles.bodyContainer}>
              <View style={styles.readingRow}>
                {/* Temperature */}
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
                      {r.temperature}°C
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
                      {r.moisture}%
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.divider} />
              <Text style={styles.time}>
                {r.timestamp ? r.timestamp.toLocaleString() : ""}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Reports;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingHorizontal: wp(4),
    paddingTop: hp(1.5),
  },
  header: { flexDirection: "row", alignItems: "center", marginBottom: hp(2.5) },
  headerText: {
    fontSize: fs(22),
    marginLeft: wp(2.5),
    fontWeight: "bold",
    color: Colors.text,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: hp(3),
  },
  container: {
    flex: 1,
    backgroundColor: Colors.body,
    borderRadius: wp(3),
    paddingVertical: hp(2.5),
    paddingHorizontal: wp(4),
    justifyContent: "center",
    alignItems: "center",
    minHeight: hp(15),
  },
  label: {
    fontSize: fs(16),
    fontWeight: "700",
    color: Colors.tabinactive,
    marginTop: hp(1),
  },
  valueText: { fontSize: fs(18), fontWeight: "900", marginTop: hp(0.5) },
  body: { marginBottom: hp(4) },
  bodyTitle: {
    fontSize: fs(20),
    fontWeight: "600",
    color: Colors.text,
    marginBottom: hp(2),
  },
  bodyContainer: {
    backgroundColor: Colors.body,
    borderRadius: wp(3),
    paddingVertical: hp(2),
    paddingHorizontal: wp(4),
    marginVertical: hp(1.5),
  },
  readingRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: hp(2),
  },
  readingItem: { flexDirection: "row", alignItems: "center" },
  iconContainer: {
    width: wp(12),
    height: wp(12),
    borderRadius: wp(6),
    borderWidth: 2,
    borderColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.white,
  },
  bodyContentText: { marginLeft: wp(3) },
  divider: {
    borderWidth: 0.4,
    borderColor: Colors.tabinactive,
    width: "90%",
    alignSelf: "center",
    marginVertical: hp(1),
  },
  time: { textAlign: "center", fontSize: fs(14), color: Colors.tabinactive },
  chartContainer: {
    backgroundColor: Colors.body,
    borderRadius: wp(3),
    padding: wp(4),
    marginBottom: hp(3),
  },
  chartTitle: {
    fontSize: fs(18),
    fontWeight: "600",
    color: Colors.text,
    marginBottom: hp(1.5),
  },
  legendRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp(1.5),
  },
  legendColor: { width: wp(4), height: wp(4), borderRadius: wp(1) },
  legendText: {
    marginLeft: wp(1.5),
    fontSize: fs(14),
    color: Colors.text,
    fontWeight: "500",
  },
});
