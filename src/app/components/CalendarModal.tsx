import { stringToDateData } from "@/src/services/dateService";
import { useEffect, useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { Calendar, DateData } from "react-native-calendars";
type props = {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  current_date: string;
  onSubmit: Function;
};

export const CalendarModal = ({
  show,
  setShow,
  current_date,
  onSubmit,
}: props) => {
  const [selectedDate, setSelectedDate] = useState<DateData | null>(null);
  useEffect(() => {
    if (!current_date) return;
    setSelectedDate(stringToDateData(current_date));
  }, [current_date, show]);
  return (
    <Modal visible={show} animationType="fade" transparent>
      <TouchableOpacity
        onPress={() => setShow(false)}
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0,0,0,0.3)",
          zIndex: 1,
        }}
      >
        <TouchableOpacity
          style={{
            width: 320,
            backgroundColor: "white",
            borderRadius: 10,
            padding: 10,
            zIndex: 100,
          }}
        >
          <Calendar
            current={selectedDate?.dateString}
            onDayPress={(date) => setSelectedDate(date)}
            dayComponent={({ date, state }) => {
              const isSelected = date?.dateString === selectedDate?.dateString;
              const isToday =
                date?.dateString === new Date().toISOString().split("T")[0];

              return (
                <TouchableOpacity
                  onPress={() => date && setSelectedDate(date as DateData)}
                  activeOpacity={1}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 16,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: isSelected ? "blue" : "transparent",
                  }}
                >
                  <Text
                    style={{
                      color: isSelected
                        ? "white"
                        : isToday
                          ? "blue"
                          : state === "disabled"
                            ? "#d9e1e8"
                            : "black",
                      fontWeight: isToday ? "bold" : "normal",
                    }}
                  >
                    {date?.day}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              gap: 10,
            }}
          >
            <TouchableOpacity onPress={() => setShow(false)}>
              <Text
                style={{
                  backgroundColor: "red",
                  padding: 6,
                  borderRadius: 10,
                  color: "white",
                }}
              >
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text
                style={{
                  backgroundColor: "blue",
                  padding: 6,
                  borderRadius: 10,
                  color: "white",
                }}
                onPress={async () => {
                  if (!selectedDate) return;
                  await onSubmit(new Date(selectedDate.dateString));
                  setShow(false);
                }}
              >
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};
